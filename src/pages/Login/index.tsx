/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadUsers } from "../../feature/users/actions";
import { LoginState } from "../../utils";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  const [form, setForm] = useState<LoginState>({
    username: "",
    password: "",
  });

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const handleInput = (event: any) => {
    setForm({ ...form, [event.target.placeholder]: event.target.value });
  };

  const handleLogin = () => {
    console.log(form);

    const dataUser = users?.data?.filter(
      (item: any) =>
        item.username === form.username && item.username === form.password
    );

    if (dataUser.length !== 0) {
      console.log("get user", dataUser);
      localStorage.setItem("user_id", JSON.stringify({ data: dataUser }));
      toast.success("Login berhasil");
      navigate("/post");
    } else {
      console.log("password salah");
      toast.error("Login gagal");
      localStorage.removeItem("user_id");
    }
  };

  return (
    <section className="flex h-screen flex-col mx-auto max-w-xs justify-center items-center w-full">
      <div className="text-lg font-semibold mb-10">Login Page</div>
      <input
        placeholder="username"
        value={form.username}
        className="inputLogin mb-7"
        onChange={handleInput}
      />
      <input
        type="password"
        placeholder="password"
        value={form.password}
        className="inputLogin mb-7"
        onChange={handleInput}
      />
      <button
        className="bg-blue-500 px-5 py-2 rounded-xl text-center w-full text-white "
        onClick={handleLogin}
      >
        Login
      </button>
    </section>
  );
}

export default Login;
