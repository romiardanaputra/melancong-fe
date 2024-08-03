import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.BASE_URL}/`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/login`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/sign-up`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/dashboard`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/dashboard/saved`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/dashboard/profile`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/dashboard/profile/edit`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/dashboard/chatbot`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/landing`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_URL}/dashboard/destinations`,
      lastModified: new Date().toISOString()
    }
  ]
}
