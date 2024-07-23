import { NextPage } from 'next'
import CustomCard from '@/components/ui/card/CustomCard'
import { imageCards } from '@/data/index'
interface Props {}

const RecommendationSection: NextPage<Props> = () => {
  return (
    <>
      <div className='container pt-20'>
        <h1 className='py-12 text-center text-4xl font-medium'>
          What We Reccomends <br /> For You
        </h1>
        <div className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {imageCards.map(item => (
            <CustomCard
              key={item.id}
              title={item.title}
              img={item.img}
              rating={item.rating}
              location={item.location}
              description={item.description}
              isSaveAvailable={false}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default RecommendationSection
