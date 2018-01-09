import { ThemeProvider } from 'styled-components'

import theme from '../utils/theme'
import Hero from '../sections/Hero'
import Quote from '../sections/Quote'
import Features from '../sections/Features'

export default () => (
  <ThemeProvider theme={theme}>
    <div>
      <Hero />
      <Quote />
      <Features />
    </div>
  </ThemeProvider>
)
