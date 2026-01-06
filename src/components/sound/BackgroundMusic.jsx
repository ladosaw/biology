import { useEffect, useRef } from "react";
import scienceBg from "../../assets/sound/science_music.mp3";

const BackgroundMusic = ({ play }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(scienceBg);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }

    if (play) {
      audioRef.current.play().catch(() => {
        // autoplay blocked until user interaction
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      audioRef.current.pause();
    };
  }, [play]);

  return null;
};

export default BackgroundMusic;
