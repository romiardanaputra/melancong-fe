import React from 'react'
import { NextPage } from 'next'
import { FieldProps } from '../../index.props'
import InputFieldProfile from '../../components/form/InputFieldProfile'
import SelectField from '../../components/form/SelectFieldProfile'

const CustomFieldProfile: NextPage<FieldProps> = props => {
  const { variant } = props

  switch (variant) {
    case 'INPUT':
      return <InputFieldProfile {...props} />
    case 'SELECT':
      return <SelectField {...props} />

    default:
      return null
  }
}

export default CustomFieldProfile
