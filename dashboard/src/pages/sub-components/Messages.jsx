import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessagesSlice,
} from "@/store/slices/messageSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");
  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message, loading]);

  return (
    <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20 bg-black ">
        <Tabs>
          <TabsContent>
            <Card className="bg-slate-800 border-none">
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle className="text-white">Messages</CardTitle>
                <Button className="w-fit" onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {messages && messages.length > 0 ? (
                  messages.map((element) => {
                    return (
                      <Card
                        key={element._id}
                        className="grid gap-2 bg-slate-900 px-2 py-2 outline-none border-none"
                      >
                        <CardDescription className="text-white">
                          <span className="font-bold mr-2 text-yellow-500">
                            Sender Name:
                          </span>
                          {element.senderName}
                        </CardDescription>
                        <CardDescription className="text-white">
                          <span className="font-bold mr-2 text-yellow-500">
                            Subject:
                          </span>
                          {element.subject}
                        </CardDescription>
                        <CardDescription className="text-white">
                          <span className="font-bold mr-2 text-yellow-500">
                            Message:
                          </span>
                          {element.message}
                        </CardDescription>
                        <CardFooter className="justify-end">
                          {loading && messageId === element._id ? (
                            <SpecialLoadingButton
                              content={"Deleting"}
                              width={"w-32"}
                            />
                          ) : (
                            <Button
                              className="w-32  bg-slate-600"
                              onClick={() => handleMessageDelete(element._id)}
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardHeader className="text-2xl text-white">
                    No Messages Found!
                  </CardHeader>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Messages;
