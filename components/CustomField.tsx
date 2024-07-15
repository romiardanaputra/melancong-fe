/* eslint-disable no-console */
'use client'
import React from 'react'
import { Control } from 'react-hook-form'
import { Input } from '@nextui-org/input'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { FormFieldType } from './form/SignUpForm'
// import react phone number input
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'

interface CustomFieldProps {
  control: Control<any>
  fieldType: FormFieldType
  name: string
  label?: string
  placeholder?: string
  description?: string
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
  className?: string
  classNameLabel?: string
  labelOutside?: string
  type?: string
}

type RenderFieldProps = {
  field: any
  props: CustomFieldProps
  className?: string
}

function RenderField({ field, props, className }: RenderFieldProps) {
  console.log(props)
  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <div className='flex w-full flex-wrap items-center gap-4 md:flex-nowrap'>
            <Input
              {...field}
              type={
                props.type === 'password' && isVisible ? 'text' : props.type
              }
              label={props.label}
              className={className ?? ''}
              variant='bordered'
              endContent={
                props.type === 'password' && (
                  <div>
                    {isVisible ? (
                      <FaEyeSlash
                        className='my-auto h-full cursor-pointer'
                        onClick={toggleVisibility}
                      />
                    ) : (
                      <FaEye
                        className='my-auto h-full cursor-pointer'
                        onClick={toggleVisibility}
                      />
                    )}
                  </div>
                )
              }
            />
          </div>
        </FormControl>
      )
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <div>
            <PhoneInput
              defaultCountry='ID'
              placeholder={props.placeholder}
              international
              withCountryCallingCode
              value={field.value}
              onChange={field.onChange}
              className='w-full p-4'
            />
          </div>
        </FormControl>
      )
    default:
      break
  }
}

export default function CustomField(props: CustomFieldProps): React.ReactNode {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {props.labelOutside ?? <FormLabel>{props.labelOutside}</FormLabel>}
          <RenderField field={field} props={props} />
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
