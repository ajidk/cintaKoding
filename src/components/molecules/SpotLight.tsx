import React, { Fragment } from "react";

interface SpotState {
  name: any;
  body: string;
  totalComment?: string;
  comment?: any;
  onPressDetail?: () => void;
}

const SpotLight: React.FC<SpotState> = ({
  name,
  body,
  totalComment,
  onPressDetail,
  comment,
}) => {
  return (
    <main className="flex items-start mt-6">
      <section className="w-1/5 font-bold ">{name?.slice(0, 10)}</section>
      <section className="w-4/5">
        <div className="">{body}</div>
        {totalComment ? (
          <div className="flex items-center text-sm gap-x-4 text-blue-400 mt-2">
            <div>totalComment {totalComment}</div>
            <div onClick={onPressDetail} className="cursor-pointer">
              detail
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="my-4 text-gray-400">All Comment</div>
            {comment?.map((item: any, idx: number) => {
              return (
                <main className="flex items-start" key={idx}>
                  <section className="w-1/5 font-bold">{item.name.slice(0,8)}</section>
                  <section className="w-4/5">{item.body}</section>
                </main>
              );
            })}
          </Fragment>
        )}
      </section>
    </main>
  );
};

export default SpotLight;
