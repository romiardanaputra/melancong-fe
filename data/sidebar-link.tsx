import {
  IconArrowLeft,
  IconLayoutDashboard,
  IconMessageChatbot,
  IconStar,
  IconUserCircle
} from '@tabler/icons-react'

export const sidebarLinks = [
  {
    label: 'My Dashboard',
    href: '/dashboard',
    icon: (
      <IconLayoutDashboard className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'Chatbot',
    href: '/dashboard/chatbot',
    icon: (
      <IconMessageChatbot className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'My Profile',
    href: '/dashboard/profile',
    icon: (
      <IconUserCircle className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'My Favorites',
    href: '/dashboard/saved',
    icon: (
      <IconStar className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  },
  {
    label: 'Logout',
    href: '#',
    icon: (
      <IconArrowLeft className='h-5 w-5 flex-shrink-0 text-neutral-700 dark:text-neutral-200' />
    )
  }
]
