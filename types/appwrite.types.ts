import { Models } from 'node-appwrite'

export interface User extends Models.Document {
  userId: string
  fullName: string
  email: string
  password: string
}
