// playlist.ts
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'playlist',
  title: 'Playlist',
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
      name: 'description',
      title: 'Description (Arabic)',
      type: 'text'
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'episodes',
      title: 'Episodes',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'episode' }] })]
    }),
    // إضافة حقل المقالات
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