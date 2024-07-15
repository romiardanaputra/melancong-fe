/* eslint-disable no-console */
'use client'
import React from 'react'
import Image from 'next/image'
// zod import
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// shadcn import
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(6),
    passwordConfirm: z.string(),
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional()
  })
  .refine(
    data => {
      return data.password === data.passwordConfirm
    },
    {
      message: 'Password and Confirm Password must be same',
      path: ['passwordConfirm']
    }
  )
  .refine(
    data => {
      if (data.accountType === 'company') {
        return !!data.companyName
      }
      return true
    },
    {
      message: 'Company name is required',
      path: ['companyName']
    }
  )

const imageKit = {
  url: 'https://ik.imagekit.io/melancong/',
  pathMediaLibrary: 'melancong'
}
const logo = {
  image: `${imageKit.url}/${imageKit.pathMediaLibrary}/melancong-logo-default.webp?updatedAt=1720282026611`,
  title: 'Melancong logo'
}

export default function Page(): React.ReactNode {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      companyName: '',
      password: '',
      passwordConfirm: ''
    }
  })

  const accountType = form.watch('accountType')

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })
  }

  return (
    <div className='container'>
      <section>
        <div className='flex w-full justify-center pt-12'>
          <Image
            src={logo.image}
            alt={logo.title}
            width={130}
            height={100}
            priority
            className='size-auto'
          />
        </div>
        <div className='space-y-2 pb-8 pt-8 text-left'>
          <h1 className='text-3xl font-bold'>Welcome New User</h1>
          <p className='uppercase'>Let&apos;s Create Your Account</p>
        </div>

        <div>
          {/* <LoginForm /> */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex w-full max-w-md flex-col gap-4'
            >
              <FormField
                control={form.control}
                name='emailAddress'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='email address'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name='accountType'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='select an account type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='personal'>Personal</SelectItem>
                          <SelectItem value='company'>Company</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              {accountType === 'company' && (
                <FormField
                  control={form.control}
                  name='companyName'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Company Name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              )}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name='passwordConfirm'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>passwordConfirm</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='passwordConfirm'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <Button className='mt-6 w-full px-6 py-4'>Submit</Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  )
}
