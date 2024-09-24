import {
  IconCoinFilled,
  IconPlaneTilt,
  IconShieldCheckFilled
} from '@tabler/icons-react'

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
