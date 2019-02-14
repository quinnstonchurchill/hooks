import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class extends Document {
  static getInitialProps({ renderPage }) {
    // create instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();
    // retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    // extract styles as <style> tags
    const styleTags = sheet.getStyleElement();
    // pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>Quinn's Hooks</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/normalize.css" />
          {this.props.styleTags}
          <script
            crossOrigin
            src="https://unpkg.com/react-perf-devtool@3.0.8-beta/lib/npm/hook.js"
          />{' '}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
