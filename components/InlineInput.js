import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { phone } from '../utils/media'

class InlineInput extends Component {
  render() {
    const { label, className, width, showLabel = false, ...props } = this.props

    return (
      <Wrapper className={className}>
        <Label>
          <LabelText isVisible={showLabel}>{label}</LabelText>
          <Input {...props} width={width} />
        </Label>
      </Wrapper>
    )
  }
}

export default InlineInput

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: baseline;
`

const Input = styled.input`
  height: 45px;
  max-width: ${p => p.width || 120}px;
  padding: 5px 10px;
  display: inline-block;
  vertical-align: baseline;
  text-align: center;

  font-size: 29px;
  letter-spacing: -0.3px;

  color: ${p => p.theme.colors.darkGreen};
  background: #ebebeb;
  border: none;
  outline: none;

  transition: background 200ms;

  &::placeholder {
    color: #b0b0b0;
  }

  &:focus {
    background: #e0e0e0;
  }

  ${phone(css`
    font-size: 22px;
    height: 45px;
    padding: 4px 8px;
  `)};
`

const Label = styled.span`
  display: inline-block;
  padding: 0;
`

// prettier-ignore
const LabelText = styled.span`
  position: absolute;
  top: -20px;
  left: 50%;

  font-family: 'Work Sans', sans-serif;
  font-wight: normal;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  letter-spacing: .6px;
  color: ${p => p.theme.colors.darkGreen};

  transform: translateX(-50%) translateY(-5px);
  visibility: hidden;
  opacity: 0;

  transition: transform 200ms ease-out, visibility 200ms, opacity 200ms;

  ${p => p.isVisible && css`
    transform: translateX(-50%) translateY(0);
    visibility: visible;
    opacity: 1;
  `}
`
