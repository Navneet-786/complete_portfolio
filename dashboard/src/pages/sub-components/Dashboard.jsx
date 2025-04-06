import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { clearAllSkillErrors } from "@/store/slices/skillSlice";
import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplicationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Dashboard = () => {
  const navigateTo = useNavigate();
  const gotoMangeSkills = () => {
    navigateTo("/manage/skills");
  };
  const gotoMangeTimeline = () => {
    navigateTo("/manage/timeline");
  };
  const gotoMangeProjects = () => {
    navigateTo("/manage/projects");
  };

  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );

  const [appId, setAppId] = useState(null);
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14  bg-black">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2 ">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 ">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {/* ABOUT ME */}
              <Card className="sm:col-span-2 bg-gray-800 outline-none border-none">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed capitalize">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <NavLink to="http://localhost:5173/" target="_blank">
                    <Button>Visit Portfolio</Button>
                  </NavLink>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center items-center gap-2 bg-gray-800 outline-none border-none">
                <CardHeader className="pb-2 flex flex-col gap-2">
                  <CardTitle className="text-white">
                    Projects Completed
                  </CardTitle>
                  <CardTitle className="text-6xl text-yellow-500 flex justify-center">
                    <CircularProgressbar
                      value={projects && projects.length}
                      text={`${projects && projects.length}`}
                      className="w-[100px]  "
                      styles={buildStyles({
                        textSize: "40px",
                        pathColor: `rgba(25,114,146, ${1000 / 100})`,

                        textColor: "yellow",
                      })}
                    />
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center items-center gap-2  bg-gray-800 outline-none border-none">
                <CardHeader className="pb-2 flex items-center flex-col gap-2">
                  <CardTitle className="text-white">Skills</CardTitle>
                  <CardTitle className="text-6xl text-yellow-500">
                    <CircularProgressbar
                      value={skills && skills.length}
                      text={`${skills && skills.length}`}
                      className="w-[100px]  "
                      styles={buildStyles({
                        textSize: "40px",
                        pathColor: `rgba(25,114,146, ${1000 / 100})`,

                        textColor: "yellow",
                      })}
                    />
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeSkills}>Manage Skill</Button>
                </CardFooter>
              </Card>
            </div>

            {/* //PROJECTS */}
            <Tabs>
              <TabsContent>
                <Card className=" bg-gray-800 outline-none border-none">
                  <CardHeader className="px-7">
                    <CardTitle className="text-white">Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-gray-800">
                          <TableHead className="text-yellow-500">
                            Title
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-yellow-500 ">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-yellow-500">
                            Deployed
                          </TableHead>
                          <TableHead className="md:table-cell text-yellow-500">
                            Update
                          </TableHead>
                          <TableHead className="text-right text-yellow-500">
                            Visit
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="border-none outline-none">
                        {projects && projects.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow
                                className=" bg-slate-500 border-none text-white"
                                key={element._id}
                              >
                                <TableCell>
                                  <div className="font-medium">
                                    {element.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {element.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge
                                    className="text-xs"
                                    variant="secondary"
                                  >
                                    {element.deployed}
                                  </Badge>
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link
                                    to={element.projectLink}
                                    target="_blank"
                                  >
                                    <Button>Visit</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden text-white">
                              You have not added any project.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            {/* SKILLS */}
            <Tabs>
              <TabsContent>
                <Card className=" bg-gray-800 outline-none border-none text-white">
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4 ">
                    {skills && skills.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card
                            key={element._id}
                            className=" text-white bg-slate-500 border-none"
                          >
                            <CardHeader>{element.title}</CardHeader>
                            <CardFooter>
                              <Progress
                                value={element.proficiency}
                                className=" h-2 rounded-lg shadow-md "
                              />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-3xl">You have not added any skill.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            {/* SOFTWARE APPLICATIONS */}
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card className=" bg-gray-800 outline-none border-none text-white">
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-yellow-500">
                            Name
                          </TableHead>
                          <TableHead className="md:table-cell text-yellow-500">
                            Icon
                          </TableHead>
                          <TableHead className="md:table-cell text-center text-yellow-500">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications &&
                        softwareApplications.length > 0 ? (
                          softwareApplications.map((element) => {
                            return (
                              <TableRow
                                className=" bg-slate-500"
                                key={element._id}
                              >
                                <TableCell className="font-medium">
                                  {element.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    className="w-7 h-7"
                                    src={element.svg && element.svg.url}
                                    alt={element.name}
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell  text-center">
                                  {appLoading && appId === element._id ? (
                                    <SpecialLoadingButton
                                      content={"Deleting"}
                                      width={"w-fit"}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteSoftwareApp(element._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any skill.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* TIMELINE */}
                <Card className=" bg-gray-800 outline-none border-none text-white">
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button onClick={gotoMangeTimeline} className="w-fit">
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-yellow-500">
                            Title
                          </TableHead>
                          <TableHead className="md:table-cell text-yellow-500">
                            From
                          </TableHead>
                          <TableHead className="md:table-cell text-right text-yellow-500">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((element) => {
                            return (
                              <TableRow
                                className=" bg-slate-500"
                                key={element._id}
                              >
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell  text-right">
                                  {element.timeline.to}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any timeline.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
