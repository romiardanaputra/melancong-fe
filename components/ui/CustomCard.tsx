import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface ImageCardProps {
  title: string
  img: string
  rating: string
  description: string
  location: string
}

const CustomCard: NextPage<ImageCardProps> = ({
  title,
  img,
  rating,
  description,
  location
}) => {
  return (
    <>
      <div className='max-w-sm transform rounded-[22px] bg-white shadow-xl transition duration-400 hover:-translate-y-2 dark:bg-zinc-900'>
        <div className='h-[200px] overflow-hidden rounded-lg p-0'>
          <Image
            src={img}
            alt={title}
            height='400'
            width='400'
            className='object-cover object-center'
            loading='lazy'
          />
        </div>
        <div className='p-5'>
          <p className='mb-2 mt-4 text-base font-bold text-neutral-900 dark:text-neutral-200 sm:text-xl'>
            {title}
          </p>
          <p className='mb-2 text-sm font-medium'>{location}</p>
          <p className='text-sm text-neutral-600 dark:text-neutral-400'>
            {description}
          </p>
          <div className='mt-4 flex items-center justify-between gap-4'>
            <Link href='/login' className='text-sm font-medium'>
              Read More...
            </Link>
            <button className='flex items-center space-x-1 rounded-full bg-black py-1 pl-4 pr-1 text-xs font-bold text-white dark:bg-zinc-800'>
              <p>Rating </p>
              <p className='rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white'>
                {rating}
              </p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomCard
