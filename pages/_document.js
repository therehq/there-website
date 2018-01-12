import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal, css } from 'styled-components'

import { phone } from '../utils/media'
import { BASE_FONT_SIZE, BASE_MOBILE_FONT_SIZE } from '../utils/rem'

injectGlobal`
  html,
  body {
    margin: 0;
    padding: 0;
    font-family: "Work Sans", sans-serif;
    font-size: ${BASE_FONT_SIZE}px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    ${phone(css`
      font-size: ${BASE_MOBILE_FONT_SIZE}px;
    `)};
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  ::selection {
    background: black;
    color: white;
  }
`

const crispScript = `
  window.$crisp=[];window.CRISP_WEBSITE_ID="bb14ccd2-0869-40e7-b0f1-b520e93db7e1";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
`

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="UTF-8" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

          <title>There™ - Work across timezones efficiently</title>

          <meta
            name="google-site-verification"
            content="XKtisJxke0C2Hpeb8rgDk6yPDLRZj3PDR3-UtNZ04Ac"
          />

          {/*

          <link rel="icon" type="image/png" href="/static/favicon.png" />
          <link rel="apple-touch-icon" type="image/png" href="/static/icons/graphql-eu-icon-180x180.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content="#DB3F74" />

          <meta name="keywords" content="GraphQL,conference,Europe,Berlin,2018" />
          <meta name="description" content="GraphQL-Europe - Berlin, June 15th, 2018 - Join Europe’s biggest GraphQL-dedicated conference" />

          <meta property="og:type" content="article"/>
          <meta property="og:url" content="https://graphql-europe.org/"/>
          <meta property="og:description" content="GraphQL-Europe - Berlin, June 15th, 2018 - Join Europe’s biggest GraphQL-dedicated conference"/>
          <meta property="og:image:url" content="https://graphql-europe.org/static/GrapQL-Europe-2018-banner.jpg"/>

          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:site" content="@graphqleu"/>
          <meta name="twitter:creator" content="@graphqleu"/>
          <meta name="twitter:description" content="GraphQL-Europe - Berlin, June 15th, 2018 - Join Europe’s biggest GraphQL-dedicated conference"/>
          <meta name="twitter:image" content="https://graphql-europe.org/static/GrapQL-Europe-2018-banner.jpg"/>

          <link rel="canonical" href="https://graphql-europe.org" />

          */}

          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:700|Work+Sans:400,600"
            rel="stylesheet"
          />

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: crispScript }}
          />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
