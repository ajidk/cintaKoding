import React from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "./Tooltip";

interface HeaderParams {
  onPress?: () => void;
  status?: boolean;
  name?: string;
}

const Header: React.FC<HeaderParams> = ({ onPress, status, name }) => {
  const navigate = useNavigate();
  return (
    <div className="h-[10vh] drop-shadow z-20 grid grid-cols-3 justify-between items-center px-4 mx-auto w-full sticky top-0 bg-white">
      <div className="font-bold text-2xl">Cinta Koding</div>
      {status && (
        <div className="text-gray-400 mt-2 text-center ">
          <span
            className="border-b-2 border-blue-500 cursor-pointer"
            onClick={() => navigate("/post")}
          >
            Post
          </span>
        </div>
      )}
      <div className={`flex justify-end ${status !== true && "col-span-2"}`}>
        {status ? (
          <div
            className="font-bold text-2xl flex items-center gap-x-2"
            onClick={onPress}
          >
            Welcome,{" "}
            {/* <span className="text-blue-500 cursor-pointer">{name}</span> */}
            <Tooltip
              className="text-blue-500 cursor-pointer"
              tooltipText={String(name)}
            >
              {name}
            </Tooltip>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-white text-center px-6 py-1 rounded-3xl cursor-pointer"
            onClick={onPress}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
