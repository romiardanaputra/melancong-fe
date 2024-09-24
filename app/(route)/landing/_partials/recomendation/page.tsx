'use client'
import { NextPage } from 'next'
import CustomCard from '@/components/ui/card/CustomCard'
import useRecommend from '@/hooks/useRecommend'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {}

const Recommendation: NextPage<Props> = () => {
  const router = useRouter()

  const handleCardClick = (id: string) => {
    router.push(`/destinations/${id}`)
  }

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    id: string
  ) => {
    if (event.key === 'Enter') {
      handleCardClick(id)
    }
  }

  const { destinations } = useRecommend()
  return (
    <>
      <div className='container pt-20'>
        <h1 className='py-12 text-center text-4xl font-medium'>
          What We Reccomends <br /> For You
        </h1>
        <div className='grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {destinations
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            .filter(item => parseFloat(item.rating) > 4.5)
            .slice(0, 12)
            .map(item => (
              <CustomCard
                key={item.id}
                title={item.name}
                img={item.imageLink}
                rating={parseFloat(item.rating)}
                location={item.regency}
                description={`${item.information.slice(0, 85)}...`}
                isSaveAvailable={false}
                clickToDetail={() => handleCardClick(item.id)}
                onKeyPress={e => handleKeyPress(e, item.id)}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default Recommendation
