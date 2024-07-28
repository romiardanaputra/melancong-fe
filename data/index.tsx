import { FaHome, FaHeadset, FaUsers } from 'react-icons/fa'
import { FaShieldHalved, FaMoneyCheckDollar, FaPlaneUp } from 'react-icons/fa6'
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt
} from '@tabler/icons-react'

export const images = [
  'https://ik.imagekit.io/rom/melancong/landscape/image-2-landscape.webp?updatedAt=1721609667633',
  'https://ik.imagekit.io/rom/melancong/landscape/image-8-landscape.webp?updatedAt=1721609671401',
  'https://ik.imagekit.io/rom/melancong/landscape/image-12-landscape.webp?updatedAt=1721609668098'
]

export const AboutLists = [
  {
    id: '1',
    title: 'Safe Traveling',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quidem!',
    icon: <FaShieldHalved className='size-8 text-neutral-100' />
  },
  {
    id: '2',
    title: 'Avodrable Price',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quidem!',
    icon: <FaMoneyCheckDollar className='size-8 text-neutral-100' />
  },
  {
    id: '3',
    title: 'Trusted Review',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, quidem!',
    icon: <FaPlaneUp className='size-8 text-neutral-100' />
  }
]

export const navigations = [
  { name: 'Home', link: '/', icon: <FaHome /> },
  { name: 'Recommendation', link: '#recommendation', icon: <FaHeadset /> },
  { name: 'About', link: '#about', icon: <FaUsers /> },
  { name: 'Services', link: '#services', icon: <FaHeadset /> }
]

export const imageCards = [
  {
    id: '1',
    title: 'Tanah Lot',
    img: 'https://ik.imagekit.io/rom/melancong/potrait/image-13-potrait.webp?updatedAt=1721609671477',
    rating: '4,9',
    description:
      'Tanah lot is a place where Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, non!',
    location: 'Bali, Tabanan'
  },
  {
    id: '2',
    title: 'Lempuyang',
    img: 'https://ik.imagekit.io/rom/melancong/landscape/image-12-landscape.webp?updatedAt=1721609668098',
    rating: '4,9',
    description:
      'Lempuyang is a place where Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, non!',
    location: 'Bali, Tabanan'
  },
  {
    id: '3',
    title: 'Goa Lawah',
    img: 'https://ik.imagekit.io/rom/melancong/landscape/image-10-landscape.webp?updatedAt=1721609668000',
    rating: '4,1',
    description:
      'Goa Lawah is a place where Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, non!',
    location: 'Bali, Tabanan'
  },
  {
    id: '4',
    title: 'Pandawa Beach',
    img: 'https://ik.imagekit.io/rom/melancong/landscape/image-3-landscape.webp?updatedAt=1721609667419',
    rating: '4,9',
    description:
      'Pandawa Beach is a place where Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, non!',
    location: 'Bali, Tabanan'
  },
  {
    id: '5',
    title: 'Uluwatu Temple',
    img: 'https://ik.imagekit.io/rom/melancong/landscape/image-6-landscape.webp?updatedAt=1721609670870',
    rating: '4,2',
    description:
      'Pandawa Beach is a place where Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, non!',
    location: 'Bali, Tabanan'
  },
  {
    id: '6',
    title: 'Uluwatu Temple',
    img: 'https://ik.imagekit.io/rom/melancong/landscape/image-6-landscape.webp?updatedAt=1721609670870',
    rating: '4,2',
    description:
      'Pandawa Beach is a place where Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, non!',
    location: 'Bali, Tabanan'
  },
  {
    id: '7',
    title: 'Uluwatu Temple',
    img: 'https://ik.imagekit.io/rom/melancong/landscape/image-6-landscape.webp?updatedAt=1721609670870',
    rating: '4,2',
    description:
      'Pandawa Beach is a place where Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, non!',
    location: 'Bali, Tabanan'
  },
  {
    id: '8',
    title: 'Uluwatu Temple',
    img: 'https://ik.imagekit.io/rom/melancong/landscape/image-6-landscape.webp?updatedAt=1721609670870',
    rating: '4,2',
    description:
      'Pandawa Beach is a place where Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet, non!',
    location: 'Bali, Tabanan'
  }
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

export const links = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <IconBrandTabler className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'Profile',
    href: '/dashboard/profile',
    icon: (
      <IconUserBolt className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: (
      <IconSettings className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'Filter',
    href: '#',
    icon: (
      <IconArrowLeft className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'Logout',
    href: '/auth/logout',
    icon: (
      <IconArrowLeft className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  }
]

export const placeholders = [
  'What is the first rule of Fight Club?',
  'Who is Tyler Durden?',
  'Where is Andrew Laeddis Hiding?',
  'Write a Javascript method to reverse a string',
  'How to assemble your own PC?'
]
