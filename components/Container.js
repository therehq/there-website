import styled from 'styled-components'

import { rem } from '../utils/rem'

export const WIDE_WIDTH = 1200
export const NORMAL_WIDTH = 900
export const SIDE_PADDINGS = 25

const Container = styled.div`
  max-width: ${p => (p.wide ? rem(WIDE_WIDTH) : rem(NORMAL_WIDTH))};
  margin: 0 auto;
  padding: 0 ${SIDE_PADDINGS}px;
  box-sizing: content-box;
`

export default Container
