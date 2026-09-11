import { useRef, useState, useEffect } from "react";

export default function MicRecorder({ onConfirm }) {

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const stopRequestedRef = useRef(false);

  const getSupportedMimeType = () => {
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/mpeg",
    ];
    return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || "";
  };

  const stopTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const finalizeRecording = () => {
    const recorder = mediaRecorderRef.current;
    const chunks = chunksRef.current;
    if (!recorder) return;

    const blob = new Blob(chunks, {
      type: recorder.mimeType || getSupportedMimeType() || "audio/webm",
    });

    console.log("Final blob:", blob.size, blob.type);

    setAudioBlob(blob);
    stopTracks();
    setRecording(false);
    stopRequestedRef.current = false;
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === "inactive") return;
    if (stopRequestedRef.current) return;

    stopRequestedRef.current = true;
    clearInterval(timerRef.current);
    timerRef.current = null;

    // Force any buffered data to flush before stopping.
    if (recorder.state === "recording") {
      try {
        recorder.requestData();
      } catch (e) {
        console.warn("requestData not supported:", e);
      }
    }

    // Give the browser a tick to process requestData's dataavailable
    // event before stop() finalizes things.
    setTimeout(() => recorder.stop(), 0);
  };

  const startRecording = async () => {
    if (!("MediaRecorder" in window) || !navigator.mediaDevices?.getUserMedia) {
      alert("Microphone recording is not supported in this browser.");
      return;
    }
    if (recording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = getSupportedMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      stopRequestedRef.current = false;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = (event) => {
        console.error("MediaRecorder error:", event.error);
      };

      recorder.onstop = () => {
        finalizeRecording();
      };

      // timeslice of 250ms: guarantees periodic ondataavailable events
      // so we always have data even if stop() finalization is flaky
      // on a given browser.
      recorder.start(250);
      setRecording(true);
      setSeconds(0);

      // 30s auto-stop timer — updater stays pure, side effect happens
      // in a separate effect that watches `seconds`.
      timerRef.current = setInterval(() => {
        setSeconds((prev) => Math.min(prev + 1, 30));
      }, 1000);
    } catch (error) {
      console.error("Microphone access failed:", error);
      alert("Microphone access was denied or unavailable. Please allow mic permission and try again.");
    }
  };

  // Side effect lives here, not inside the setSeconds updater.
  useEffect(() => {
    if (seconds >= 30 && recording) {
      stopRecording();
    }
  }, [seconds, recording]);

  // Manage the preview object URL: create once per blob, revoke on change/unmount.
  useEffect(() => {
    if (!audioBlob) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(audioBlob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [audioBlob]);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      stopTracks();
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-6">
      {!audioBlob ? (
        <>
          <button
            type="button"
            onClick={recording ? stopRecording : startRecording}
            className={`h-28 w-28 rounded-full text-4xl text-white ${
              recording ? "bg-red-500" : "bg-blue-600"
            }`}
          >
            {recording ? "■" : "🎤"}
          </button>
          <p className="mt-3">{recording ? `${seconds}s / 30s` : "Tap to start"}</p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3">
          {previewUrl && <audio controls src={previewUrl} />}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAudioBlob(null)}
              className="rounded bg-gray-200 px-4 py-2"
            >
              Re-record
            </button>
            <button
              type="button"
              onClick={() => onConfirm?.(audioBlob)}
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}