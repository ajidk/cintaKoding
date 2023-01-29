import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Header } from "../../components";
import ListProfile from "../../components/molecules/ListProfile";
import { loadUserId } from "../../feature/users/actions";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user_id: any = localStorage.getItem("user_id");
  const userId = JSON.parse(user_id);
  const [item, setItem] = useState<any>();

  const { username, id } = userId?.data[0];

  useEffect(() => {
    dispatch(loadUserId({ user_id: id })).then((item: any) => {
      setItem(item?.payload?.data[0]);
    });
  }, [dispatch, id]);

  // console.log(user);

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

      <ListProfile title="Username" desc={item?.name} />
      <ListProfile title="Address" desc={item?.website} />
      <ListProfile title="Email" desc={item?.email} />
      <ListProfile title="Phone" desc={item?.phone} />
    </main>
  );
};

export default Profile;
