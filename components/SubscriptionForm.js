import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { darken } from 'polished'
import axios from 'axios'
import { stringify } from 'qs'

import { SIDE_PADDINGS } from '../components/Container'
import InlineInput from '../components/InlineInput'
import { phone } from '../utils/media'

const responseTypes = {
  DONE: 'done',
  ALREADY_SUBSCRIBED: 'already_subscribed',
  INVALID_EMAIL: 'invalid_email',
  EMPTY: 'empty',
  NETWORK_ERROR: 'network_error',
}

class SubscriptionForm extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    name: '',
    email: '',
    loading: false,
    responseType: null,
  }

  render() {
    const { name, email, loading, responseType } = this.state
    const everythingReady = name && email.includes('@')
    return (
      <Wrapper>
        <FormWrapper onSubmit={this.subscribe}>
          <Text>
            <TextPiece>Yes! I’m </TextPiece>
            <InlineInput
              showLabel={name}
              label="Name"
              placeholder="Sara"
              width={150}
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
            />{' '}
            <TextPiece>and email me at </TextPiece>
            <InlineInput
              showLabel={!!email}
              label="Email"
              type="email"
              placeholder="sara@example.com"
              width={270}
              value={email}
              onChange={e => this.setState({ email: e.target.value })}
            />{' '}
            <SmallArrow> ⟶</SmallArrow>
          </Text>
          <Button
            onClick={this.props.onClickDialogHandler}
            disabled={responseType === responseTypes.DONE}
            grabAttention={everythingReady}
          >
            {this.getButtonText(loading, responseType)}
          </Button>
        </FormWrapper>
        {responseType !== null && (
          <Message>{this.getMessage(responseType)}</Message>
        )}
      </Wrapper>
    )
  }

  getMessage = responseType => {
    switch (responseType) {
      case responseTypes.DONE:
        return `You just subscribed! 🎉`

      case responseTypes.EMPTY:
        return `Oh, it seems you missed a field!`

      case responseTypes.ALREADY_SUBSCRIBED:
        return `You've already subscribed! 😉`

      case responseTypes.INVALID_EMAIL:
        return `Can you double check your email?`

      case responseTypes.NETWORK_ERROR:
        return `Oh, there's a network problem 🤔`

      default:
        return ''
    }
  }

  getButtonText = (loading, responseType) => {
    if (loading) {
      return `loading...`
    } else if (responseType === responseTypes.DONE) {
      return `✓`
    } else {
      return `Subscribe to list!`
    }
  }

  callApi = ({ name, email }) =>
    axios({
      method: 'post',
      url: 'https://phpapi.there.pm/subscribe.php',
      data: stringify({
        name,
        email,
      }),
    })

  subscribe = e => {
    e.preventDefault()

    const { name, email } = this.state

    // Check if any field is unfilled
    if (name.trim() === '' || email.trim() === '') {
      this.setState({ responseType: responseTypes.EMPTY })
      return false
    }

    // Let's start...
    this.setState({ loading: true, responseType: null })

    this.callApi({ name, email }).then(({ statusText, data }) => {
      if (
        statusText !== 'OK' ||
        data === undefined ||
        data.status === undefined
      ) {
        this.setState({
          loading: false,
          responseType: responseTypes.NETWORK_ERROR,
        })
      }

      this.setState({ loading: false, responseType: data.type })
    })

    return false
  }
}

export default SubscriptionForm

const Wrapper = styled.div`
  background: #f4f4f4;
  padding: 30px 35px;

  ${phone(css`
    padding: 20px ${SIDE_PADDINGS}px;
    margin-left: ${-SIDE_PADDINGS}px;
    margin-right: ${-SIDE_PADDINGS}px;
  `)};
`

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${phone(css`
    flex-direction: column;
  `)};
`

const Text = styled.div`
  font-weight: bold;
  font-family: 'Playfair Sans', serif;
  font-size: 35px;
  letter-spacing: -1px;
  text-align: center;
  white-space: pre;

  color: #949494;

  ${phone(css`
    display: flex;
    justify-content: space-around;
  `)};
`

// prettier-ignore
const Button = styled.button`
  padding: 12px 24px;
  font-size: 20px;
  font-weight: 600;

  background: ${p => p.theme.colors.red};
  color: rgba(255, 255, 255, 0.85);
  border: none;
  cursor: pointer;

  transform-origin: right center;
  transition: background 160ms ease-out, transform 160ms ease-out, color 160ms,
    box-shadow 160ms;

  ${p => p.grabAttention && css`
    background: ${p.theme.colors.green};
    transform: scale(1.1);
    color: white;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);

    &:hover {
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
      color: rgba(255, 255, 255, 0.85);
      background: ${darken(0.08, p.theme.colors.green)};
    }

    &:active {
      transform: scale(1.05);
    }
  `};

  ${phone(css`
    margin-top: 18px;
    transform-origin: center center;
  `)};
`

const SmallArrow = styled.small`
  color: #ddd;

  ${phone(css`
    display: none;
  `)};
`

const TextPiece = styled.span`
  ${phone(css`
    display: none;
  `)};
`

const Message = styled.p`
  margin: 25px 0 0 0;
  text-align: right;
  color: #999;

  ${phone(css`
    text-align: center;
  `)};
`
