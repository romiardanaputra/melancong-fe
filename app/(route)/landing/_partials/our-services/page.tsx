import { NextPage } from 'next'
import { HoverEffect } from '@/components/ui/card/CardHoverEffect'
import { services } from '@/data/index'

interface Props {}

const OurService: NextPage<Props> = () => {
  return (
    <>
      <div className='container pt-20'>
        <h1 className='pb-12 text-center text-4xl font-medium'>Our Services</h1>
        <div className='mx-auto'>
          <HoverEffect items={services} />
        </div>
      </div>
    </>
  )
}

export default OurService
