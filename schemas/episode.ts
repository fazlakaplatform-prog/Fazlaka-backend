import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'episode',
  title: 'Episode',
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
      name: 'content',
      title: 'Content (Arabic)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url'
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'playlists',
      title: 'Playlists',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'playlist' }] })]
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'reference',
      to: [{ type: 'season' }]
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'article' }] })]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
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