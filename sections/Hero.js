import styled from 'styled-components'

import { WIDE_WIDTH } from '../components/Container'
import AppScreenshot from '../components/AppScreenshot'

const Hero = () => (
  <Wrapper>
    <ContentWrapper>
      <Photo>
        <AppScreenshot />
      </Photo>
      <Texts />
    </ContentWrapper>
  </Wrapper>
)

export default Hero

const Texts = () => (
  <TextsWrapper>
    <div />
  </TextsWrapper>
)

const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr minmax(auto, ${WIDE_WIDTH}px) 1fr;
`

const ContentWrapper = styled.div`
  grid-column: 1 / 3;
  background: #eee;
  display: flex;
`

const Photo = styled.div`
  flex: 0 1 auto;
  overflow: hidden;
`

const TextsWrapper = styled.div`
  flex: 1 0 320px;

  padding-top: 80px;
  padding-left: 80px;
`
