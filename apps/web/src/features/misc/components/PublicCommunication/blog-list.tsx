import { VerticalCard } from '#src/molecules/VerticalCard/index.js';

import type { BlogBlock } from './data.ts';

export const BlogList = (props: { blogList: BlogBlock[] }) => {
  if (props.blogList.length === 0) {
    return (
      <p className="text-black p-[50px] justify-center text-[40px] font-medium mx-auto">
        There are no blog posts at this time
      </p>
    );
  }
  return (
    <div className="mx-auto">
      <h3 className="text-black text-[20px] mb-[16px] font-medium">
        Latest blog post
      </h3>

      <div className="mb-[47px] text-start flex flex-col mx-auto lg:mx-0 md:flex-row justify-center bg-newGray-6 px-[8px] py-[10px] lg:p-[30px] w-full max-w-[290px] md:max-w-[1120px] rounded-sm lg:rounded-[30px] items-center">
        <div className="flex-1 w-full max-w-[530px] order-2 lg:order-1">
          <h2 className="text-darkOrange-5 mb-[8px] text-[18px] font-medium leading-[24px] lg:mb-[22px] lg:text-[48px] lg:leading-[56px]">
            {props.blogList[0].title}
          </h2>
          <div className="flex flex-row space-x-[20px] mb-[8px] lg:mb-[22px] ">
            <span className="text-black font-medium lg:font-semibold text-[16px] leading-[24px] lg:text-[24px] lg:leading-[32px]">
              {props.blogList[0].author}
            </span>
            <span className="text-black lg:text-[24px] lg:leading-[32px] font-medium lg:font-normal text-[16px] leading-[24px]">
              {props.blogList[0].createdAt.toLocaleDateString()}
            </span>
          </div>
          <div className="flex flex-row space-x-[15px] mb-[8px] lg:mb-[22px] ">
            {props.blogList[0].tags.map((item, index) => {
              return (
                <span
                  className="text-black bg-newGray-4 py-[2px] px-[8px] lg:p-[14px] font-medium text-[16px] lg:text-[18px] leading-normal rounded-[10px]"
                  key={index}
                >
                  {item}
                </span>
              );
            })}
          </div>
          <div>
            <p className="text-black hidden md:flex">
              {props.blogList[0].excerpt}
            </p>
          </div>
        </div>

        <div className="mb-3 md:mr-[20px] lg:mr-0 lg:ml-[20px] lg:mb-0 lg:max-w-[510px w-full flex-1 mx-auto order-1 lg:order-2">
          <img
            className="rounded-sm lg:rounded-[20px]"
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
          <div className="text-black grid grid-cols-2 lg:grid-cols-3 gap-4">
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
