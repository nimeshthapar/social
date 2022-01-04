import React, { useContext } from 'react';

import classes from './PostList.module.css';
import PostItem from './PostItem';
import Button from '../../UI/Button';
import { AuthContext } from '../../../store/auth-context';

const PostList = (props) => {
  const { posts } = props;

  const authCtx = useContext(AuthContext);

  return (
    <ul className={classes['post-list__items']} style={props.style}>
      {props.updatedPost && posts.length > 0 && (
        <Button
          inverse
          className={classes['load-more-btn']}
          onClick={props.onUpdate}
        >
          {'New Post'}
        </Button>
      )}
      {posts.length > 0 &&
        posts.map((post) => {
          const timeInMilliseconds =
            Date.now() - new Date(post.createdAt).getTime();
          const secondsPassed = Math.round(timeInMilliseconds / 1000);
          const minutesPassed = Math.round(secondsPassed / 60);
          const hoursPassed = Math.round(minutesPassed / 60);
          const daysPassed = Math.round(hoursPassed / 24);
          const monthsPassed = Math.round(daysPassed / 30);
          const yearPassed = Math.round(monthsPassed / 12);

          let time;

          if (secondsPassed < 60) {
            time = `${secondsPassed} sec ago`;
          } else if (minutesPassed < 60) {
            time = `${minutesPassed} min ago`;
          } else if (hoursPassed < 24) {
            time = `${hoursPassed} h ago`;
          } else if (daysPassed) {
            time = `${daysPassed} day ago`;
          } else if (monthsPassed) {
            time = `${monthsPassed} m ago`;
          } else {
            time = `${yearPassed} y ago`;
          }

          return (
            <PostItem
              key={post.id}
              id={post.id}
              username={post.userId.name}
              caption={post.caption}
              image={post.imageURL}
              location={post.location}
              time={time}
              feeling={post.feeling}
              userPic={post.userId.image}
              userId={post.userId.id}
              likesCount={post.likes.length}
              commentsCount={post.comments.length}
              onUpdate={props.onUpdate}
              isLiked={
                !!post.likes.find(
                  (like) => like.toString() === authCtx.userData.id
                )
              }
            />
          );
        })}

      {posts.length === 0 && (
        <h1 className={classes.errorText}>No Post Found.</h1>
      )}
      <div className={classes['post-list__actions']}>
        {props.page === props.totalPages && posts.length > 0 && (
          <h1 className={classes.errorText}>No More Post to Scroll.</h1>
        )}

        {props.page > 1 && (
          <Button
            inverse
            className={classes['load-more-btn']}
            onClick={props.onPrev}
          >
            {props.isLoading ? 'Loading..' : 'Prev'}
          </Button>
        )}
        {posts.length !== 0 && props.page !== props.totalPages && (
          <Button
            inverse
            className={classes['load-more-btn']}
            onClick={props.onNext}
          >
            {props.isLoading ? 'Loading..' : 'Next'}
          </Button>
        )}
      </div>
    </ul>
  );
};

export default PostList;
