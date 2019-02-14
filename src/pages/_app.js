import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import { Box, ThemeProvider, GlobalStyle } from '@setlife/ui';
import Header from '../components/Header';

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider>
          <Fragment>
            <Box as="section" width={[1, 0.9, 0.8, 0.6]} mx="auto">
              <Header />
              <Component {...pageProps} />
            </Box>
            <GlobalStyle />
          </Fragment>
        </ThemeProvider>
      </Container>
    );
  }
}
