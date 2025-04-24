import { Link } from "lucide-react";
import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-3xl sm:text-6xl text-black lg:text-7xl text-center tracking-wide">
       Welcome to 
       <br />
        <span className="sm:text-8xl bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text  text-6xl ">
          {" "}
          Code BattleGround
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Empower your Coding Skills and bring your logics to Solve the Problems and quizzes. Get started today and turn your Knowledge
        into immersive reality!
      </p>
     
     
      <div className="flex mt-12 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
