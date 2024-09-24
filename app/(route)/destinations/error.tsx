'use client'

type ErrorProps = {
  error: string
}
const ErrorDestination = ({ error }: ErrorProps) => {
  return (
    <div className='mx-auto max-w-md overflow-hidden rounded-lg bg-white p-5 shadow-md'>
      {error}
    </div>
  )
}

export default ErrorDestination
