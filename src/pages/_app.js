import React, { Fragment } from 'react'
import App, { Container } from 'next/app'
import { ThemeProvider, GlobalStyle } from '@setlife/ui'

export default class extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ThemeProvider>
          <Fragment>
            <Component {...pageProps} />
            <GlobalStyle />
          </Fragment>
        </ThemeProvider>
      </Container>
    )
  }
}