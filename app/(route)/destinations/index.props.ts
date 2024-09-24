export type DestinationDetail = {
  id: string
  name: string
  regency: string
  rating: string
  location: string
  childEntry: string
  adultsEntry: string
  imageLink: string
  information: string
}

export type ErrorResponseDetail = {
  response: {
    status: number
  }
}

export type DetailProps = {
  id: string
}

export type DetailPageProps = {
  params: {
    id: string
  }
}
