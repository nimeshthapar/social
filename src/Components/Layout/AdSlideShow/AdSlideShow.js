import { useEffect, useState } from 'react';

import Card from '../..//UI/Card';
import classes from './AdSlideShow.module.css';

const DUMMUY_ADS = [
  {
    src: 'https://www.indifi.com/blog/wp-content/uploads/2020/02/Best-Ways-To-Negotiate-Terms-With-Swiggy-1024x290.png',
    adSponsor: 'Swiggy',
    id: 'a1',
  },
  {
    src: 'https://www.mcvuk.com/wp-content/uploads/xbox-logo-1159774.jpeg',
    adSponsor: 'XBOX',
    id: 'a2',
  },
  {
    src: 'https://i.pinimg.com/originals/b4/5c/11/b45c1171eb9a207b8e0ec3697671c702.jpg',
    adSponsor: 'H&M',
    id: 'a3',
  },
];

let adTimer;
const AdSlideShow = () => {
  const [index, setIndex] = useState(0);
  const [showAdText, setShowAdText] = useState(false);

  useEffect(() => {
    if (index === 0 || index === 1 || index === 2) {
      adTimer = setTimeout(() => {
        setIndex((prev) => (prev === DUMMUY_ADS.length - 1 ? 0 : prev + 1));
      }, 3000);
    }

    return () => {
      clearTimeout(adTimer);
    };
  }, [index]);

  const ad = DUMMUY_ADS[index];

  const mouseEnterHandler = () => {
    setShowAdText(true);
  };
  const mouseLeaveHandler = () => {
    setShowAdText(false);
  };

  return (
    <Card
      className={classes['ad-container']}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {showAdText && <p className={classes['ad-text']}>{ad.adSponsor}</p>}
      <img src={ad.src} alt={`${ad.adSponsor}_Ads`} />
    </Card>
  );
};

export default AdSlideShow;
