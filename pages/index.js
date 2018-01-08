import Container from '../components/Container'
import Hero from '../sections/Hero'

export default () => [
  <Hero key="1" />,
  <Container key="2" wide={true} style={{ background: 'grey' }}>
    s
  </Container>,
]
