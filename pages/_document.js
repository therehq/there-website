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

const website = {
  title: 'There™ - Work across timezones efficiently & remotely',
  homepage: 'https://there.team',
  description: `Friends or co-workers' time across multiple timezones, for communicating with remote workers and open sourcers`,
  socialBannerUrl: 'https://there.netlify.com/static/There-pm-banner-1024-512.png',
  color: '#3ACFFC',
}

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
          <meta
            name="google-site-verification"
            content="xW2oWVUs189OsMqWU4okvkuvkgO7jI7svZsEFdeUhtw"
          />

          <title>{website.title}</title>

          <meta
            name="google-site-verification"
            content="XKtisJxke0C2Hpeb8rgDk6yPDLRZj3PDR3-UtNZ04Ac"
          />

          <link rel="icon" type="image/png" href="/static/favicons/favicon.png" />
          <link
            rel="apple-touch-icon"
            type="image/png"
            href="/static/icons/there-icon-pwa-180.png"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="theme-color" content={website.color} />

          <meta
            name="keywords"
            content="Timezone,remote,work,time,app,GMT,PST,rajabi"
          />
          <meta name="description" content={website.description} />

          <meta property="og:type" content="article" />
          <meta property="og:title" content={website.title} />
          <meta property="og:url" content={website.homepage} />
          <meta property="og:description" content={website.description} />
          <meta property="og:image:url" content={website.socialBannerUrl} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={website.title} />
          <meta name="twitter:site" content="@ThereHQ" />
          <meta name="twitter:creator" content="@morajabi" />
          <meta name="twitter:description" content={website.description} />
          <meta name="twitter:image" content={website.socialBannerUrl} />

          <link rel="canonical" href={website.homepage} />

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
