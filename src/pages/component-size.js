import React, { useCallback, useState, useLayoutEffect, useRef } from 'react';
import { Box, Text, Flex } from '@setlife/ui';

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

function useComponentSize(ref) {
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

  // fires after every DOM umutation. Good for reading DOM
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

export default () => {
  const ref = useRef(null);
  const size = useComponentSize(ref);
  const { width, height } = size;

  return (
    <Flex>
      <Box ref={ref} width="100%" height={320} bg="green">
        <Text color="white">
          The box height is {height}
          px
        </Text>
        <Text color="white">
          The box width is {width}
          px
        </Text>
      </Box>
    </Flex>
  );
};
