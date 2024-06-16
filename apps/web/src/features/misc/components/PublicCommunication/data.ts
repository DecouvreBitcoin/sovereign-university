export interface BlogBlock {
  title: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: Date;
  featuredImage: string;
  excerpt: string;
  content: string;
  id: string;
}

interface BlogListType {
  content: BlogBlock[];
}

export const blogList: BlogListType = {
  content: [
    {
      title: 'Benin community joining the Network',
      category: 'network',
      tags: ['network', 'bitcoin'],
      author: 'Doe Irva',
      createdAt: new Date(),
      featuredImage:
        'https://planb.network/cdn/f346b207c81e4bcf5335c947690bb00c758a4f97/resources/conference/lecture-rockstardev/assets/thumbnail.webp',
      excerpt:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      content:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      id: '1',
    },
    {
      title: 'Benin community joining the Network 2',
      category: 'network',
      tags: ['network', 'bitcoin'],
      author: 'Doe Irva',
      createdAt: new Date(),
      featuredImage:
        'https://planb.network/cdn/f346b207c81e4bcf5335c947690bb00c758a4f97/resources/conference/lecture-rockstardev/assets/thumbnail.webp',
      excerpt:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      content:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      id: '2',
    },
    {
      title: 'Benin community joining the Network 3',
      category: 'course',
      tags: ['network', 'bitcoin'],
      author: 'Doe Irva',
      createdAt: new Date(),
      featuredImage:
        'https://planb.network/cdn/f346b207c81e4bcf5335c947690bb00c758a4f97/resources/conference/lecture-rockstardev/assets/thumbnail.webp',
      excerpt:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      content:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      id: '3',
    },
    {
      title: 'Benin community joining the Network 4',
      category: 'network',
      tags: ['network', 'bitcoin'],
      author: 'Doe Irva',
      createdAt: new Date(),
      featuredImage:
        'https://planb.network/cdn/f346b207c81e4bcf5335c947690bb00c758a4f97/resources/conference/lecture-rockstardev/assets/thumbnail.webp',
      excerpt:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      content:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      id: '4',
    },
    {
      title: 'Benin community joining the Network 5',
      category: 'patch',
      tags: ['network', 'bitcoin'],
      author: 'Doe Irva',
      createdAt: new Date(),
      featuredImage:
        'https://planb.network/cdn/f346b207c81e4bcf5335c947690bb00c758a4f97/resources/conference/lecture-rockstardev/assets/thumbnail.webp',
      excerpt:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      content:
        'Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries Bitcoin is now a topic to be taught at school in El Salvador and in the future in other countries',
      id: '5',
    },
  ],
};
