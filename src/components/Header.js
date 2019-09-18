import React from 'react';
import { Box, Text, Flex } from '@setlife/ui';
import { default as LinkBase } from 'next/link';

const Link = ({ href, name }) => (
  <LinkBase href={href}>
    <a>
      <Text color="blue" fontWeight={600} mr="2rem">
        {name}
      </Text>
    </a>
  </LinkBase>
);

const routes = [
  { name: 'Home', href: '/' },
  { name: 'Basic', href: '/basic' },
  { name: 'Component Size', href: '/component-size' },
  { name: 'Click Outside', href: '/click-outside' },
  { name: 'Animations', href: '/animations' },
  { name: 'Async', href: '/async' },
  { name: 'Performance', href: '/performance' },
  { name: 'Copy to Clipboard', href: '/clipboard' }
];

export default () => (
  <Flex direction="row" height={80} alignItems="center">
    {routes.map((r, i) => (
      <Link key={i} {...r} />
    ))}
  </Flex>
);
