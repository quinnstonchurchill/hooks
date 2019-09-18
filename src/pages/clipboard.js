import React from 'react';
import { Box, Flex, Text, Button } from '@setlife/ui';

import { useClipboard } from '../hooks';

export default () => {
  const [clipboard, isCoppied] = useClipboard();
  return (
    <Box>
      <Flex alignItems="center">
        <Text ref={clipboard.ref}>Text to copy</Text>
        <Button onClick={clipboard.onClick} ml="2rem">
          {isCoppied ? 'Copied!' : 'Copy'}
        </Button>
      </Flex>
    </Box>
  );
};
