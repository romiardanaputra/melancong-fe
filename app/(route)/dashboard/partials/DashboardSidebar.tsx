'use client'
import { NextPage } from 'next'
import React, { useState } from 'react'
import useDestinations from '@/app/hooks/useDestinations'
import {
  Sidebar,
  SidebarBody,
  SidebarLink
} from '@/components/ui/navigation/SideBarAnimate'
import Image from 'next/image'
import LogoIcon from '@/app/(route)/dashboard/partials/LogoIcon'
import Logo from '@/app/(route)/dashboard/partials/Logo'
import { destinationLocations, destinationTypes, links } from '@/data'

interface Props {}

const DashboardSidebar: NextPage<Props> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [locationFilter, setLocationFilter] = useState<string>('')
  const [destinationTypeFilter, setDestinationTypeFilter] = useState<string>('')
  const { fetchDestinations } = useDestinations()
  const [, setFilterSubmitted] = useState(false)

  const handleFilterSubmit = () => {
    fetchDestinations(searchQuery, locationFilter, destinationTypeFilter)
    setFilterSubmitted(true)
  }

  const handleFilterReset = () => {
    setSearchQuery('')
    setLocationFilter('')
    setDestinationTypeFilter('')
    fetchDestinations()
    setFilterSubmitted(false)
  }

  const [open, setOpen] = useState(false)
  return (
    <>
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <div>
                <div className='mt-2'>
                  <h3 className='mb-4 ml-2 text-sm font-semibold'>Locations</h3>
                  <div className='flex flex-wrap gap-2'>
                    {destinationLocations.map(location => (
                      <button
                        key={location}
                        onClick={() => setLocationFilter(location)}
                        className={`rounded-full px-3 py-1 text-sm text-neutral-700 ${locationFilter === location ? 'bg-blue-200' : 'bg-gray-200'}`}
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                </div>
                <div className='mt-4'>
                  <h3 className='mb-4 ml-2 text-sm font-semibold'>
                    Destinations
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {destinationTypes.map(destination => (
                      <button
                        key={destination}
                        onClick={() => setDestinationTypeFilter(destination)}
                        className={`rounded-full px-3 py-1 text-sm text-neutral-700 ${destinationTypeFilter === destination ? 'bg-blue-200' : 'bg-gray-200'}`}
                      >
                        {destination}
                      </button>
                    ))}
                  </div>
                </div>
                <div className=''>
                  <div className='mt-6 flex gap-2'>
                    <button
                      className='rounded-full bg-black px-6 py-2 text-sm text-neutral-200'
                      onClick={handleFilterSubmit}
                    >
                      Submit
                    </button>
                    <button
                      className='rounded-full border border-neutral-900 px-6 py-2 text-sm'
                      onClick={handleFilterReset}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'Manu Arora',
                href: '#',
                icon: (
                  <Image
                    src='https://assets.aceternity.com/manu.png'
                    className='h-7 w-7 flex-shrink-0 rounded-full'
                    width={50}
                    height={50}
                    alt='Avatar'
                  />
                )
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </>
  )
}

export default DashboardSidebar
