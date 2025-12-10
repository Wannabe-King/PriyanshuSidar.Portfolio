import { Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("assets/songs/Worship.mp3");
    audioRef.current.volume=0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  function playMusic() {
    const audio = audioRef.current;
    console.log("paly");
    if (audio) {
      if (playing == true) {
        audio.pause();
      } else {
        audio.play();
      }
    }
    setPlaying(!playing);
  }

  return (
    <div className="z-10 fixed left-1/2 -translate-x-1/2 mt-15 bg-red-400 p-4 rounded-4xl hidden sm:block">
      {playing == false ? (
        <Play strokeWidth={3} onClick={playMusic} />
      ) : (
        <Pause strokeWidth={3} onClick={playMusic} />
      )}
    </div>
  );
};
