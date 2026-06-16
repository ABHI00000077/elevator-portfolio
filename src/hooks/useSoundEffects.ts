import { useCallback, useEffect, useRef } from "react";

function makeAudio(src: string, volume = 1, loop = false) {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = volume;
  audio.loop = loop;
  return audio;
}

export function useSoundEffects() {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const doorCloseRef = useRef<HTMLAudioElement | null>(null);
  const liftHumRef = useRef<HTMLAudioElement | null>(null);
  const posterClickRef = useRef<HTMLAudioElement | null>(null);
  const modalCloseRef = useRef<HTMLAudioElement | null>(null);
  const dingRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgMusicRef.current = makeAudio("/sounds/background.mp3", 0.22, true);
    doorCloseRef.current = makeAudio("/sounds/door-close.mp3", 0.8, false);
    liftHumRef.current = makeAudio("/sounds/elevator.mp3", 0.35, true);
    posterClickRef.current = makeAudio("/sounds/click.mp3", 0.7, false);
    modalCloseRef.current = makeAudio("/sounds/close.mp3", 0.65, false);
    dingRef.current = makeAudio("/sounds/ding.mp3", 0.85, false);
  }, []);

  const play = useCallback((ref: React.RefObject<HTMLAudioElement | null>) => {
    const audio = ref.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  const stop = useCallback((ref: React.RefObject<HTMLAudioElement | null>) => {
    const audio = ref.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const startBackgroundMusic = useCallback(() => {
    const audio = bgMusicRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.22;
    if (!audio.paused) return;
    audio.play().catch(() => {});
  }, []);

  return {
    startBackgroundMusic,
    playDoorClose: () => play(doorCloseRef),
    playLiftHum: () => play(liftHumRef),
    stopLiftHum: () => stop(liftHumRef),
    playPosterClick: () => play(posterClickRef),
    playModalClose: () => play(modalCloseRef),
    playDing: () => play(dingRef),
  };
}