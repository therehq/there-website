import styled from 'styled-components'

const Heading = styled.h2`
  margin: 0;
  padding: 0 0 20px 0;

  font-family: Playfair Display;
  font-weight: bold;
  font-size: 65px;
  letter-spacing: -0.5px;

  color: ${p => p.theme.colors.darkText};
`

export default Heading
