import {
  SkeletonFive,
  SkeletonFour,
  SkeletonOne,
  SkeletonSix,
  SkeletonThree,
  SkeletonTwo
} from '@/components/ui/skeleton/SkeletonCard'

export const cardGrids = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: 'md:col-span-2',
    thumbnail:
      'https://ik.imagekit.io/rom/melancong/landscape/image-4-landscape.webp?updatedAt=1721609670404'
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: 'col-span-1',
    thumbnail:
      'https://ik.imagekit.io/rom/melancong/landscape/image-5-landscape.webp?updatedAt=1721609670657'
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: 'col-span-1',
    thumbnail:
      'https://ik.imagekit.io/rom/melancong/potrait/image-7-potrait.webp?updatedAt=1721609671849'
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: 'md:col-span-2',
    thumbnail:
      'https://ik.imagekit.io/rom/melancong/landscape/image-10-landscape.webp?updatedAt=1721609668000'
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: 'md:col-span-2',
    thumbnail:
      'https://ik.imagekit.io/rom/melancong/potrait/image-9-potrait.webp?updatedAt=1721609671961'
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: 'md:col-span-1',
    thumbnail:
      'https://ik.imagekit.io/rom/melancong/potrait/image-13-potrait.webp?updatedAt=1721609671477'
  }
]
