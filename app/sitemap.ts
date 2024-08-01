import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://melancong-fe.vercel.app/',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/login',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/register',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/dashboard',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/dashboard/saved',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/dashboard/profile',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/dashboard/profile/edit',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/dashboard/chatbot',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/dashboard/landing',
      lastModified: new Date().toISOString()
    },
    {
      url: 'https://melancong-fe.vercel.app/dashboard/destination',
      lastModified: new Date().toISOString()
    }
  ]
}
