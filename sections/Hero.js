import styled, { css } from 'styled-components'
import { darken } from 'polished'

import { mobile, phone } from '../utils/media'
import { WIDE_WIDTH, SIDE_PADDINGS } from '../components/Container'
import AppScreenshot from '../components/AppScreenshot'
import { LogoType } from '../components/Svgs'

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
    <IconImage src="/static/there-icon.svg" alt="There™ app" />
    <LogoTypeWrapper>
      <LogoType />
    </LogoTypeWrapper>
    <Description>Your friends & teammates' time? Ah, There!</Description>
    <DownloadSection>
      <DownloadButton>Download</DownloadButton>
      <DownloadNotes>Available for macOS, other platforms soon!</DownloadNotes>
    </DownloadSection>
  </TextsWrapper>
)

const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr minmax(auto, ${WIDE_WIDTH}px) 1fr;

  padding-top: 70px;

  ${phone(css`
    grid-template-columns: 1fr;
  `)};
`

const ContentWrapper = styled.div`
  grid-column: 1 / 3;
  display: flex;

  ${phone(css`
    grid-column: 1;
    flex-direction: column;
  `)};
`

const Photo = styled.div`
  flex: 0 1 auto;

  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;

  padding-right: 80px;
  padding-bottom: 30px;
  padding-top: 10px;

  ${mobile(css`
    padding-right: 50px;
  `)};

  ${phone(css`
    order: 2;
    padding: 15px 0; /* for grey borders */
    margin-top: 90px;
  `)};
`

const TextsWrapper = styled.div`
  flex: 1 0 320px;
  padding-top: 80px;

  ${mobile(css`
    padding-top: 40px;
    padding-right: 40px;
  `)};

  ${phone(css`
    padding-top: 0;
    padding-right: 40px;
    padding-left: ${SIDE_PADDINGS}px;
  `)};
`

const IconImage = styled.img`
  display: block;
`

const LogoTypeWrapper = styled.div`
  margin-top: 40px;

  ${phone(css`
    margin-top: 30px;
  `)};
`

const Description = styled.p`
  margin: 25px 0 0 0;
  color: ${p => p.theme.colors.greyText};

  ${phone(css`
    margin: 20px 0 0 0;
  `)};
`

const DownloadSection = styled.div`
  margin-top: 70px;

  display: flex;
  align-items: center;

  ${phone(css`
    margin-top: 50px;
  `)};
`

const DownloadButton = styled.button`
  flex: 0 0 auto;
  padding: 10px 17px;

  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;

  background: ${p => p.theme.colors.lightGreen};
  color: ${p => p.theme.colors.green};
  border: none;

  &:hover {
    background: ${p => darken(0.1, p.theme.colors.lightGreen)};
  }
`

const DownloadNotes = styled.p`
  font-size: 14px;
  margin: 0 0 0 10px;
  color: ${p => p.theme.colors.mutedText};
`
