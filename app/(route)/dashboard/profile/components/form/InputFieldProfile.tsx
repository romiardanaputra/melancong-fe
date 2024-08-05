import { NextPage } from 'next'
import { FieldProps } from '../../index.props'
import { IconPencil } from '@tabler/icons-react'
import React, { RefObject } from 'react'

const InputFieldProfile: NextPage<FieldProps> = ({
  idField,
  typeField,
  nameField,
  defaultValueField,
  labelName,
  readOnly = true,
  onChange = () => {},
  ref = () => {},
  onClick = () => {},
  isEditAble = true,
  accept
}) => {
  return (
    <>
      <div className='flex flex-auto flex-col items-center'>
        <label
          htmlFor={idField}
          className='mb-2 w-full font-medium text-gray-700 md:mb-0 md:pr-4'
        >
          {labelName}
        </label>
        <div className='flex w-full items-center'>
          <input
            id={idField}
            type={typeField}
            name={nameField}
            defaultValue={defaultValueField}
            readOnly={readOnly}
            onChange={
              onChange as (e: React.ChangeEvent<HTMLInputElement>) => void
            }
            ref={ref as RefObject<HTMLInputElement>}
            accept={accept}
            className={`w-full rounded-lg border p-3 ${readOnly ? 'bg-gray-300' : 'bg-white'} transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />

          {isEditAble && (
            <button
              onClick={onClick}
              className='ml-2 flex transform items-center justify-center rounded-lg bg-blue-500 p-3 text-white transition-transform hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
            >
              <IconPencil className='size-6' />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default InputFieldProfile
