import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.BASE_APP_URL}/`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/login`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/sign-up`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/dashboard`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/dashboard/saved`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/dashboard/profile`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/dashboard/profile/edit`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/dashboard/chatbot`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/landing`,
      lastModified: new Date().toISOString()
    },
    {
      url: `${process.env.BASE_APP_URL}/dashboard/destinations`,
      lastModified: new Date().toISOString()
    }
  ]
}
