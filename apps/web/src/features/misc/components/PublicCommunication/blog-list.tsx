import { VerticalCard } from '#src/molecules/VerticalCard/index.js';

import type { BlogBlock } from './data.ts';

export const BlogList = (props: { blogList: BlogBlock[] }) => {
  if (props.blogList.length === 0) {
    return (
      <p className="text-black p-50 justify-center text-[40px] font-medium">
        There are no blog posts at this time
      </p>
    );
  }
  return (
    <div className="">
      <h3 className="text-black text-[20px] mb-[16px] font-medium">
        Latest blog post
      </h3>

      <div className="mb-[47px] flex flex-row bg-newGray-6 p-[30px] space-x-[20px] rounded-[30px] items-center">
        <div className="flex-1 max-w-[530px]">
          <h2 className="text-darkOrange-5 mb-[22px] text-[48px] leading-[56px]">
            {props.blogList[0].title}
          </h2>
          <div className="flex flex-row space-x-[20px] mb-[22px] ">
            <span className="text-black font-semibold text-[24px] leading-[32px]">
              {props.blogList[0].author}
            </span>
            <span className="text-black text-[24px] leading-[32px]">
              {props.blogList[0].createdAt.toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-row space-x-[20px] mb-[22px] ">
            {props.blogList[0].tags.map((item, index) => {
              return (
                <span
                  className="text-black bg-newGray-4 p-[14px] font-medium text-[18px] leading-normal rounded-[10px]"
                  key={index}
                >
                  {item}
                </span>
              );
            })}
          </div>
          <div>
            <p className="text-black">{props.blogList[0].excerpt}</p>
          </div>
        </div>

        <div className="max-w-[510px] max-h-[370px]">
          <img
            className="rounded-[20px]"
            src={props.blogList[0].featuredImage}
            alt=""
          />
        </div>
      </div>
      {props.blogList.length > 1 && (
        <div>
          <h3 className="text-black text-[20px] mb-[16px] font-medium">
            Past articles
          </h3>
          <div className="text-black grid grid-cols-3 gap-4">
            {props.blogList.slice(1).map((blog, index) => {
              return (
                <VerticalCard
                  key={index}
                  imageSrc={blog.featuredImage}
                  title={blog.title}
                  languages={[]}
                  cardColor="grey"
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
