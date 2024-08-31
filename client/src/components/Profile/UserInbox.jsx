/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import axios from "axios";
import { backend_url, server } from "../../server";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Image, SendHorizonal } from "lucide-react";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

const ENDPOINT = "http://localhost:5001/";
let socket;

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [images, setImages] = useState();

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    if (user) {
      // hoặc user cho UserInbox
      socket.emit("addUser", user._id);
      socket.on("getUsers", (users) => {
        setOnlineUsers(users);
      });
      socket.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          images: data.images,
          createdAt: Date.now(),
        });
      });
    }

    return () => {
      socket.off("getUsers");
      socket.off("getMessage");
      socket.disconnect();
    };
  }, [user]); // hoặc [user] cho UserInbox

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-user-conversation/${user?._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getConversations();
    }
  }, [user, messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const response = await axios.get(
            `${server}/message/get-all-messages/${currentChat._id}`
          );
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        `${server}/message/create-new-message`,
        message
      );
      setMessages([...messages, res.data.message]);
      setNewMessage("");
      await updateLastMessage();
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socket.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });

    try {
      await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: user._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onlineCheck = (chat) => {
    const chatMember = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return !!online;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImages(base64);
    imageSendHandler(base64);
  };

  const imageSendHandler = async (base64Image) => {
    const messageData = {
      images: base64Image,
      sender: user._id, // hoặc user._id cho UserInbox
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id // hoặc user._id cho UserInbox
    );

    socket.emit("sendMessage", {
      senderId: user._id, // hoặc user._id cho UserInbox
      receiverId,
      images: base64Image,
      text: newMessage,
    });

    try {
      const response = await axios.post(
        `${server}/message/create-new-message`,
        messageData
      );
      setImages();
      setMessages([...messages, response.data.message]);
      updateLastImageMessage();
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm hỗ trợ chuyển đổi file thành base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const updateLastImageMessage = async () => {
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: user._id,
      }
    );
  };

  const getAvatarSrc = (avatar) => {
    if (avatar && avatar.startsWith("data:image")) {
      return avatar;
    } else if (avatar) {
      return `${backend_url}${avatar}`;
    }
    return "";
  };

  return (
    <div className="border rounded-lg h-full ">
      <div className="h-full">
        {!open && (
          <>
            <CardHeader className="bg-[#00a8ff] text-white rounded-t-lg">
              <CardTitle className="text-center text-2xl">
                Tất cả tin nhắn
              </CardTitle>
            </CardHeader>

            {conversations.length === 0 && (
              <h1 className="text-center text-[20px] font-Poppins py-3 flex items-center justify-center h-[40vh]">
                Không có tin nhắn
              </h1>
            )}

            {/* All messages list */}
            {conversations &&
              conversations.map((item, index) => (
                <MessageList
                  data={item}
                  key={index}
                  index={index}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={user?._id}
                  setUserData={setUserData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                  getAvatarSrc={getAvatarSrc}
                />
              ))}
          </>
        )}

        {open && (
          <Inbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            sellerId={user._id}
            userData={userData}
            activeStatus={activeStatus}
            handleImageUpload={handleImageUpload}
            getAvatarSrc={getAvatarSrc}
          />
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  setOpen,
  getAvatarSrc,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState(null);
  const conversationId = data._id;

  const handleClick = () => {
    // navigate(`/profile/inbox?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [me, data, online, setActiveStatus]);

  return (
    <>
      <Link
        to={`/profile/inbox?${conversationId}`}
        className={`w-full flex p-3 ${
          active === index ? "bg-transparent" : "bg-transparent"
        } cursor-pointer`}
        // eslint-disable-next-line no-unused-vars
        onClick={(e) => {
          setActive(index);
          handleClick(data._id);
          setCurrentChat(data);
          setUserData(user);
          setActiveStatus(online);
        }}
      >
        <div className="relative">
          <Avatar className="w-[50px] h-[50px] rounded-full object-cover">
            <AvatarImage
              src={getAvatarSrc(user?.avatar)}
              alt={user?.name}
              className="object-cover"
            />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          {online ? (
            <div className="w-[14px] h-[14px] bg-green-500 border-white border-[3px] rounded-full absolute bottom-0 right-0" />
          ) : (
            <div className="w-[14px] h-[14px] bg-white border-gray-400 border-[3px] rounded-full absolute bottom-0 right-0" />
          )}
        </div>
        <div className="pl-3 ">
          <h1 className="text-[18px] font-[500]">
            {user?.name || "Người dùng không tồn tại"}
          </h1>
          {user?.name && (
            <p className="text-[14px] text-gray-600 ">Nhắn tin ngay!</p>
          )}
        </div>
      </Link>
      <Separator className="" />
    </>
  );
};

const Inbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  handleImageUpload,
  getAvatarSrc,
}) => {
  const navigate = useNavigate();
  const scrollAreaRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollableElement) {
        const lastChild = scrollableElement.lastElementChild;
        if (lastChild) {
          lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full flex flex-col justify-between  h-full ">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-[#00a8ff] rounded-t-md text-white">
        <Link to={`/shop/preview/${userData?._id}`} className="flex">
          <Avatar className="size-[55px] rounded-full">
            <AvatarImage
              src={getAvatarSrc(userData?.avatar)}
              alt={userData?.name}
              className="object-cover"
            />
            <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="pl-3 flex flex-col justify-center items-start">
            <h1 className="text-[18px] font-[600]">
              {userData?.name || "User not found"}
            </h1>
            <h1 className="text-[14px] ">
              {activeStatus ? "Đang hoạt động" : "Ngoại tuyến"}
            </h1>
          </div>
        </Link>

        <Button variant="ghost" size="icon">
          <ChevronLeft
            size={20}
            className="cursor-pointer"
            onClick={() => {
              setOpen(false);
              navigate("/profile/inbox", { replace: true });
            }}
          />
        </Button>
      </div>

      {/* messages */}
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-grow overflow-y-auto p-3 h-[25rem]"
      >
        {messages &&
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex w-full my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender !== sellerId && (
                <Avatar className="w-8 h-8 mr-2">
                  <AvatarImage
                    src={getAvatarSrc(userData?.avatar)}
                    className="object-cover"
                  />
                  <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              )}

              {item.images && (
                <div>
                  {item.sender === sellerId ? (
                    <div className="flex">
                      <p
                        className={`flex items-end text-xs text-gray-400 ${
                          item.sender === sellerId ? "mr-2" : "ml-2"
                        }`}
                      >
                        {format(item.createdAt)}
                      </p>
                      <img
                        src={item.images}
                        alt=""
                        className="w-[300px] object-cover rounded-[10px]"
                      />
                    </div>
                  ) : (
                    <div className="flex">
                      <img
                        src={item.images}
                        alt=""
                        className="w-[300px] object-cover rounded-[10px]"
                      />
                      <p
                        className={`flex items-end  text-xs text-gray-400 ${
                          item.sender === sellerId ? "mr-2" : "ml-2"
                        }`}
                      >
                        {format(item.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {item.text !== "" && (
                <div
                  className={`flex items-center ${
                    item.sender === sellerId ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <p
                    className={`text-xs text-gray-400 ${
                      item.sender === sellerId ? "mr-2" : "ml-2"
                    }`}
                  >
                    {format(item.createdAt)}
                  </p>
                  <div
                    className={`p-2 rounded-xl ${
                      item.sender === sellerId
                        ? "bg-blue-600 text-white"
                        : "bg-[#d7dce2] text-black"
                    } ${
                      item?.text?.length === 1 ? "w-auto" : "w-auto"
                    } inline-block px-3 py-2 text-center`}
                  >
                    <p className="break-words">{item.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        <div ref={bottomRef} />
      </ScrollArea>

      {/* send message input */}
      <form
        onSubmit={sendMessageHandler}
        className="flex items-center p-3 border-t"
      >
        <Input
          type="file"
          id="image"
          className="hidden"
          onChange={handleImageUpload}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mr-2 cursor-pointer"
          asChild
        >
          <label htmlFor="image">
            <Image className="h-5 w-5" />
          </label>
        </Button>
        <Input
          type="text"
          placeholder="Tin nhắn..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" size="icon" className="ml-2">
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default UserInbox;
