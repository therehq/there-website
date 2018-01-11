import { ThemeProvider } from 'styled-components'

import theme from '../utils/theme'
import Hero from '../sections/Hero'
import Quote from '../sections/Quote'
import Features from '../sections/Features'
import IsItReady from '../sections/IsItReady'
import Subscribe from '../sections/Subscribe'
import Footer from '../sections/Footer'

export default () => (
  <ThemeProvider theme={theme}>
    <div>
      <Hero />
      <Quote />
      <Features />
      <IsItReady />
      <Subscribe />
      <Footer />
    </div>
  </ThemeProvider>
)
