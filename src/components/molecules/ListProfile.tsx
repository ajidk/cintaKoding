import React from "react";

interface ProfileState {
  title: string;
  desc: string;
}

const ListProfile: React.FC<ProfileState> = ({ title, desc }) => {
  return (
    <section className="max-w-lg w-full mx-auto flex justify-between items-center mt-3">
      <div className="text-gray-500">{title} :</div>
      <div className="font-bold">{desc}</div>
    </section>
  );
};

export default ListProfile;
