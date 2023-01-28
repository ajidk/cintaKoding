import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Header, SpotLight } from "../../components";
import { LoadPost, LoadPostComment } from "../../feature/posts/actions";
import { loadUserId } from "../../feature/users/actions";

function DetailPost() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const user_id: any = localStorage.getItem("user_id");
  const dispatch = useAppDispatch();
  const { comments, dataPost } = useAppSelector((state) => state?.posts);
  const userId = JSON.parse(user_id);
  const { username } = userId?.data[0];

  useEffect(() => {
    dispatch(LoadPost({ id: Number(postId) }));
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(LoadPostComment({ id: Number(postId) }));
  }, [dispatch, postId]);

  return (
    <main className="flex flex-1 flex-col mx-auto max-w-7xl w-full ">
      <Header onPress={() => navigate("login")} status={true} name={username} />
      <div
        className="max-w-xl w-full mx-auto pt-6 cursor-pointer"
        onClick={() => navigate("/post")}
      >
        back
      </div>
      <section className="max-w-xl w-full mx-auto">
        <SpotLight
          name={dataPost?.data?.title}
          body={dataPost?.data?.body}
          comment={comments?.data}
        />
      </section>
    </main>
  );
}

export default DetailPost;
