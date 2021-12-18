import React, { Fragment, useState } from 'react';
import PostList from '../../Components/Feed/post/PostList';
import Share from '../../Components/Feed/share/Share';

const DUMMY_POSTS = [
  {
    id: 'p1',
    username: 'Zhuo Fan',
    userPic: 'https://img-9gag-fun.9cache.com/photo/aGpRzV6_460s.jpg',
    caption:
      'Zhuo Fan killing seemed to be no ordinary killing at all, but rather like a king depriving the slave of his life',
    image:
      'https://w0.peakpx.com/wallpaper/1014/474/HD-wallpaper-zhuo-fan-devil-manhwa-demon-demonic-emperor-magic-emperor.jpg',
    location: 'Tianyu Empire',
    time: '12min ago',
    feeling: '🔥Lit',
    likesCount: 58,
    commentsCount: 25,
  },
  {
    id: 'p2',
    username: 'Sung Jin Woo',
    userPic:
      'https://pbs.twimg.com/profile_images/1353849232495505408/wbrAWRBv_400x400.jpg',
    image:
      'https://i.pinimg.com/originals/0f/6d/a9/0f6da9b6df2db0a3c2326221ddc38c56.png',
    location: 'Seoul, South Korea',
    time: '15min ago',
    feeling: '😊 Happy',
    likesCount: 78,
    commentsCount: 28,
  },
  {
    id: 'p3',
    username: 'Madara Uchiha',
    userPic:
      'https://i1.sndcdn.com/artworks-flVMHt0yHwtiyTld-eqxeSg-t500x500.jpg',
    caption:
      '"In this world, wherever there is light - there are also shadows. As long as the concept of winners exists, there must also be losers. The selfish desire of wanting to maintain peace causes wars, and hatred is born to protect love."- Madara Uchiha',
    location: 'Konoha Village',
    time: '30min ago',
    likesCount: 112,
    commentsCount: 25,
  },
  {
    id: 'p4',
    username: 'Admin',
    userPic:
      'https://animesher.com/orig/1/117/1178/11781/animesher.com_shonen-hinata-shouyou-manga-1178122.jpg',
    caption: 'Hey its my first post',
    location: 'Ghar se',
    time: '15min ago',
    feeling: '😊 Happy',
    likesCount: 8,
    commentsCount: 2,
  },
];

const Feed = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  const addPostHandler = (data) => {
    setPosts((prev) => [data, ...prev]);
  };

  return (
    <Fragment>
      <Share onAdd={addPostHandler} />
      <PostList posts={posts} />
    </Fragment>
  );
};

export default Feed;
