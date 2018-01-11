import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

const SectionWrapper = styled.aside`
  margin-top: 130px;

  ${phone(css`
    margin-top: 80px;
  `)};
`

export default SectionWrapper
