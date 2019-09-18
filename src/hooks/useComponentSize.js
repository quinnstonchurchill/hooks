import { useCallback, useState, useLayoutEffect } from 'react';

function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0
    };
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  };
}

export default function useComponentSize(ref) {
  // declare initial state & setter function
  const [ComponentSize, setComponentSize] = useState(
    getSize(ref ? ref.current : {})
  );

  // return memoized version that only changes if element size changes
  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(getSize(ref.current));
    }
  }, [ref]);

  // fires after every DOM mutation. Good for reading DOM
  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    // componentDidMount
    window.addEventListener('resize', handleResize);

    // componentWillUnmount cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);

  return ComponentSize;
}
