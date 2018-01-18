import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Share as TwitterShare } from 'react-twitter-widgets'

import { mobile } from '../utils/media'
import { Close, SlackLogo } from '../components/Svgs'

class ShareDialog extends Component {
  componentDidMount() {
    if (typeof twttr !== 'undefined') {
      twttr.widgets.load()
    }
  }

  render() {
    return (
      <Wrapper aria-modal="true" aria-describedby="share-dialog-desc">
        <DialogContainer>
          <CloseBtn onClick={this.props.onClose}>
            <Close />
          </CloseBtn>

          <DialogText>
            <Title>Awesome! </Title>
            <SubTitle id="share-dialog-desc">
              If you like it more, you can do these:
            </SubTitle>
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

  display: flex;
  justify-content: center;
  align-items: center;

  ${mobile(css`
    padding: 5px;
  `)};
`

const DialogContainer = styled.div`
  width: 100%;
  max-width: 900px;
  position: relative;

  text-align: center;
  padding: 70px 0 80px 0;

  background: #fff;
  box-shadow: 0px 0px 2px;

  ${mobile(css`
    height: 100%;
  `)};
`

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  transition: background 50ms ease-out;
  cursor: pointer;

  svg {
    display: block;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.08);
  }
`

const DialogText = styled.div`
  width: 100%;
  text-align: center;
`

const Title = styled.h1`
  margin: 0;
  font-family: Playfair Display;
  font-weight: bold;
  font-size: 45px;
  color: #616161;

  ${mobile(css`
    font-size: 40px;
  `)};
`

const SubTitle = styled.p`
  margin: 6px 0 0 0;
  color: #9e9e9e;

  ${mobile(css`
    font-size: 20px;
    padding: 10px;
  `)};
`

const ShareButtonContainer = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: center;

  ${mobile(css`
    flex-direction: column;
  `)};
`

const TwitterContainer = styled.div`
  flex: 1 1 50%;
  text-align: right;

  ${mobile(css`
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
  `)};
`

const Plus = styled.div`
  font-size: 35px;
  color: #cfcfcf;
  padding: 0 30px;

  ${mobile(css`
    padding-top: 20px;
    padding-bottom: 20px;
  `)};
`

const SlackContainer = styled.div`
  flex: 1 1 50%;
  text-align: left;

  ${mobile(css`
    text-align: center;
  `)};
`

const TwitterTitle = styled.div`
  font-family: 'Work Sans', sans-serif;
  font-size: 35px;
  color: #0ba3d4;
`

const SlackTitle = styled.a`
  font-family: 'Work Sans', sans-serif;
  font-size: 35px;
  color: #87644a;
  text-decoration: none;
`

const TwitterBtn = styled.div`
  margin-top: 12px;
`

const SlackButton = styled.a`
  margin-left: -10px;
  margin-top: 1px;
  display: block;

  svg {
    display: inline-block;
  }
`
