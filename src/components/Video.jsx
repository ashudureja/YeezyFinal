import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Video = () => {
  const videoref = useRef(null);
  useEffect(() => {
    if (videoref) {
      videoref.current.playbackRate = 2;
    }
  }, []);

  return (
   
     <div
      className="h-screen w-full"
     
    >
      <video
        ref={videoref}
        autoPlay
        muted
        loop
        className="h-full w-full object-cover"
        src="./video.mp4"
      ></video>
    </div>
  
  );
};

export default Video;
