import { FloatingNav } from '@/components/ui/navigation/FloatingNav'
import { Metadata, NextPage } from 'next'
import { landingLinks } from '@/data/landing-link'
import About from '@/app/(route)/landing/_partials/about/page'
import HeroBanner from '@/app/(route)/landing/_partials/hero-banner/page'
import Recommendation from '@/app/(route)/landing/_partials/recomendation/page'
import OurService from '@/app/(route)/landing/_partials/our-services/page'
import Footer from '@/components/ui/footer/Footer'

interface Props {}

export const metadata: Metadata = {
  title: 'Landing'
}

const LandingPage: NextPage<Props> = () => {
  return (
    <>
      {/* navbar start */}
      <header>
        <FloatingNav navItems={landingLinks} />
      </header>
      {/* navbar end */}

      {/* Hero Banner section start */}
      <section>
        <HeroBanner />
      </section>
      {/* Hero Banner section end */}

      {/* Recommendation section start */}
      <section id='recommendation'>
        <Recommendation />
      </section>
      {/* Recommendation section end */}

      {/* about section start */}
      <section id='about'>
        <About />
      </section>
      {/* about section end */}

      {/* service section start */}
      <section id='services'>
        <OurService />
      </section>
      {/* service section end */}

      {/* footer start */}
      <section>
        <Footer />
      </section>
      {/* footer end */}
    </>
  )
}

export default LandingPage
