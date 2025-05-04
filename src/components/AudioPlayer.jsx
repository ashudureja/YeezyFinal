import React from 'react'
import { useCart } from '../CartContext/ContextHook';
import { useRef } from 'react';
import { useEffect } from 'react';

const AudioPlayer = () => {
    const { audioplaying ,currentSong} = useCart();  // Now has access to context
    const audioRef = useRef(null);
    
  
    useEffect(() => {
      const handleAudio = async () => {
        if (!audioRef.current) return;
        
        try {
          audioplaying 
            ? await audioRef.current.play()
            : audioRef.current.pause();
        } catch (err) {
          console.error("Audio error:", err);
        }
      };
  
      handleAudio();
    }, [audioplaying,currentSong]);
  
    return <audio ref={audioRef} src={currentSong.song_url} loop />;
  };

export default AudioPlayer
