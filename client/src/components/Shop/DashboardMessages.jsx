/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { backend_url, server } from "../../server";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ChevronLeft, Image, SendHorizonal } from "lucide-react";

const ENDPOINT = "http://localhost:5001/";
let socket;

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [conversationsUpdate, setConversationsUpdate] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [images, setImages] = useState();

  // useEffect(() => {
  //   socket = socketIO(ENDPOINT, { transports: ["websocket"] });

  //   if (seller) {
  //     socket.emit("addUser", seller._id);
  //     socket.on("getUsers", (users) => {
  //       setOnlineUsers(users);
  //     });
  //     socket.on("getMessage", (data) => {
  //       setArrivalMessage({
  //         sender: data.senderId,
  //         text: data.text,
  //         createdAt: Date.now(),
  //       });
  //       // Kích hoạt cập nhật danh sách hội thoại
  //       setConversationsUpdate((prev) => prev + 1);
  //     });
  //   }

  //   return () => {
  //     socket.off("getUsers");
  //     socket.off("getMessage");
  //     socket.disconnect();
  //   };
  // }, [seller]);

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    if (seller) {
      // hoặc user cho UserInbox
      socket.emit("addUser", seller._id);
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
  }, [seller]); // hoặc [user] cho UserInbox

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
          `${server}/conversation/get-all-seller-conversation/${seller?._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };
    if (seller) {
      getConversations();
    }
  }, [seller, conversationsUpdate]); // Thêm conversationsUpdate vào dependencies

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
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socket.emit("sendMessage", {
      senderId: seller._id,
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
      // Kích hoạt cập nhật danh sách hội thoại
      setConversationsUpdate((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socket.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    try {
      await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: seller._id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onlineCheck = (chat) => {
    const chatMember = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return !!online;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImages(base64);
    imageSendHandler(base64);
  };

  // const imageSendHandler = async (base64Image) => {
  //   const messageData = {
  //     images: base64Image,
  //     sender: seller._id,
  //     text: newMessage,
  //     conversationId: currentChat._id,
  //   };

  //   const receiverId = currentChat.members.find(
  //     (member) => member !== seller._id
  //   );

  //   socket.emit("sendMessage", {
  //     senderId: seller._id,
  //     receiverId,
  //     images: base64Image,
  //   });

  //   try {
  //     const response = await axios.post(
  //       `${server}/message/create-new-message`,
  //       messageData
  //     );
  //     setImages();
  //     setMessages([...messages, response.data.message]);
  //     updateLastImageMessage();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const imageSendHandler = async (base64Image) => {
    const messageData = {
      images: base64Image,
      sender: seller._id, // hoặc user._id cho UserInbox
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id // hoặc user._id cho UserInbox
    );

    socket.emit("sendMessage", {
      senderId: seller._id, // hoặc user._id cho UserInbox
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
        lastMessageId: seller._id,
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
    <Card className="w-full m-4 h-[51rem]">
      <CardContent className="p-0">
        {!open && (
          <>
            <CardHeader className="bg-[#00a8ff] text-white rounded-t-lg">
              <CardTitle className="text-center text-2xl">
                Tất cả tin nhắn
              </CardTitle>
            </CardHeader>

            {conversations.length === 0 && (
              <div className="flex items-center justify-center h-[60vh]">
                <p className="text-2xl">Chưa có tin nhắn nào</p>
              </div>
            )}

            <ScrollArea className="h-full">
              {conversations &&
                conversations.map((item) => (
                  <MessageList
                    key={item._id}
                    data={item}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    me={seller._id}
                    setUserData={setUserData}
                    userData={userData}
                    online={onlineCheck(item)}
                    setActiveStatus={setActiveStatus}
                    getAvatarSrc={getAvatarSrc}
                  />
                ))}
            </ScrollArea>
          </>
        )}

        {open && (
          <SellerInbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            sellerId={seller._id}
            userData={userData}
            activeStatus={activeStatus}
            handleImageUpload={handleImageUpload}
            getAvatarSrc={getAvatarSrc}
          />
        )}
      </CardContent>
    </Card>
  );
};

const MessageList = ({
  data,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  getAvatarSrc,
}) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };

  useEffect(() => {
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [me, data]);

  return (
    <Button
      variant="ghost"
      className="w-full h-[4rem] justify-start p-3 border-y"
      onClick={() =>
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <Avatar className="w-12 h-12 mr-3 ">
        <AvatarImage
          src={getAvatarSrc(user?.avatar)}
          className="object-cover"
        />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold flex items-center justify-start">
          {user?.name}
        </p>
        <p className="text-sm text-muted-foreground">Nhắn tin ngay</p>
      </div>
      {online && <div className="w-3 h-3 bg-green-500 rounded-full ml-auto" />}
    </Button>
  );
};

const SellerInbox = ({
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
  const scrollAreaRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const lastChild = scrollAreaRef.current.lastElementChild;
      if (lastChild) {
        lastChild.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-[#00a8ff] rounded-t-lg">
        <div className="flex items-center text-white">
          <Avatar className="w-12 h-12 mr-3">
            <AvatarImage
              src={getAvatarSrc(userData?.avatar)}
              className="object-cover"
            />
            <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{userData?.name}</p>
            <p className="text-sm text-muted-foreground">
              {activeStatus ? "Đang hoạt động" : "Ngoại tuyến"}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <ChevronLeft className="h-4 w-4 " />
        </Button>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-grow !h-[42rem] p-3">
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

export default DashboardMessages;
