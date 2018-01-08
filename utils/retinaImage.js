import { css } from 'styled-components'

export const retinaImage = (url, ext, suffix = '@2x') => css`
  background-image: url(${url + '.' + ext});

  @media only screen and (-webkit-min-device-pixel-ratio: 1.3),
    not all,
    not all,
    only screen and (min-resolution: 125dpi),
    only screen and (min-resolution: 1.3dppx) {
    background-image: url(${url + suffix + '.' + ext});
  }
`
