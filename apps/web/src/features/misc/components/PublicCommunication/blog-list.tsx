import { VerticalCard } from '#src/molecules/VerticalCard/index.js';

import type { BlogBlock } from './data.ts';

export const BlogList = (props: { blogList: BlogBlock[] }) => {
  if (props.blogList.length === 0) {
    return <p className="text-black">There are no blog posts at this time</p>;
  }
  return (
    <div>
      <h3 className="text-black">Latest blog post</h3>

      <div className="flex flex-row">
        <div className="max-w-[500px]">
          <img src={props.blogList[0].featuredImage} alt="" />
        </div>

        <div className="flex-1">
          <div className="text-black">{props.blogList[0].title}</div>
          <div>
            <span className="text-black">{props.blogList[0].author}</span>
            <span className="text-black">
              {props.blogList[0].createdAt.toLocaleDateString()}
            </span>
          </div>
          <div>
            {props.blogList[0].tags.map((item, index) => {
              return (
                <span className="text-black" key={index}>
                  {item}
                </span>
              );
            })}
          </div>
          <div>
            <p className="text-black">{props.blogList[0].excerpt}</p>
          </div>
        </div>
      </div>
      {props.blogList.length > 1 && (
        <div>
          <h3 className="text-black">Past articles</h3>
          <div className="text-black grid grid-cols-4 gap-4">
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
