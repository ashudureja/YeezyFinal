import React from "react";
import { useCart } from "../CartContext/ContextHook";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegPauseCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoMdSkipBackward } from "react-icons/io"
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { IoIosSkipForward } from "react-icons/io";
import useSound from "use-sound";
import { IoPlaySharp } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";

const Music = () => {
  const { currentSong,setSong,Songs,index,setIndex ,audioplaying,
    Setaudioplaying,} = useCart();
  const len=Songs.length
  const[playclick]=useSound("./click5.mp4")
  

  const forwardfunc = () => {
    playclick()
    setIndex((prev) => {
      const newIndex = (prev + 1) % len;
      setSong(Songs[newIndex]);
      Setaudioplaying(true)

      return newIndex;
    });
  };

  const pausefunc=()=>{
    playclick()
Setaudioplaying(!audioplaying)

  }

  const backwardfunc = () => {
    playclick()
    setIndex((prev) => {
      const newIndex = (prev - 1 + len) % len; // to avoid negative index
      setSong(Songs[newIndex]);
       Setaudioplaying(true)
      return newIndex;
    });
  };

  const navigate=useNavigate()

  const handleclick=()=>{
    playclick();
    navigate(-1);
  }
  


  return (
    <div className="bg-white relative min-h-screen w-full pt-4 flex flex-col items-center justify-center font-inter">
      <div className="absolute  top-8 left-8">
        <button
          onClick={handleclick}
          className="text-gray-500 cursor-pointer hover:text-black transition-colors duration-300 flex items-center gap-2 group"
        >
          <MdOutlineArrowBackIosNew className="text-xl group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      <div className="flex flex-col items-center space-y-9 max-w-2xl w-full px-4">
        <div className="relative group">
          <img 
            src={currentSong.image_url} 
            alt={currentSong.name}
            className="w-64 h-64 rounded-xl object-cover shadow-xl transform transition-transform duration-500 hover:scale-102"
          />
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl no-font   text-shadow-xs uppercase font-bold text-gray-900 tracking-tight">{currentSong.name}</h1>
          <p className="text-gray-500 text-lg">{currentSong.artist}</p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <div className="h-1 bg-gray-200 rounded-full">
            <div className="h-full bg-black w-1/3 rounded-full relative">
              <div className="absolute right-0 -top-1 w-3 h-3 bg-black rounded-full shadow-xl" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={backwardfunc}
            className="p-3 text-gray-500 hover:text-gray-900 transition-colors duration-300 hover:bg-gray-100 rounded-full"
          >
            <IoMdSkipBackward className="text-3xl" />
          </button>
          
          <button
            onClick={pausefunc}
            className="p-6 bg-gray-900 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-800"
          >
            {audioplaying ? (
              <IoIosPause className="text-4xl" />
            ) : (
              <IoPlaySharp className="text-4xl pl-1" />
            )}
          </button>

          <button 
            onClick={forwardfunc}
            className="p-3 text-gray-500 hover:text-gray-900 transition-colors duration-300 hover:bg-gray-100 rounded-full"
          >
            <IoIosSkipForward className="text-3xl" />
          </button>
        </div>

        {/* <div className="mt-4 w-full max-w-md  ">
          <img src="./signature.png"></img>
          
        </div> */}
      </div>
    </div>
  );
};

export default Music;
