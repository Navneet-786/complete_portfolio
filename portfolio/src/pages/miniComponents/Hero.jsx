/* eslint-disable react/no-unescaped-entities */
import { ExternalLink, Github, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import { Badge } from "flowbite-react";
import { Button } from "flowbite-react";

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    // const getMyProfile = async () => {
    //   const { data } = await axios.get("http://localhost:4000/api/v1/user/me", {
    //     withCredentials: true,
    //   });

    //   setUser(data.user);
    //   console.log(data.user);
    // };

    // getMyProfile();
    const getUserProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/portfolio/me",
        {
          withCredentials: true,
        }
      );
      // console.log("ye ha hero data", data.user.fullName);
      setUser(data.user);
    };
    getUserProfile();
  }, []);
  return (
    <div className="w-full ">
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>

        <Badge color="success">Online</Badge>
      </div>
      <h1
        className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem] 
      md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
      >
        Hey, I'm{" "}
        <span className="text-yellow-500 font-sans">{user.fullName}</span>
      </h1>
      <h1
        className="text-tubeLight-effect overflow-x-hidden text-[1.3rem] 
      sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] font-bold font-sans "
      >
        <Typewriter
          words={[
            "FULLSTACK DEVELOPER",
            "MERN DEVELOPER",
            "COMPUTER SCIENCE STUDENT",
          ]}
          loop={50}
          cursor
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      <p className="mt-8 text-base text-justify  text-gray-500 text-tubeLight-effect lg:w-[50%] sm:w-[90%]">
        {user?.aboutMe}
      </p>

      <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
        <Link
          to={
            user.githubURL ? user?.githubURL : "https://github.com/Navneet-786"
          }
          target="_blank"
        >
          <Button gradientDuoTone="cyanToBlue">
            <span>
              <Github />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link
          to={
            user.linkedInURL
              ? user?.linkedInURL
              : "https://www.linkedin.com/in/navneet-verma-827112228/"
          }
          target="_blank"
        >
          <Button gradientDuoTone="pinkToOrange">
            <span>
              <Linkedin />
            </span>
            <span className=" flex items-end ml-1">Linkedin</span>
          </Button>
        </Link>
        <Link
          to={
            user.resume
              ? user?.resume && user?.resume?.url
              : "https://res.cloudinary.com/dxuejjevv/image/upload/v1723308292/PORTFOLIO%20RESUME/axjvjqrva0lvjbryiyxp.jpg"
          }
          target="_blank"
        >
          <Button gradientDuoTone="purpleToPink">
            {" "}
            <span>
              <ExternalLink />
            </span>
            <span>Resume </span>
          </Button>
        </Link>
      </div>
      <hr className="my-8 md::my-10 " />
    </div>
  );
};

export default Hero;
