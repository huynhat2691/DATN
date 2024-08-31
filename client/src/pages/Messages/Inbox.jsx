/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { format } from "timeago.js";
import { IoImageOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { backend_url } from "../../server";
import styles from "../../styles/styles";

const Inbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
}) => {
  const scrollRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full flex flex-col justify-between h-[60vh] border  border-gray-200 rounded-[10px]">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-300 rounded-t-[10px] ">
        <div className="flex">
          <img
            src={`${backend_url}${userData?.avatar}`}
            alt=""
            className="size-[60px] rounded-full object-cover"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
            <h1>{activeStatus ? "Online" : "Offline"}</h1>
          </div>
        </div>
        <IoIosArrowBack
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* messages */}
      <div
        ref={messagesContainerRef}
        className="px-3 flex-grow overflow-y-auto"
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
                <img
                  src={`${backend_url}${userData?.avatar}`}
                  alt=""
                  className="size-[40px] rounded-full mr-2 object-cover"
                />
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
                      item.text.length === 1 ? "w-auto" : "w-auto"
                    } inline-block px-3 py-2 text-center`}
                  >
                    <p className="break-words">{item.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        <div ref={scrollRef} />
      </div>

      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[4%]">
          <IoImageOutline size={25} className="cursor-pointer" />
        </div>
        <div className="w-[95%]">
          <input
            type="text"
            placeholder="Type a message"
            className={`${styles.input}`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <VscSend
              size={17}
              className="cursor-pointer absolute right-5 top-[50%] translate-y-[-50%]"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Inbox;