import balineseDance from '@/public/assets/images/balinese-dance.webp'
import CustomButton from '@/components/ui/button/CustomButton'

const LandingPage = () => {
  return (
    <>
      <div
        className='relative size-full bg-neutral-500 bg-cover bg-center bg-no-repeat bg-blend-multiply'
        style={{ backgroundImage: `url(${balineseDance.src})` }}
      >
        <div className='flex min-h-dvh flex-col items-center justify-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
          <h1 className='text-6xl font-black sm:text-8xl'>
            WORLD OF{' '}
            <span className='font-outline-2 block text-transparent'>
              PARADISE,
            </span>
          </h1>
          <h2 className='text-6xl font-black sm:text-8xl'>BALI</h2>
          <CustomButton btnText='Explore More With Us' pathTo='/landing' />
        </div>
      </div>
    </>
  )
}

export default LandingPage
