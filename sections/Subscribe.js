import react, { Component } from 'react'
import styled, { css } from 'styled-components'

import { phone } from '../utils/media'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import SectionWrapper from '../components/SectionWrapper'
import SubscriptionForm from '../components/SubscriptionForm'
import ShareDialog from '../components/ShareDialog'
import NoSpam from '../components/NoSpam'
import { Arrow } from '../components/Svgs'

class Subscribe extends Component {
  constructor(props) {
    super(props)
    this.state = { isDialogOpen: false }
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true })
  }

  openDialogWithDelay = () => {
    if (process.browser && window) {
      setTimeout(this.openDialog, 1100)
    }
  }

  closeDialog = () => {
    this.setState({ isDialogOpen: false })
  }

  render() {
    return (
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
          <SubscriptionForm openDialog={this.openDialogWithDelay} />
        </Container>
        {this.state.isDialogOpen && <ShareDialog onClose={this.closeDialog} />}
        <NoSpam />
      </SectionWrapper>
    )
  }
}

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
