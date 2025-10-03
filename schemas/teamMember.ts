// schemas/teamMember.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'عضو الفريق',
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
      name: 'image',
      title: 'الصورة الشخصية',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'النص البديل',
          options: {
            isHighlighted: true,
          },
        },
      ],
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
      media: 'image',
      subtitle: 'role',
    },
  },
})