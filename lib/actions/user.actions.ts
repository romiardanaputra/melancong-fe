/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
import { users } from '../appwrite.config'
import { Query, ID } from 'node-appwrite'

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log({ user })
    console.log('user action ts ok')
    const newUser = await users.create(
      ID.unique(),
      user.fullName,
      user.email,
      user.password
    )
    console.log('ok')

    console.log({ newUser })
  } catch (error: any) {
    if (error && error?.code === 409) {
      const document = await users.list([Query.equal('email', user.email)])
      return document?.users[0]
    }
  }
}

// export const authenticate = async (
//   _currentState: unknown,
//   formData: formData
// ) => {
//   try {
//     await signIn('credentials', formData)
//   } catch (error) {
//     if (error) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.'
//         default:
//           return 'Something went wrong.'
//       }
//     }
//     throw error
//   }
// }
