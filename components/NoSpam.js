import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const NoSpam = () => (
  <Wrapper>
    <NoSpamText>
      No spam, ever. I’ll personally email you once <br />
      the app is out! Expect to hear from me at later January 18.
    </NoSpamText>
  </Wrapper>
)

export default NoSpam

const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`

const NoSpamText = styled.p`
  max-width 730px;
  line-height: 32px;
  font-size: 25px;
  color: #bfbfbf;
`
