// schemas/teamMember.ts
import { defineField, defineType } from 'sanity'
import React from 'react'

export default defineType({
  name: 'teamMember',
  title: 'team-Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'الاسم',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'الاسم (بالإنجليزية)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'الرابط',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'المنصب',
      type: 'string',
    }),
    defineField({
      name: 'roleEn',
      title: 'المنصب (بالإنجليزية)',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'السيرة الذاتية',
      type: 'text',
    }),
    defineField({
      name: 'bioEn',
      title: 'السيرة الذاتية (بالإنجليزية)',
      type: 'text',
    }),
    defineField({
      name: 'imageUrl',
      title: 'رابط الصورة الشخصية',
      type: 'url',
      description: 'URL for the team member profile image'
    }),
    defineField({
      name: 'order',
      title: 'الترتيب',
      type: 'number',
    }),
    defineField({
      name: 'socialMedia',
      title: 'وسائل التواصل الاجتماعي',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'social',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'المنصة',
              options: {
                list: [
                  { title: 'فيسبوك', value: 'facebook' },
                  { title: 'تويتر', value: 'twitter' },
                  { title: 'انستغرام', value: 'instagram' },
                  { title: 'لينكدإن', value: 'linkedin' },
                  { title: 'يوتيوب', value: 'youtube' },
                  { title: 'تيك توك', value: 'tiktok' },
                ],
              },
            },
            {
              name: 'url',
              type: 'url',
              title: 'الرابط',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'language',
      title: 'اللغة',
      type: 'string',
      options: {
        list: [
          { title: 'العربية', value: 'ar' },
          { title: 'English', value: 'en' },
        ],
      },
      initialValue: 'ar',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      imageUrl: 'imageUrl',
      subtitle: 'role',
    },
    prepare(selection) {
      const { title, imageUrl, subtitle } = selection

      const PreviewImage = () => {
        if (!imageUrl) return null
        return React.createElement('img', {
          src: imageUrl,
          style: { objectFit: 'cover', width: '100%', height: '100%' },
          alt: title || 'Team member'
        })
      }

      return {
        title: title || 'Untitled',
        subtitle: subtitle,
        media: PreviewImage
      }
    }
  },
})