import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

const Footer = () => (
  <Wrapper>
    Made with <span>❤️</span> by <a href="https://twitter.com/morajabi">Mo</a>{' '}
    and other team members @ There™
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
