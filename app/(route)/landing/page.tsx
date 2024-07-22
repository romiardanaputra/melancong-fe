import { FloatingNav } from '@/components/navbar/FloatingNav'
import { NextPage } from 'next'
import { navigations } from '@/data/index'
import About from '@/app/(route)/about/page'
import HeroBanner from '@/app/(route)/landing/_partials/hero-banner/page'
import RecommendationSection from '@/app/(route)/landing/_partials/recomendation/page'
import OurService from '@/app/(route)/landing/_partials/our-services/page'
import Footer from '@/components/footer/Footer'

interface Props {}

const LandingPage: NextPage<Props> = () => {
  return (
    <>
      {/* navbar start */}
      <header>
        <FloatingNav navItems={navigations} />
      </header>
      {/* navbar end */}

      {/* Hero Banner section start */}
      <section>
        <HeroBanner />
      </section>
      {/* Hero Banner section end */}

      {/* Recommendation section start */}
      <section id='recommendation'>
        <RecommendationSection />
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
