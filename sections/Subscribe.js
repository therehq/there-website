import styled, { css } from 'styled-components'

import { phone } from '../utils/media'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import SectionWrapper from '../components/SectionWrapper'
import SubscriptionForm from '../components/SubscriptionForm'
import { Arrow } from '../components/Svgs'

const Subscribe = () => (
  <SectionWrapper>
    <Container>
      <SectionHeading style={{ position: 'relative' }}>
        Get it early 🙌{' '}
        <ArrowWrapper>
          <Arrow />
        </ArrowWrapper>
      </SectionHeading>
    </Container>
    <Container wide={true}>
      <SubscriptionForm />
    </Container>
  </SectionWrapper>
)

export default Subscribe

const ArrowWrapper = styled.div`
  position: absolute;
  left: -95px;
  top: 27px;

  transform: rotate(-2deg);

  ${phone(css`
    transform: scale(0.6) rotateY(180deg) rotateZ(-2deg);
    left: auto;
    right: 0;
    top: 7px;
  `)};
`
