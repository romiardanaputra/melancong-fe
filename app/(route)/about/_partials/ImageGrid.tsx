import { LayoutGrid } from '@/components/ui/layout-grid'
import { AboutCardGrids } from '@/data'

export function ImageGrid() {
  return (
    <div className='w-full'>
      <LayoutGrid cards={AboutCardGrids} />
    </div>
  )
}

export const SkeletonOne = () => {
  return (
    <div>
      <p className='text-xl font-bold text-white md:text-4xl'>
        House in the woods
      </p>
      <p className='text-base font-normal text-white'></p>
      <p className='my-4 max-w-lg text-base font-normal text-neutral-200'>
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
  )
}

export const SkeletonTwo = () => {
  return (
    <div>
      <p className='text-xl font-bold text-white md:text-4xl'>
        House above the clouds
      </p>
      <p className='text-base font-normal text-white'></p>
      <p className='my-4 max-w-lg text-base font-normal text-neutral-200'>
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  )
}
export const SkeletonThree = () => {
  return (
    <div>
      <p className='text-xl font-bold text-white md:text-4xl'>
        Greens all over
      </p>
      <p className='text-base font-normal text-white'></p>
      <p className='my-4 max-w-lg text-base font-normal text-neutral-200'>
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  )
}
export const SkeletonFour = () => {
  return (
    <div>
      <p className='text-xl font-bold text-white md:text-4xl'>
        Rivers are serene
      </p>
      <p className='text-base font-normal text-white'></p>
      <p className='my-4 max-w-lg text-base font-normal text-neutral-200'>
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  )
}
export const SkeletonFive = () => {
  return (
    <div>
      <p className='text-xl font-bold text-white md:text-4xl'>
        Rivers are serene
      </p>
      <p className='text-base font-normal text-white'></p>
      <p className='my-4 max-w-lg text-base font-normal text-neutral-200'>
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  )
}

export const SkeletonSix = () => {
  return (
    <div>
      <p className='text-xl font-bold text-white md:text-4xl'>
        Rivers are serene
      </p>
      <p className='text-base font-normal text-white'></p>
      <p className='my-4 max-w-lg text-base font-normal text-neutral-200'>
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  )
}
