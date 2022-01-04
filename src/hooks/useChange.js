import { useCallback, useState } from 'react';

const useChange = (val = '') => {
  const [value, setValue] = useState(val);

  const valueChangeHandler = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return { value, valueChangeHandler, setValue };
};

export default useChange;
