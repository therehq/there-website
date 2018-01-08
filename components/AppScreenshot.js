import styled, { css } from 'styled-components'

import { phone } from '../utils/media'
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

  ${phone(css`
    height: 320px;
    width: 100%;
    background-image: url(/static/app-screenshot-mobile@2x.jpg);
    background-position: top center;
    background-size: cover;
    box-shadow: 0 0 0 15px #f0f0f0; /* change Photo wrapper too */
  `)};
`

const HandleWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  transform: translate(30px, 35px);

  ${phone(css`
    display: none;
  `)};
`
