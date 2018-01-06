import styled from 'styled-components'

const AppScreenshot = () => (
  <Wrapper>
    <img src="../assets/app-screenshot.jpg" alt="There app screenshot" />
  </Wrapper>
)

export default AppScreenshot

const Wrapper = styled.div`
  text-indent: -99999px;

  background-color: #e8e8e8;
  box-shadow: 0px 6px 13px rgba(0, 0, 0, 0.2);

  img {
    width: 0;
    opacity: 0;
  }
`
