/* eslint-disable react-hooks/exhaustive-deps */
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Header, SpotLight } from "../../components";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [items, setItem] = useState<any>([]);
  const navigate = useNavigate();
  const [pageCount, setpageCount] = useState(0);
  let limit = 10;
  const user_id: any = localStorage.getItem("user_id");
  const userId = JSON.parse(user_id);
  const { username } = userId?.data[0];

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total: any = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / 10));
      setItem(data);
    };
    getComments();
  }, [limit]);

  function getResults() {
    const checkResult = (res: any) =>
      res.ok ? res.json() : Promise.resolve({});
    const joinMap = (
      { title, body: lbody }: any,
      { name, body: rbody }: any
    ) => ({
      title,
      lbody,
      rbody,
      name,
    });

    const equiJoin = (
      xs: any,
      ys: any,
      primary: any,
      foreign: any,
      sel: any
    ) => {
      const ix = xs.reduce(
        (ix: any, row: any) => ix.set(row[primary], row),
        new Map()
      );
      return ys.map((row: any) => sel(ix.get(row[foreign]), row));
    };
    const posts = fetch("https://jsonplaceholder.typicode.com/posts").then(
      checkResult
    );

    const comments = fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then(checkResult);

    return Promise.all([posts, comments])
      .then(([postData, commentData]) => {
        const result = equiJoin(postData, commentData, "id", "postId", joinMap);
        console.log("masuk", result);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getResults();
  }, [getResults]);

  const paginationPost = async (currentPage: any) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=10`
    );
    const data = await res.json();

    return data;
  };

  const handleClick = async (data: any) => {
    let currentPage = data.selected + 1;
    const commentsFormServer = await paginationPost(currentPage);
    setItem(commentsFormServer);
  };

  return (
    <div className="flex flex-1 flex-col mx-auto max-w-7xl w-full ">
      <Header
        onPress={() => navigate("/profile")}
        status={true}
        name={username}
      />
      <section className="max-w-xl w-full mx-auto my-6">
        <div className="flex bg-gray-100 relative items-center rounded-xl">
          <input
            placeholder="Search"
            className="text-sm text-gray-500 text-center bg-gray-100 py-2 flex-1 rounded-xl outline-none w-full"
          />
          <div className="absolute right-2">cari</div>
        </div>

        {items &&
          items?.map((item: any, idx: number) => {
            // getCommentPost(item.userId);
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

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handleClick}
        containerClassName={"flex justify-center gap-x-4 mb-6"}
        pageClassName={"border px-2 py-1"}
        pageLinkClassName={""}
        previousClassName={"border px-2 py-1"}
        previousLinkClassName={""}
        nextClassName={"border px-2 py-1"}
        nextLinkClassName={""}
        breakClassName={"border px-2 py-1"}
        breakLinkClassName={""}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Post;
