import React from 'react'

import DestinationDetail from '@/app/(route)/destinations/components/DestinationDetail'
import { NextPage } from 'next'
import { DetailPageProps } from '../index.props'

const DestinationDetailPage: NextPage<DetailPageProps> = ({ params }) => {
  return (
    <>
      <DestinationDetail id={params.id} />
    </>
  )
}

export default DestinationDetailPage
