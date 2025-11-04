import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";

export function SoundManager() {
  const { setBackgroundMusic, setHitSound, setSuccessSound, isMuted } = useAudio();

  useEffect(() => {
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    setBackgroundMusic(bgMusic);

    const hit = new Audio("/sounds/hit.mp3");
    setHitSound(hit);

    const success = new Audio("/sounds/success.mp3");
    setSuccessSound(success);

    if (!isMuted) {
      bgMusic.play().catch(() => {
        console.log("Background music autoplay prevented");
      });
    }

    return () => {
      bgMusic.pause();
    };
  }, [setBackgroundMusic, setHitSound, setSuccessSound, isMuted]);

  return null;
}
