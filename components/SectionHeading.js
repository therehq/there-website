import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

const Heading = styled.h2`
  margin: 0;
  padding: 0 0 20px 0;

  font-family: Playfair Display;
  font-weight: bold;
  font-size: 65px;
  letter-spacing: -0.5px;

  color: ${p => p.theme.colors.darkText};

  ${phone(css`
    font-size: 45px;
  `)};
`

export default Heading
