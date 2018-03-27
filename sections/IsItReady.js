import styled, { css } from 'styled-components'

import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import SectionWrapper from '../components/SectionWrapper'
import { phone } from '../utils/media'

const IsItReady = () => (
  <SectionWrapper>
    <Anchor id="isitready" />
    <Container>
      <SectionHeading>Is it ready?</SectionHeading>
      <Text>
        <p>
          👍 Yes! But it's just the start, there's a lot more coming! Download
          the latest version now and let me know what you think!
        </p>
        <p>
          📱 I’m going to start working on other desktop platforms and a mobile
          app.
        </p>
        <p>💌 If you like There, you can subscribe to the mailing list now!</p>
      </Text>
    </Container>
  </SectionWrapper>
)

export default IsItReady

const Text = styled.div`
  p {
    margin: 15px 0 0 0;
    color: ${p => p.theme.colors.greyText};

    &:first-child {
      margin-top: 0;
    }
  }
`

const Anchor = styled.div`
  position: relative;
  top: -100px;

  ${phone(css`
    top: -60px;
  `)};
`
