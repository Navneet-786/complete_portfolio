import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMySkills = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/getall",
        { withCredentials: true }
      );
      if (data.skills) {
        setLoading(false);
        setSkills(data.skills);
      }
    };
    getMySkills();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1
        className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[10px] font-sans font-bold  dancing_text mx-auto w-fit"
      >
        SKILLS
      </h1>
      {loading ? (
        <div className="flex justify-center items-center  w-[100%]">
          <ClipLoader
            color="yellow"
            loading={loading}
            cssOverride={{ textAlign: "center" }}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills &&
            skills.map((element) => {
              return (
                <Card
                  className="h-fit lg:p-7 p-2 flex flex-col justify-center items-center gap-3 bg-[#bfcfff] text-black  transition-all hover:bg-[#5d76c4]"
                  key={element._id}
                >
                  <img
                    src={element.svg && element.svg.url}
                    alt="skill"
                    className="h-12 sm:h-24 w-auto "
                    loading="lazy"
                  />
                  <p className="text-black text-center">{element.title}</p>
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Skills;
