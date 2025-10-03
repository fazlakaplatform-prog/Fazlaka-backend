import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'description',
      title: 'Description (Arabic)',
      type: 'text',
      description: 'Optional description for the season'
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      description: 'Optional description for the season'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      defaultValue: () => new Date()
    }),
    defineField({
      name: 'episodes',
      title: 'Episodes',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'episode' }] })]
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })]
    }),
    // إضافة حقل اللغة
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Arabic', value: 'ar' },
          { title: 'English', value: 'en' }
        ]
      },
      initialValue: 'ar',
      validation: (Rule) => Rule.required()
    })
  ]
})