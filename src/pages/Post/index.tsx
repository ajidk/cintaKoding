import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Header, SpotLight } from "../../components";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [items, setItem] = useState<any>([]);
  // const [Random, setRandom] = useState<any>([]);
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

  // useEffect(() => {
  //   var post: any;

  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         return Promise.reject(response);
  //       }
  //     })
  //     .then((data) => {
  //       post = data;
  //       // console.log(data);

  //       return post.map((item: any) => {
  //         return fetch(
  //           "https://jsonplaceholder.typicode.com/users/" + item.userId
  //         );
  //       });
  //     })
  //     .then((response) => {
  //       return console.log('data',response);
        
  //       // if (response.ok) {
  //       //   return response.json();
  //       // } else {
  //       //   return Promise.reject(response);
  //       // }
  //     })
  //     .then((userData) => {
  //       // console.log(userData);

  //       // console.log("post", post, "user", userData);
  //       // console.log({ ...post, ...userData });
  //       // setRandom({ ...post, ...userData });
  //     })
  //     .catch((error) => {
  //       console.warn(error);
  //     });
  // }, []);

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

  // console.log(Random);

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
