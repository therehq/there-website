import styled, { css } from 'styled-components'

import { phone } from '../utils/media'
import Container from '../components/Container'

const Quote = () => (
  <Wrapper>
    <Container>
      <Emoji>💝</Emoji>
      <Bq>
        <Text>
          As a remote engineer and open sourcer, It was super hard to keep track
          of my friends timezones. I want to share my practical solution w/ you
          too!
        </Text>
        <Who>Mo Rajabi - Maker of There™</Who>
      </Bq>
    </Container>
  </Wrapper>
)

export default Quote

const Wrapper = styled.section`
  margin-top: 120px;
  text-align: center;

  ${phone(css`
    margin-top: 80px;
  `)};
`

const Bq = styled.blockquote`
  margin: 0;
`

const Emoji = styled.p`
  font-size: 35px;
  margin: 0;

  ${phone(css`
    font-size: 30px;
  `)};
`

const Text = styled.p`
  font-size: 35px;
  letter-spacing: -1px;
  margin: 30px 0 0 0;
  color: ${p => p.theme.colors.darkText};

  ${phone(css`
    font-size: 22px;
  `)};
`

const Who = styled.p`
  margin: 16px 0 0 0;
  color: ${p => p.theme.colors.mutedText};

  ${phone(css`
    font-size: 18px;
  `)};
`
