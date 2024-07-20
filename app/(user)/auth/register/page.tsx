'use client'
import SignUpForm from '@/components/form/SignUpForm'
import Logo from '@/components/Logo'
import React from 'react'
export default function Page(): React.ReactNode {
  return (
    <section className='container'>
      <div className='flex w-full justify-center pt-[4.7rem]'>
        <Logo width={175} height={115} className='w-24' />
      </div>
      <div className='space-y-1 py-8 text-center'>
        <p className='text-2xl font-black uppercase text-slate-800'>
          welcome new user
        </p>
        <p className='text-sm font-medium text-slate-600'>
          Let&apos;s create your account
        </p>
      </div>
      <SignUpForm />
    </section>
  )
}
