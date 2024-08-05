import React from 'react'
import { IconPencil } from '@tabler/icons-react'
import { FieldProps } from '../../index.props'

const SelectField: React.FC<FieldProps> = ({
  idField,
  nameField,
  defaultValueField,
  onChange = () => {},
  ref = () => {},
  onClick = () => {},
  isEditAble = true,
  readOnly = true,
  labelName
}) => (
  <div className='flex flex-col items-center'>
    <label htmlFor={idField} className='mb-2 w-full font-medium text-gray-700'>
      {labelName}
    </label>
    <div className='flex w-full items-center'>
      <select
        id={idField}
        name={nameField}
        defaultValue={defaultValueField}
        onChange={onChange}
        ref={ref as React.RefObject<HTMLSelectElement>}
        className={`w-full rounded-lg border p-3 ${readOnly ? 'bg-gray-300' : 'bg-white'} transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        disabled={readOnly}
      >
        <option value='Male'>Male (He/Him)</option>
        <option value='Female'>Female (She/Her)</option>
      </select>
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
)

export default SelectField
