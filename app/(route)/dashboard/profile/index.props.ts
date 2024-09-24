import React from 'react'

export type UserProfileTypes = {
  name: string
  email: string
  gender: string
  imageLink: string
  phone: string
}

export type ErrorResponseTypes = {
  response: {
    status: number
  }
}

export type ErrorProfileTypes = {
  message: string
}

export type FieldProps = {
  idField: string
  typeField: string
  nameField: string
  defaultValueField?: string
  labelName: string
  readOnly?: boolean
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  ref?: React.RefObject<HTMLInputElement | HTMLSelectElement>
  onClick?: () => void
  isEditAble?: boolean
  variant?: string
  accept?: string
  imagePreview?: string | undefined | null
  imageLink?: string
  handleImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
