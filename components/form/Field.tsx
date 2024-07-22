/* eslint-disable no-undef */
import { NextPage } from 'next'

interface Props {
  children?: React.ReactNode
  fieldType: string
  fieldId: string
  fieldName: string
  fieldPlaceholder: string
  fieldRequired: boolean
  labelFor: string
  fieldMessage: string
  labelText: string
}

const FieldComponent: NextPage<Props> = ({
  fieldType,
  fieldId,
  fieldName,
  fieldPlaceholder,
  fieldRequired,
  labelFor,
  fieldMessage,
  labelText
}) => {
  return (
    <>
      <div className='space-y-2'>
        <div className='relative'>
          <input
            type={fieldType}
            id={fieldId}
            className='peer block w-full appearance-none rounded-lg border-1 border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500'
            placeholder={fieldPlaceholder}
            name={fieldName}
            required={fieldRequired}
          />
          <label
            htmlFor={labelFor}
            className='absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
          >
            {labelText}
          </label>
        </div>
        {/* if there's any error the message will be changed */}
        <p className='ml-1 text-sm font-medium'>{fieldMessage}</p>
      </div>
    </>
  )
}

export default FieldComponent
