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

const mailChimpScript = `
  !function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/6ea1cb2726621ef9a2563a17c/8f912a6c5c65deff04cb0d7e3.js");
`

const heapScript = `
  window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
  heap.load("2869438827");
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
            async
            dangerouslySetInnerHTML={{ __html: crispScript }}
          />

          <script
            type="text/javascript"
            async
            dangerouslySetInnerHTML={{ __html: heapScript }}
          />

          <script
            id="mcjs"
            async
            dangerouslySetInnerHTML={{ __html: mailChimpScript }}
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
