import styled from 'styled-components'

import { retinaImage } from '../utils/retinaImage'
import { CornerHandle } from './Svgs'

const AppScreenshot = () => (
  <Wrapper>
    <HandleWrapper>
      <CornerHandle />
    </HandleWrapper>
  </Wrapper>
)

export default AppScreenshot

const Wrapper = styled.div`
  width: 1022px;
  height: 595px;

  position: relative;

  box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.2);
  background-color: #e8e8e8;
  background-size: cover;
  background-position: top right;

  ${retinaImage('/static/app-screenshot', 'jpg')};

  img {
    opacity: 0;
    display: block;
  }
`

const HandleWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  transform: translate(30px, 35px);
`
