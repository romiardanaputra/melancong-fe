import { IconChevronRight } from '@tabler/icons-react'
import { ProfileLinkItems } from '../index.data'

const ProfileLink = () => {
  return (
    <>
      <div className='my-4 space-y-4'>
        <h2 className='mb-3 pt-3 text-lg font-bold'>Support</h2>
        <ul className='list-none space-y-4 rounded-lg bg-white p-0 text-sm'>
          {ProfileLinkItems.map(item => (
            <li
              key={item.text}
              className='flex cursor-pointer items-center border-b border-gray-300 p-3'
            >
              <div className='flex items-center'>
                <span className='mr-3'>{item.icon}</span>
                {item.text}
              </div>
              <IconChevronRight className='ml-auto text-gray-400' />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProfileLink
