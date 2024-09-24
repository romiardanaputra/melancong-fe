import { NextPage } from 'next'
import Link from 'next/link'

interface Props {
  btnText: string
  pathTo: string
}

const CustomButton: NextPage<Props> = ({ pathTo, btnText }) => {
  return (
    <>
      <Link href={pathTo}>
        <button className='relative mt-10 p-[3px]' type='button'>
          <div className='absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500' />
          <div className='group relative rounded-full bg-slate-950 px-8 py-4 text-white transition duration-200 hover:bg-transparent'>
            {btnText}
          </div>
        </button>
      </Link>
    </>
  )
}

export default CustomButton
