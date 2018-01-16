import react, { Component } from 'react'
import styled, { css } from 'styled-components'

import { phone } from '../utils/media'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import SectionWrapper from '../components/SectionWrapper'
import SubscriptionForm from '../components/SubscriptionForm'
import ShareDialog from '../components/ShareDialog'
import { Arrow } from '../components/Svgs'

class Subscribe extends Component {
  constructor(props) {
    super(props)
    this.state = { showDialog: false }
  }
  dialogHandler() {
    const stateDialog = this.state.showDialog
    const newStateDialog = stateDialog ? false : true

    console.log(newStateDialog)
    this.setState({ showDialog: newStateDialog })
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
          <SubscriptionForm onClickDialogHandler={() => this.dialogHandler()} />
        </Container>
        {this.state.showDialog && (
          <ShareDialog onClickDialogHandler={() => this.dialogHandler()} />
        )}
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
