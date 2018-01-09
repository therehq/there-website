import styled, { css } from 'styled-components'

import { phone } from '../utils/media'

const FeatureItem = props => {
  const {
    iconTop = 0,
    iconLeft = 0,
    renderIcon = () => <div />,
    title,
    desc,
  } = props
  return (
    <Wrapper>
      <Title>
        <Icon top={iconTop} left={iconLeft}>
          {renderIcon()}
        </Icon>
        <TitleText>{title}</TitleText>
      </Title>
      <Description>{desc}</Description>
    </Wrapper>
  )
}

export default FeatureItem

const Wrapper = styled.div`
  position: relative;
`

const Icon = styled.div`
  position: absolute;
  top: ${p => String(p.top) || '0'}px;
  left: ${p => String(p.left) || '0'}px;

  ${phone(css`
    transform: scale(0.93);
    transform-origin: top center;
  `)};
`

const Title = styled.h3`
  position: relative;
  margin: 0;

  font-family: 'Playfair Display', sans-serif;
  font-weight: 700;
  font-size: 35px;
  letter-spacing: -1px;

  ${phone(css`
    font-size: 25px;
  `)};
`

const TitleText = styled.span`
  position: relative;
  z-index: 3;
`

const Description = styled.p`
  margin: 9px 0 0 0;
  line-height: 1.3;
  letter-spacing: -0.8px;
  color: ${p => p.theme.colors.greyText};
`
