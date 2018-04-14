import { ThemeProvider } from 'styled-components'

import theme from '../utils/theme'
import Footer from '../sections/Footer'
import ErrorHandler from '../components/ErrorHandler'

// Components
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import SectionWrapper from '../components/SectionWrapper'
import LandingPageArticle from '../components/LandingPageArticle'

export default () => (
  <ThemeProvider theme={theme}>
    <ErrorHandler>
      <div>
        <SectionWrapper>
          <Container>
            <LandingPageArticle>
              <SectionHeading>Privacy Policy</SectionHeading>
              <p>
                Mohammad Rajabifard built the There PM (also referred as There™️
                or There) app as a Freemium app. This SERVICE is provided by
                Mohammad Rajabifard at no cost and is intended for use as is.
              </p>

              <p>
                This page is used to inform website visitors regarding my
                policies with the collection, use, and disclosure of Personal
                Information if anyone decided to use my Service.
              </p>
              <p>
                If you choose to use my Service, then you agree to the
                collection and use of information in relation to this policy.
                The Personal Information that I collect is used for providing
                and improving the Service. I will not use or share your
                information with anyone except as described in this Privacy
                Policy.
              </p>
              <p>
                The terms used in this Privacy Policy have the same meanings as
                in our Terms and Conditions, which is accessible at There PM
                unless otherwise defined in this Privacy Policy.
              </p>

              <h3>Information Collection and Use</h3>
              <p>
                For a better experience, while using our Service, I may require
                you to provide us with certain personally identifiable
                information, including but not limited to photo, name, email
                address, user provided location (we don't collect location in
                background), twitter username and id (if signed in by Twitter).
                The information that I request are retained on our secure severs
                hosted on ZEIT Now.
              </p>
              <p>
                The app does use third party services that may collect
                information used to identify you.
              </p>

              <h3>Log Data</h3>
              <p>
                I want to inform you that whenever you use my Service, in a case
                of an error in the app I collect data and information (through
                third party products) on your phone called Log Data. This Log
                Data may include information such as your device Internet
                Protocol (“IP”) address, device name, operating system version,
                the configuration of the app when utilizing my Service, the time
                and date of your use of the Service, and other statistics.
              </p>

              <h3>Cookies</h3>
              <p>
                Cookies are files with small amount of data that is commonly
                used an anonymous unique identifier. These are sent to your
                browser from the website that you visit and are stored on your
                device internal memory.
              </p>

              <p>
                This Service does use these “cookies” explicitly, only for sign
                in by Twitter method and we do not use them to store or transfer
                any sensitive information or personally identifiable
                information. The app may use third party code and libraries that
                use “cookies” to collection information and to improve their
                services. You have the option to either accept or refuse these
                cookies and know when a cookie is being sent to your device. If
                you choose to refuse our cookies, you may not be able to use
                some portions of this Service.
              </p>

              <h3>Changes to This Privacy Policy</h3>
              <p>
                I may update our Privacy Policy from time to time. Thus, you are
                advised to review this page periodically for any changes. I will
                notify you of any changes by posting the new Privacy Policy on
                this page. These changes are effective immediately after they
                are posted on this page.
              </p>

              <h3>Contact Us</h3>
              <p>
                If you have any questions or suggestions about my Privacy
                Policy, do not hesitate to contact me.
              </p>
            </LandingPageArticle>
          </Container>
        </SectionWrapper>

        <Footer />
      </div>
    </ErrorHandler>
  </ThemeProvider>
)
