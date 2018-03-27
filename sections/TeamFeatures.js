import styled, { css } from 'styled-components'

import { phone } from '../utils/media'
import Container from '../components/Container'
import FeatureItem from '../components/FeatureItem'
import SectionHeading from '../components/SectionHeading'
import { Circle, Rect, Triangle } from '../components/Svgs'

const TeamFeatures = () => (
  <Wrapper>
    <Container wide>
      <SectionHeading style={{ marginBottom: 50 }}>
        Team Features{' '}
        <sup
          style={{
            opacity: 0.5,
            fontSize: '0.4em',
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: 'normal',
          }}
        >
          Coming soon!
        </sup>
      </SectionHeading>
      <GridWrapper>
        <FeatureItem
          title="Scheduler Board"
          desc="Choose who's attending, and pick the best time based on their local time"
          renderIcon={() => <Rect />}
          iconTop={-6}
          iconLeft={-14}
        />
        <FeatureItem
          title="Teams"
          desc="Create a team, and your team members can instantly have all team members"
          renderIcon={() => <Triangle />}
          iconTop={-10}
          iconLeft={-9}
        />
        <FeatureItem
          title="Focus Hours"
          desc="It's super important to not bug your team member while he/she's in focus mode"
          renderIcon={() => <Circle />}
          iconTop={-12}
          iconLeft={-25}
        />
        <FeatureItem
          title="Admin Panel"
          desc="Manage your remote team, see how many are working now, and what they've done"
          renderIcon={() => <Circle />}
          iconTop={-12}
          iconLeft={-25}
        />
        <FeatureItem
          title="WakaTime"
          desc="WakaTime integration for measuring efficiency better"
          renderIcon={() => <Rect />}
          iconTop={-12}
          iconLeft={-25}
        />
      </GridWrapper>
    </Container>
  </Wrapper>
)

export default TeamFeatures

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
