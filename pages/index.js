import { ThemeProvider } from 'styled-components'

import Container from '../components/Container'
import Hero from '../sections/Hero'
import theme from '../utils/theme'

export default () => (
  <ThemeProvider theme={theme}>
    <div>
      <Hero />
      <Container key="2" wide={true} style={{ background: 'grey' }}>
        s
      </Container>
    </div>
  </ThemeProvider>
)
