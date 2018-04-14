import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

const Footer = () => (
  <Wrapper>
    <p>
      Made with <span>❤️</span> by <a href="https://twitter.com/morajabi">Mo</a>{' '}
      and other team members @ There™
    </p>
    <p>
      <LinkItem href="/privacy">Privacy Policy</LinkItem>{' '}
      <LinkItem href="/terms">Terms</LinkItem>
    </p>
  </Wrapper>
)

export default Footer

const Wrapper = styled.footer`
  margin-top: 120px;
  padding: 40px 40px;
  text-align: center;
  font-size: 15px;
  opacity: 0.7;

  transition: opacity 100ms;

  &:hover {
    opacity: 1;
  }

  ${phone(css`
    margin-top: 80px;
  `)};
`

const LinkItem = styled.a`
  display: inline-block;
  margin-right: 15px;
  color: #555;
  font-size: 14px;

  &:last-child {
    margin-right: 0;
  }
`
