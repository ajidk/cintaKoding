import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { Header, SpotLight } from "../../components";
import Tooltip from "../../components/molecules/Tooltip";
import { LoadPost, LoadPostComment } from "../../feature/posts/actions";

function Post() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user_id: any = localStorage.getItem("user_id");
  const userId = JSON.parse(user_id);
  const [post, setPost] = useState<any>([]);
  const { id, username } = userId?.data[0];

  useEffect(() => {
    userId === null && navigate("/login");
  }, [navigate, userId]);

  useEffect(() => {
    dispatch(LoadPost({ limit: 10 })).then((item: any) => {
      setPost(item?.payload?.data);
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(LoadPostComment({ id: id }));
  }, [dispatch, id]);

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-7xl w-full ">
      <Header
        onPress={() => navigate("/profile")}
        status={true}
        name={username}
      />
      <section className="max-w-xl w-full mx-auto mt-6">
        <div className="flex bg-gray-100 relative items-center rounded-xl">
          <input
            placeholder="Search"
            className="text-sm text-gray-500 text-center bg-gray-100 py-2 flex-1 rounded-xl outline-none w-full"
          />
          <div className="absolute right-2">cari</div>
        </div>

        {post &&
          post?.map((item: any, idx: number) => {
            return (
              <SpotLight
                key={idx}
                name={item?.title}
                body={item?.body}
                onPressDetail={() => navigate(`/post/${item?.id}`)}
                totalComment={"3"}
              />
            );
          })}
      </section>
    </main>
  );
}

export default Post;
