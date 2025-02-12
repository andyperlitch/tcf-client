import { createLogger } from "@/utils/createLogger";
import { useEffect, useState } from "react";

const logger = createLogger("useAudioInput");

function getFrequencyData(analyser: AnalyserNode, dataArray: Uint8Array) {
  analyser.getByteFrequencyData(dataArray);
}

export function useAudioInput({ fftSize = 128 }: { fftSize?: number } = {}) {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);

  // Initialize the audio input
  useEffect(() => {
    if (!navigator.mediaDevices) {
      logger.warn("No media devices found");
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        source.connect(analyser);
        analyser.fftSize = fftSize;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        setAnalyser(analyser);
        setDataArray(dataArray);
      })
      .catch(function (err) {
        console.error("Error accessing the microphone: ", err);
      });
  }, [fftSize]);

  // Get the frequency data on an interval
  useEffect(() => {
    if (analyser && dataArray) {
      let rafId: number;
      const loop = () => {
        getFrequencyData(analyser, dataArray);
        setFrequencyData(new Uint8Array(dataArray));
        rafId = requestAnimationFrame(loop);
      };

      loop();
      return () => cancelAnimationFrame(rafId);
    }
  }, [analyser, dataArray]);

  return { frequencyData };
}
