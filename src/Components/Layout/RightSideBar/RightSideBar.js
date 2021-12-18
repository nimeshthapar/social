import React, { useState } from 'react';
import AdSlideShow from '../AdSlideShow/AdSlideShow';
import FriendList from '../FriendList/FriendList';
import classes from './RightSideBar.module.css';

const DUMMY_SUGGESTIONS_FRIENDS = [
  {
    id: 's1',
    name: 'Zhuo Fan',
    image: 'https://img-9gag-fun.9cache.com/photo/aGpRzV6_460s.jpg',
    isActive: true,
  },
  {
    id: 's2',
    name: 'Eruko Shindou',
    image:
      'https://thicc.mywaifulist.moe/waifus/26842/5bb2272d996141aa978ecbacc5df6076257e57d201160a3989eb2c8589e7e151_thumb.png',
    isActive: true,
  },
  {
    id: 's3',
    name: 'Eren Yeager',
    image:
      'https://64.media.tumblr.com/3d657d3889bd165e8d2aded94bb45abd/3f2a7531bf039eb9-be/s500x750/d883f5396cd39e555633af07e8287933123e0b5a.jpg',
    isActive: true,
  },
  {
    id: 's4',
    name: ' Kim Dokja',
    image:
      'https://64.media.tumblr.com/0388bc6bebc2de78e9b20a93cb3e3bd0/a9099d4f76acbad5-00/s540x810/d32006d31a095683440a7dfe5e2b3a254172d401.jpg',
  },
];

const RightSideBar = (props) => {
  const [suggestedFriends, setSuggestedFriends] = useState(
    DUMMY_SUGGESTIONS_FRIENDS
  );

  const addToContactHandler = (id) => {
    const addToContactsFriend = DUMMY_SUGGESTIONS_FRIENDS.find(
      (s) => s.id === id
    );

    setSuggestedFriends(suggestedFriends.filter((s) => s.id !== id));

    props.onAdd(addToContactsFriend);
  };
  return (
    <div className={classes.rightsidebar}>
      <div>
        <p className={classes['container-text']}>Sponsored Ads</p>
        <AdSlideShow />
      </div>
      <hr />
      <div>
        <p className={classes['container-text']}>People You May Know</p>
        <FriendList
          friends={suggestedFriends}
          suggestion={true}
          onAdd={addToContactHandler}
        />
      </div>
    </div>
  );
};

export default RightSideBar;
