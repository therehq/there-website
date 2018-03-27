import styled, { css } from 'styled-components'

import { phone } from '../utils/media'
import Container from '../components/Container'
import FeatureItem from '../components/FeatureItem'
import { Circle, Rect, Triangle, Slack as SlackIcon } from '../components/Svgs'

const Features = () => (
  <Wrapper>
    <Container wide>
      <GridWrapper>
        <FeatureItem
          title="People first design"
          desc="City, country, timezone comes after the people"
          renderIcon={() => <Circle />}
          iconTop={-6}
          iconLeft={-14}
        />
        <FeatureItem
          title="Synced Location!"
          desc="Even if one moves, you see their updated time"
          renderIcon={() => <Rect />}
          iconTop={-10}
          iconLeft={-9}
        />
        <FeatureItem
          title="Built for efficiency"
          desc="Every piece of UI is placed w/ user in mind"
          renderIcon={() => <Triangle />}
          iconTop={-12}
          iconLeft={-25}
        />
        <SlackBox />
      </GridWrapper>
    </Container>
  </Wrapper>
)

export default Features

const SlackBox = () => (
  <SlackWrapper>
    <SlackIconWrapper>
      <SlackIcon />
    </SlackIconWrapper>
    <SlackFeatureItemWrapper>
      <FeatureItem
        comingSoon={true}
        title="Slack team support"
        desc="Import your whole team from Slack with 1-click"
      />
    </SlackFeatureItemWrapper>
  </SlackWrapper>
)

const Wrapper = styled.section`
  margin-top: 170px;

  ${phone(css`
    margin-top: 110px;
  `)};
`

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  grid-column-gap: 100px;
  grid-row-gap: 40px;

  ${phone(css`
    grid-template-columns: 1fr;
  `)};
`

const SlackIconWrapper = styled.div`
  ${phone(css`
    grid-column: 3;
    padding-left: 20px;
  `)};
`

const SlackFeatureItemWrapper = styled.div`
  grid-column: 2;
  grid-row: 1;
`

const SlackWrapper = styled.div`
  width: 100%;
  grid-column: 1 / 4;
  padding: 30px 37px;
  background: #c9fcff; /* #f0f0f0; */
  text-align: center;

  ${phone(css`
    grid-column: 1;
    padding: 22px 25px;
    text-align: right;

    display: inline-grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
  `)};
`
