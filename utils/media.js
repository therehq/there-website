import { css } from 'styled-components'

import { WIDE_WIDTH, NORMAL_WIDTH } from '../components/Container'

export const mobile = inner => css`
  @media (max-width: ${WIDE_WIDTH}px) {
    ${inner};
  }
`

export const phone = inner => css`
  @media (max-width: ${NORMAL_WIDTH}px) {
    ${inner};
  }
`
