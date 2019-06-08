import styled, { css } from 'styled-components'

import { phone } from '../utils/media'
import Container from '../components/Container'
import FeatureItem from '../components/FeatureItem'
import SectionHeading from '../components/SectionHeading'
import { Circle, Rect, Triangle } from '../components/Svgs'
import { darken } from 'polished'

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
          title="Work Times"
          desc="It's super important to not bug your team member while they're off"
          renderIcon={() => <Circle />}
          iconTop={-12}
          iconLeft={-25}
        />
        <FeatureItem
          title="Team Feed"
          desc="See what all your co workers are up to right now."
          renderIcon={() => <Circle />}
          iconTop={-12}
          iconLeft={-25}
        />
        <FeatureItem
          title="Travels"
          desc="Anyone travelling while working knows how hard coordination can get."
          renderIcon={() => <Triangle />}
          iconTop={-12}
          iconLeft={-25}
        />
        <FeatureItem
          title="Suggested Times"
          desc="When is the best time to kick-off a conversation to not distract, but enjoy!"
          renderIcon={() => <Rect />}
          iconTop={-12}
          iconLeft={-12}
        />

        <SubscribeToTeams />
      </GridWrapper>
    </Container>
  </Wrapper>
)

export default TeamFeatures

const SubscribeToTeams = () => (
  <SlackWrapper>
    <SlackIconWrapper>
      <img
        src="https://there.team/_next/static/images/Home-f656fe2a4f981457b858455407a55606.jpg"
        width="100%"
      />
    </SlackIconWrapper>
    <SlackFeatureItemWrapper>
      <FeatureItem
        title="Request Access Now!"
        desc="Let's help all the teams with There, together with our tiny team!"
      />
      <br />
      <ButtonLink href="https://there.team">Check it out</ButtonLink>
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
  max-width: 400px;
  border-radius: 5px;
  box-shadow: 0 8px 24px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 24px;

  align-self: flex-start;

  img {
    display: block;
  }
`

const SlackFeatureItemWrapper = styled.div`
  grid-column: 2;
  grid-row: 1;
  padding-bottom: 12px;
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

const ButtonLink = styled.a`
  padding: 12px 24px;
  font-size: 20px;
  font-weight: 600;

  background: ${p => p.theme.colors.brandBlue};
  color: rgba(255, 255, 255, 0.85);
  border: none;
  cursor: pointer;

  text-decoration: none;
  transform-origin: right center;
  transition: background 160ms ease-out, transform 160ms ease-out, color 160ms,
    box-shadow 160ms;

  background: ${p => p.theme.colors.brandBlue};
  transform: scale(1.1);
  color: white;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    color: rgba(255, 255, 255, 0.85);
    background: ${p => darken(0.08, p.theme.colors.brandBlue)};
  }

  &:active {
    transform: scale(1.05);
  }

  ${phone(css`
    margin-top: 18px;
    transform-origin: center center;
  `)};
`
