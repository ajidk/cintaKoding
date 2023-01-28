import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";

const Profile = () => {
  const navigate = useNavigate();
  const user_id: any = localStorage.getItem("user_id");
  const userId = JSON.parse(user_id);

  const { username } = userId?.data[0];

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-7xl w-full ">
      <Header
        onPress={() => navigate("/profile")}
        status={true}
        name={username}
      />
      <div
        className="max-w-xl w-full mx-auto pt-6 cursor-pointer"
        onClick={() => navigate("/post")}
      >
        back
      </div>
      <section className="max-w-lg w-full mx-auto flex justify-between items-center mt-3">
        <div className="text-gray-500">username :</div>
        <div className="font-bold">desc</div>
      </section>
    </main>
  );
};

export default Profile;
