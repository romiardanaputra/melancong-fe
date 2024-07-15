import React from 'react'
import { Button } from '@nextui-org/react'
interface ButtonProps {
  isLoading?: boolean
  className?: string
  children: React.ReactNode
}
export default function SubmitButton({
  isLoading,
  className,
  children
}: ButtonProps): React.ReactNode {
  return (
    <Button
      type='submit'
      color='primary'
      size='lg'
      radius='full'
      disabled={isLoading}
      className={className ?? 'bg-red-500'}
      isLoading={isLoading}
    >
      {isLoading ? <div>Loading</div> : children}
    </Button>
  )
}
