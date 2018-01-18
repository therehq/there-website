import React, { Component } from 'react'
import styled from 'styled-components'
import { Share as TwitterShare } from 'react-twitter-widgets'

import { Close, SlackLogo } from '../components/Svgs'

class ShareDialog extends Component {
  componentDidMount() {
    if (typeof twttr !== 'undefined') {
      twttr.widgets.load()
    }
  }

  render() {
    return (
      <Wrapper>
        <DialogContainer>
          <CloseBtn onClick={this.props.onClose}>
            <Close />
          </CloseBtn>

          <DialogText>
            <Title>Awesome! </Title>
            <SubTitle>If you like it more, you can do these:</SubTitle>
            <ShareButtonContainer>
              <TwitterContainer>
                <TwitterTitle>Tweet this</TwitterTitle>
                <TwitterBtn>
                  <TwitterShare
                    url="https://there.pm"
                    options={{
                      size: 'large',
                      via: 'WhenIsThere',
                      text:
                        'Remote workers, travellers, open sourcers 👇\n\n ⏰ There™ - For people with different time zones!',
                    }}
                  />
                </TwitterBtn>
              </TwitterContainer>
              <Plus>+</Plus>
              <SlackContainer>
                <SlackTitle href="https://join.slack.com/t/therepm/shared_invite/enQtMjk4MzUwNjU3NDkxLWFjMWRlY2FkZDVlMDIwYTQ2MWJmODE0NDBhNTAwYmI3ZTdkMTAwMWJlZGIxYjE0MTM4OTdiNTMyNzUxNmVmMjE">
                  Join our Slack
                </SlackTitle>
                <SlackButton href="https://join.slack.com/t/therepm/shared_invite/enQtMjk4MzUwNjU3NDkxLWFjMWRlY2FkZDVlMDIwYTQ2MWJmODE0NDBhNTAwYmI3ZTdkMTAwMWJlZGIxYjE0MTM4OTdiNTMyNzUxNmVmMjE">
                  <SlackLogo />
                </SlackButton>
              </SlackContainer>
            </ShareButtonContainer>
          </DialogText>
        </DialogContainer>
      </Wrapper>
    )
  }
}

export default ShareDialog

const Wrapper = styled.div`
  width: auto;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.39);
  z-index: 100;
`

const DialogContainer = styled.div`
  width: 900px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -450px;
  margin-top: -200px;
  display: flex;
  justify-content: center;
  background: #fff;
  box-shadow: 0px 0px 2px;
`

const CloseBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`

const DialogText = styled.div`
  width: 520px;
  height: 250px;
  text-align: center;
  margin-top: 62px;
`

const Title = styled.h1`
  margin: 0;
  font-family: Playfair Display;
  font-weight: bold;
  font-size: 45px;
  letter-spacing: -0.03em;
  color: #616161;
`

const SubTitle = styled.p`
  margin: 6px 0 0 0;
  font-family: 'Work Sans', sans-serif;
  font-size: 25px;
  letter-spacing: -0.03em;
  color: #9e9e9e;
`

const ShareButtonContainer = styled.div`
  width: 100%;
  height: 100px;
  margin: 61px 0 0 0;
  display: flex;
  justify-content: center;
`

const TwitterContainer = styled.div`
  width: 45%;
  text-align: right;
`

const Plus = styled.div`
  content: '+';
  width: 10%;
  font-family: Work Sans;
  font-size: 35px;
  letter-spacing: -0.03em;
  color: #cfcfcf;
`

const SlackContainer = styled.div`
  width: 45%;
  text-align: left;
`

const TwitterTitle = styled.div`
  font-family: 'Work Sans', sans-serif;
  font-size: 35px;
  letter-spacing: -0.03em;
  color: #0ba3d4;
`

const SlackTitle = styled.a`
  font-family: 'Work Sans', sans-serif;
  font-size: 35px;
  letter-spacing: -0.03em;
  color: #87644a;
  text-decoration: none;
`

const TwitterBtn = styled.div`
  float: right;
  margin-top: 12px;
`

const SlackButton = styled.a`
  width: 200px;
  margin-left: -10px;
`
