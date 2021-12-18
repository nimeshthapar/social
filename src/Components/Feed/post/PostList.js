import React from 'react';

import classes from './PostList.module.css';
import PostItem from './PostItem';

const PostList = (props) => {
  return (
    <ul className={classes['post-list__items']}>
      {props.posts.map((post) => {
        return (
          <PostItem
            key={post.id}
            id={post.id}
            username={post.username}
            caption={post.caption}
            image={post.image}
            location={post.location}
            time={post.time}
            feeling={post.feeling}
            userPic={post.userPic}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
          />
        );
      })}
    </ul>
  );
};

export default PostList;
