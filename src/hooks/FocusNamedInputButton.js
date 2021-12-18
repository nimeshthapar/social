import { useCallback, useState } from 'react';

const useFocusNamedInputButton = (clicked) => {
  const [buttonIsClicked, setButtonIsClicked] = useState(clicked || false);

  const openNewPostBtnHandler = useCallback((action, value) => {
    setButtonIsClicked(true);
    setTimeout(() => {
      action(value);
    }, 100);
  }, []);

  const resetButtonClicked = useCallback(() => {
    setButtonIsClicked(false);
  }, []);

  const closeFocusInputButton = useCallback((action, value) => {
    setButtonIsClicked(false);
    action(value);
  }, []);
  return {
    buttonIsClicked,
    openNewPostBtnHandler,
    setButtonIsClicked,
    closeFocusInputButton,
    resetButtonClicked,
  };
};

export default useFocusNamedInputButton;
