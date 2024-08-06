import { NextPage } from 'next'
import {
  IconBrandHipchat,
  IconChevronRight,
  IconLockSquare,
  IconSettings
} from '@tabler/icons-react'

const Support: NextPage = () => {
  const supportItems = [
    { text: 'Terms and Conditions', icon: <IconSettings />, link: '#' },
    { text: 'Privacy Policy', icon: <IconLockSquare />, link: '#' },
    {
      text: 'Need Help? Let`s chat',
      icon: <IconBrandHipchat />,
      link: 'https://wa.me/62881037217902?text=Hello Admin, i`m looking for some help regarding your services. Could you please assist me?'
    }
  ]

  return (
    <div className='mb-5 space-y-4'>
      <h2 className='mb-3 pt-3 text-lg font-bold'>Support</h2>
      <ul className='list-none space-y-4 rounded-lg bg-white p-0 text-sm'>
        {supportItems.map(item => (
          <li
            key={item.text}
            className='flex cursor-pointer items-center border-b border-gray-300 p-3'
          >
            <a
              href={item.link}
              target='_blank'
              rel='noopener noreferrer'
              className='flex w-full items-center'
            >
              <span className='mr-3'>{item.icon}</span>
              {item.text}
              <IconChevronRight className='ml-auto text-gray-400' />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Support
