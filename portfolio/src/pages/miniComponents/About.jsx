import axios from "axios";
import { useEffect, useState } from "react";
const About = () => {
  const [data, setUser] = useState();
  useEffect(() => {
    const getUserProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/portfolio/me",
        {
          withCredentials: true,
        }
      );
      console.log("hello kaise ho: ", data?.user.avatar.url);
      setUser(data);
    };
    getUserProfile();
  }, []);
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1 text-yellow-500"
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src={data?.user.avatar.url}
              //
              alt="avatar"
              className="bg-white p-2 sm:p-4 rotate-[25deg] hover:rotate-[0deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px] transition-transform duration-500 "
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              Hi, I'm {data?.user.fullName} ,I'm a passionate and driven
              individual currently pursuing my B.Tech in Computer Science
              Engineering from JSS Academy of Technical Education, Noida. With a
              strong foundation in computer science and a keen interest in new
              technologies, I've developed a passion for building innovative
              solutions that make a real impact.
            </p>
            <p className="text-slate-300">
              As a MERN Stack developer, I've honed my skills in designing and
              developing scalable, efficient, and user-friendly applications
              using MongoDB, Express.js, React.js, and Node.js. I'm excited to
              leverage my technical expertise to drive business growth and solve
              complex problems.
            </p>
            <p className="text-slate-400">
              When I'm not coding, you can find me exploring new technologies,
              playing video games, or watching movies. I'm a firm believer in
              the importance of staying up-to-date with the latest trends and
              advancements in the tech industry, and I'm always looking for
              opportunities to learn and grow.
            </p>
            <p className="text-slate-500">
              I'm excited to share my journey with you and explore how my skills
              and passion can contribute to the success of your organization.
              Feel free to take a look around my portfolio to learn more about
              my projects, skills, and experiences. I'm looking forward to
              connecting with you and exploring new opportunities!
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl text-slate-600">
          My dedication and perseverance in timely delivery of work are integral
          to me. I maintain the courage to face any challenges for extended
          periods.
        </p>
      </div>
    </div>
  );
};

export default About;
