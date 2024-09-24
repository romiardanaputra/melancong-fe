'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Card = {
  id: number
  content: React.JSX.Element | React.ReactNode | string
  className: string
  thumbnail: string
}

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null)
  const [lastSelected, setLastSelected] = useState<Card | null>(null)

  const handleClick = (card: Card) => {
    setLastSelected(selected)
    setSelected(card)
  }

  const handleOutsideClick = () => {
    setLastSelected(selected)
    setSelected(null)
  }

  return (
    <div className='relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 md:h-[650px] md:grid-cols-3 lg:h-[950px] xl:h-[920px] 2xl:h-[820px]'>
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, '')}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              'relative overflow-hidden',
              selected?.id === card.id
                ? 'absolute inset-0 z-50 m-auto flex h-1/2 w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-lg md:w-1/2'
                : lastSelected?.id === card.id
                  ? 'z-40 h-full w-full rounded-xl bg-white'
                  : 'h-full w-full rounded-xl bg-white'
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          'absolute left-0 top-0 z-10 h-full w-full bg-white opacity-0',
          selected?.id ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  )
}

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height='500'
      width='500'
      className={cn(
        'absolute inset-0 h-full w-full object-cover object-center transition duration-200 will-change-transform'
      )}
      alt='thumbnail'
    />
  )
}

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className='relative z-[60] flex h-full w-full flex-col justify-end rounded-lg bg-transparent shadow-2xl'>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 0.6
        }}
        className='absolute inset-0 z-10 h-full w-full bg-black opacity-60'
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: 100
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className='relative z-[70] px-8 pb-4'
      >
        {selected?.content}
      </motion.div>
    </div>
  )
}
