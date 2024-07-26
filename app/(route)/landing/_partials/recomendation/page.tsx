'use client'
import { NextPage } from 'next'
import CustomCard from '@/components/ui/card/CustomCard'
import useDestinations from '@/app/hooks/useDestinations'
interface Props {}

const RecommendationSection: NextPage<Props> = () => {
  const { destinations } = useDestinations()
  return (
    <>
      <div className='container pt-20'>
        <h1 className='py-12 text-center text-4xl font-medium'>
          What We Reccomends <br /> For You
        </h1>
        <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {destinations
            .filter(item => parseFloat(item.rating) > 4.8)
            .slice(0, 8)
            .map(item => (
              <CustomCard
                key={item.id}
                title={item.name}
                img={item.imageLink}
                rating={parseFloat(item.rating)}
                location={item.regency}
                description={`${item.information.slice(0, 70)} ...`}
                isSaveAvailable={false}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default RecommendationSection
