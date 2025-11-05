import { defineField, defineType } from 'sanity'
import React from 'react'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (Arabic)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Name (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => doc.nameEn || doc.name,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role (Arabic)',
      type: 'string',
    }),
    defineField({
      name: 'roleEn',
      title: 'Role (English)',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio (Arabic)',
      type: 'text',
    }),
    defineField({
      name: 'bioEn',
      title: 'Bio (English)',
      type: 'text',
    }),
    defineField({
      name: 'imageUrl',
      title: 'Profile Image URL (Arabic)',
      type: 'url',
      description: 'URL for the team member profile image in Arabic'
    }),
    defineField({
      name: 'imageUrlEn',
      title: 'Profile Image URL (English)',
      type: 'url',
      description: 'URL for the team member profile image in English'
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'social',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      nameEn: 'nameEn',
      imageUrl: 'imageUrl',
      imageUrlEn: 'imageUrlEn',
      role: 'role',
      roleEn: 'roleEn',
    },
    prepare(selection) {
      const { name, nameEn, imageUrl, imageUrlEn, role, roleEn } = selection
      const displayName = `${name || 'Untitled'} / ${nameEn || 'Untitled'}`
      const displayRole = role || roleEn || ''
      const previewImageUrl = imageUrl || imageUrlEn

      const PreviewImage = () => {
        if (!previewImageUrl) return null
        return React.createElement('img', {
          src: previewImageUrl,
          style: { objectFit: 'cover', width: '100%', height: '100%' },
          alt: displayName || 'Team member'
        })
      }

      return {
        title: displayName,
        subtitle: displayRole,
        media: PreviewImage
      }
    }
  },
})