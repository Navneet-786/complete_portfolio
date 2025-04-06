import { Button } from "@/components/ui/button";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMyProjects = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      if (data.projects) {
        setLoading(false);
      }
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[5px] 
          mx-auto w-fit font-extrabold about-h1  text-yellow-500"
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold ">
            PROJECTS
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1 "
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      {loading ? (
        <div className="flex py-10 items-center justify-center w-[100%]">
          <PulseLoader
            color="yellow"
            loading={loading}
            cssOverride={{ textAlign: "center" }}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-10 px-10 py-10">
          {viewAll
            ? projects &&
              projects.map((element) => {
                return (
                  <Link to={`/project/${element._id}`} key={element._id}>
                    <img
                      src={element.projectBanner && element.projectBanner.url}
                      alt={element.title}
                    />
                  </Link>
                );
              })
            : projects &&
              projects.slice(0, 9).map((element) => {
                return (
                  <Link
                    to={`/project/${element._id}`}
                    key={element._id}
                    className="rounded-xl overflow-hidden hover:scale-95 transition-all"
                  >
                    <img
                      src={element.projectBanner && element.projectBanner.url}
                      alt={element.title}
                    />
                  </Link>
                );
              })}
        </div>
      )}
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
