import { ThemeProvider } from 'styled-components'

import theme from '../utils/theme'
import Hero from '../sections/Hero'
import Quote from '../sections/Quote'
import Features from '../sections/Features'
import IsItReady from '../sections/IsItReady'
import TeamFeatures from '../sections/TeamFeatures'
import Subscribe from '../sections/Subscribe'
import Footer from '../sections/Footer'
import ErrorHandler from '../components/ErrorHandler'

export default () => (
  <ThemeProvider theme={theme}>
    <ErrorHandler>
      <div>
        <Hero />
        <Quote />
        <Features />
        <IsItReady />
        <TeamFeatures />
        <Subscribe />
        <Footer />
      </div>
    </ErrorHandler>
  </ThemeProvider>
)
