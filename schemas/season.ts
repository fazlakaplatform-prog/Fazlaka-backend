import { defineType, defineField, defineArrayMember } from 'sanity'
import React from 'react'

export default defineType({
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    // --- الحقول العربية ---
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description (Arabic)',
      type: 'text',
      description: 'Optional description for the season'
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL (Arabic)',
      type: 'url',
      description: 'URL for the season thumbnail in Arabic'
    }),

    // --- الحقول الإنجليزية ---
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      description: 'Optional description for the season'
    }),
    defineField({
      name: 'thumbnailUrlEn',
      title: 'Thumbnail URL (English)',
      type: 'url',
      description: 'URL for the season thumbnail in English'
    }),

    // --- الحقول المشتركة ---
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => doc.titleEn || doc.title
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      defaultValue: () => new Date()
    }),
    // --- العلاقات ---
    defineField({
      name: 'episodes',
      title: 'Episodes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'episode' }]
        })
      ]
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'article' }]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      titleEn: 'titleEn',
      thumbnailUrl: 'thumbnailUrl',
      thumbnailUrlEn: 'thumbnailUrlEn'
    },
    prepare(selection) {
      const { title, titleEn, thumbnailUrl, thumbnailUrlEn } = selection
      const displayTitle = `${title || 'Untitled'} / ${titleEn || 'Untitled'}`
      const previewImageUrl = thumbnailUrl || thumbnailUrlEn

      const PreviewImage = () => {
        if (!previewImageUrl) return null
        return React.createElement('img', {
          src: previewImageUrl,
          style: { objectFit: 'cover', width: '100%', height: '100%' },
          alt: displayTitle || 'Preview'
        })
      }

      return {
        title: displayTitle,
        media: PreviewImage
      }
    }
  }
})