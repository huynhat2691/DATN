/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { backend_url, server } from "../../server";

const MessageList = ({
  data,
  index,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  setOpen,
}) => {
  const [active, setActive] = useState(0);
  const [user, setUser] = useState(null);

  const handleClick = () => {
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
    <div
      className={`w-full flex p-3  ${
        active === index ? "bg-gray-200" : "bg-transparent"
      }  cursor-pointer`}
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
        <img
          src={`${backend_url}${user?.avatar}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        {online ? (
          <div className="w-[14px] h-[14px] bg-green-500 border-white border-[3px] rounded-full absolute bottom-0 right-0" />
        ) : (
          <div className="w-[14px] h-[14px] bg-white border-gray-400 border-[3px] rounded-full absolute bottom-0 right-0" />
        )}
      </div>
      <div className="pl-3 ">
        <h1 className="text-[18px] font-[600]">{user?.name}</h1>
        <p className="text-[14px] text-gray-600 ">Message now</p>
      </div>
    </div>
  );
};

export default MessageList;
