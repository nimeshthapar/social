import React, { Fragment, useEffect, useRef, useState } from 'react';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button';
import classes from './UpdatePost.module.css';

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

const UpdatePost = (props) => {
  const [captionInput, setCaptionInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const captionRef = useRef();
  const locationRef = useRef();

  const foundData = DUMMY_POSTS.find((p) => p.id === props.id);

  useEffect(() => {
    if (foundData) {
      setCaptionInput(foundData.caption);
      setLocationInput(foundData.location);
    }
  }, [foundData]);

  const locationChangeHandler = (e) => {
    setLocationInput(e.target.value);
  };

  const captionChangeHandler = (e) => {
    setCaptionInput(e.target.value);
  };

  const updatePostSubmitHandler = (e) => {
    e.preventDefault();

    console.log({
      caption: captionInput,
      location: locationInput,
    });
  };

  return (
    <Modal
      header="Update Post"
      footer={
        <Fragment>
          <Button onClick={props.onClose} danger>
            Close
          </Button>
          <Button type="submit" inverse>
            Update
          </Button>
        </Fragment>
      }
      onClose={props.onClose}
      onSubmit={updatePostSubmitHandler}
    >
      <div className={classes['form-items__container']}>
        <div className={classes['form-items__input-container']}>
          <label htmlFor="caption">Caption</label>
          <textarea
            rows="3"
            placeholder="Write a Caption Text"
            onChange={captionChangeHandler}
            value={captionInput}
            ref={captionRef}
          />
        </div>
        <div className={classes['form-items__input-container']}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            placeholder="Write your Location"
            onChange={locationChangeHandler}
            value={locationInput}
            ref={locationRef}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePost;
