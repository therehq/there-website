import React from 'react'
import styled from 'styled-components'

const NoSpam = () => (
  <NoSpamText>
    #noSpamWePromise I’ll personally email you once <br />
    the app is out! Expect to hear from me at later January 18.
  </NoSpamText>
)

export default NoSpam

const NoSpamText = styled.p`
  max-width: 730px;
  margin-top: 45px;
  line-height: 1.4;
  font-size: 25px;
  color: #bfbfbf;
`
