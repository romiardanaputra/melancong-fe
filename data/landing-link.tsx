import {
  IconHeadset,
  IconHome,
  IconStars,
  IconUserBolt,
  IconUsersGroup
} from '@tabler/icons-react'

export const landingLinks = [
  { name: 'Home', link: '/', icon: <IconHome /> },
  { name: 'Recommendation', link: '#recommendation', icon: <IconStars /> },
  { name: 'About', link: '#about', icon: <IconUsersGroup /> },
  { name: 'Services', link: '#services', icon: <IconHeadset /> },
  { name: 'dashboard', link: '/dashboard', icon: <IconUserBolt /> }
]
