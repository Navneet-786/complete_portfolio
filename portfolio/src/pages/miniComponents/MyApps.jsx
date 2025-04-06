import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const MyApps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMyApps = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/softwareapplication/getall",
        { withCredentials: true }
      );

      setApps(data.softwareApplications);
      setLoading(false);
    };
    getMyApps();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit ">
        MY APPS
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
          {apps &&
            apps.map((element) => {
              return (
                <Card
                  className="h-fit p-7 flex flex-col justify-center items-center gap-3 bg-[#bfcfff] capitalize"
                  key={element._id}
                >
                  <img
                    src={element.svg && element.svg.url}
                    alt="skill"
                    className="h-12 sm:h-24 w-auto"
                    loading="lazy"
                  />
                  <p className="text-black text-center">{element.name}</p>
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default MyApps;

// {
//   <div className="flex justify-center items-center border-2 border-white w-[100%]">
//     <ClipLoader
//       color="yellow"
//       loading={loading}
//       cssOverride={{ textAlign: "center" }}
//       size={100}
//       aria-label="Loading Spinner"
//       data-testid="loader"
//     />
//   </div>;
// }
