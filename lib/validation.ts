import * as z from 'zod'

// create form schema
export const UserFormValidation = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(50, { message: 'Name must be less than 50 characters' }),
    email: z.string().email('invalid email address'),
    password: z.string().min(6),
    confirmPassword: z.string()
    // phone: z
    //   .string()
    //   .refine(phone => /^\+\d{10,15}$/.test(phone), 'Invalid phone number')
  })
  .refine(
    data => {
      return data.password === data.confirmPassword
    },
    {
      path: ['confirmPassword'],
      message: 'Password and Confirm Password must be same'
    }
  )

export const UserLoginValidation = z.object({
  email: z.string().email('invalid email address'),
  password: z.string().min(6)
})
