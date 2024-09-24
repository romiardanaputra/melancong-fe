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
          className='mb-2 w-full text-sm text-neutral-800'
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
            className={`w-full rounded-md border p-3 px-4 ${readOnly ? 'bg-neutral-200' : 'bg-white'} transition focus:border-cyan-800 focus:outline-none focus:ring-blue-500`}
          />

          {isEditAble && (
            <button
              onClick={onClick}
              className='ml-2 flex items-center justify-center rounded-lg bg-cyan-800 p-3 text-white hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-800'
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
