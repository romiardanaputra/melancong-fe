import {
  SkeletonFive,
  SkeletonFour,
  SkeletonOne,
  SkeletonSix,
  SkeletonThree,
  SkeletonTwo
} from '@/app/(route)/about/_partials/ImageGrid'
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCoinFilled,
  IconHeadset,
  IconHome,
  IconPlaneTilt,
  IconSettings,
  IconShieldCheckFilled,
  IconStars,
  IconUserBolt,
  IconUsersGroup
} from '@tabler/icons-react'

export const heroImageSliderImages = [
  'https://ik.imagekit.io/rom/melancong/landscape/image-2-landscape.webp?updatedAt=1721609667633',
  'https://ik.imagekit.io/rom/melancong/landscape/image-8-landscape.webp?updatedAt=1721609671401',
  'https://ik.imagekit.io/rom/melancong/landscape/image-12-landscape.webp?updatedAt=1721609668098'
]

export const AboutLists = [
  {
    id: '1',
    title: 'Safe Traveling',
    description:
      'Experience peace of mind on every journey. Our top priority is your safety and comfort, ensuring a worry-free travel experience. Rest assured with our comprehensive safety measures.',
    icon: <IconShieldCheckFilled className='size-8 text-neutral-100' />
  },
  {
    id: '2',
    title: 'Avodrable Price',
    description:
      'Travel without breaking the bank. We offer competitive pricing and great deals so you can explore more while spending less. Enjoy quality trips at budget-friendly rates.',
    icon: <IconCoinFilled className='size-8 text-neutral-100' />
  },
  {
    id: '3',
    title: 'Trusted Review',
    description:
      'Make informed decisions with our trusted reviews. Our community of travelers shares honest feedback and experiences to help you choose the best destinations and services. Rely on authentic reviews for your next adventure.',
    icon: <IconPlaneTilt className='size-8 text-neutral-100' />
  }
]

export const landingLinks = [
  { name: 'Home', link: '/', icon: <IconHome /> },
  { name: 'Recommendation', link: '#recommendation', icon: <IconStars /> },
  { name: 'About', link: '#about', icon: <IconUsersGroup /> },
  { name: 'Services', link: '#services', icon: <IconHeadset /> },
  { name: 'dashboard', link: '/dashboard', icon: <IconUserBolt /> }
]

export const words = ['discover', 'explore', 'find', 'Enjoy']

export const services = [
  {
    title: 'Destination Highlights',
    description:
      'Discover the most popular tourist destinations in Bali, featuring top attractions and must-see spots.',
    link: 'https://stripe.com'
  },
  {
    title: 'Travel Guides',
    description:
      'Comprehensive travel guides to help you navigate Bali’s rich culture, beautiful landscapes, and hidden gems.',
    link: 'https://netflix.com'
  },
  {
    title: 'Activity Recommendations',
    description:
      'Get personalized activity recommendations, from adventure sports to cultural experiences, tailored to your interests.',
    link: 'https://google.com'
  },
  {
    title: 'Dining Suggestions',
    description:
      'Explore the culinary delights of Bali with our curated list of the best restaurants, cafes, and local eateries.',
    link: 'https://meta.com'
  },
  {
    title: 'Travel Planning Tools',
    description:
      'Utilize our suite of planning tools, including itineraries, maps, and budget calculators, to make your Bali trip seamless and enjoyable.',
    link: 'https://amazon.com'
  },
  {
    title: 'Accommodation Tips',
    description:
      'Find the best places to stay, from luxury resorts to budget-friendly accommodations, all with detailed reviews and ratings.',
    link: 'https://microsoft.com'
  }
]

export const destinationLocations = [
  'Tabanan',
  'Badung',
  'Gianyar',
  'Denpasar',
  'Karangasem',
  'Buleleng',
  'Klungkung',
  'Bangli',
  'Jembrana'
]

export const destinationTypes = [
  'Historical Landmark',
  'Beach',
  'Temple',
  'Wildlife',
  'Museum',
  'Garden',
  'Lake',
  'Waterfall',
  'Mountain',
  'Hot Spring',
  'Rice Field',
  'Culture',
  'Hill',
  'Countryside'
]

export const sidebarLinks = [
  {
    label: 'My Dashboard',
    href: '/dashboard',
    icon: (
      <IconBrandTabler className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'My Profile',
    href: '/dashboard/profile',
    icon: (
      <IconUserBolt className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'My Favorites',
    href: '/dashboard/saved',
    icon: (
      <IconSettings className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'Logout',
    href: '/landing',
    icon: (
      <IconArrowLeft className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  }
]

export const inputSearchPlaceholders = [
  'Searching for destinations?',
  'Try to search for tanah lot..',
  'Not sure where to go?',
  'Try to search for the beach',
  'Not solved your issue? then try to ask for our chatbot'
]

export const AboutCardGrids = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: 'md:col-span-2',
    thumbnail:
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: 'col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: 'col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: 'md:col-span-2',
    thumbnail:
      'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 5,
    content: <SkeletonFive />,
    className: 'md:col-span-2',
    thumbnail:
      'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 6,
    content: <SkeletonSix />,
    className: 'md:col-span-1',
    thumbnail:
      'https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]
