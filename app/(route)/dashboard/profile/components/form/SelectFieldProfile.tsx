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
    <label htmlFor={idField} className='mb-2 w-full text-sm text-neutral-800'>
      {labelName}
    </label>
    <div className='flex w-full items-center'>
      <select
        id={idField}
        name={nameField}
        defaultValue={defaultValueField}
        onChange={onChange}
        ref={ref as React.RefObject<HTMLSelectElement>}
        className={`w-full rounded-md border p-3 px-4 ${readOnly ? 'bg-neutral-200' : 'bg-white'} transition focus:border-cyan-800 focus:outline-none focus:ring-cyan-800`}
        disabled={readOnly}
      >
        <option value='Male'>Male (He/Him)</option>
        <option value='Female'>Female (She/Her)</option>
      </select>
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
)

export default SelectField
