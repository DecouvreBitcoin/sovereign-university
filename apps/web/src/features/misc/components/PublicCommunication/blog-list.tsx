import { IoMdArrowForward } from 'react-icons/io';

import { useGreater } from '#src/hooks/use-greater.ts';
import { VerticalCard } from '#src/molecules/VerticalCard/index.tsx';

import type { BlogBlock } from './data.ts';
import { FeaturedCard } from './featured-card.tsx';

export const BlogList = (props: { blogList: BlogBlock[] }) => {
  const isScreenMd = useGreater('md');

  if (props.blogList.length === 0) {
    return (
      <p className="text-black p-[50px] justify-center text-[40px] font-medium mx-auto">
        There are no blog posts at this time
      </p>
    );
  }

  return (
    <div className="mx-auto">
      <h3 className="text-black mobile-h3 lg:desktop-h3 mb-[16px]">
        Latest blog post
      </h3>
      <FeaturedCard blog={props.blogList[0]} />

      {props.blogList.length > 1 && (
        <div>
          <h3 className="text-black mobile-h3 lg:desktop-h3 mb-[16px]">
            Past articles
          </h3>
          <div className="text-black grid grid-cols-2 lg:grid-cols-3 gap-4">
            {props.blogList.slice(1).map((blog, index) => (
              <VerticalCard
                key={index}
                imageSrc={blog.featuredImage}
                title={blog.title}
                languages={[]}
                cardColor="lightgrey"
                className="text-start"
                buttonIcon={<IoMdArrowForward size={isScreenMd ? 24 : 16} />}
                buttonVariant="newPrimary"
                buttonMode="dark"
                subtitle={blog.category}
                buttonText="Read more"
                buttonLink="#"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
