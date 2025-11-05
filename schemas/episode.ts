import { defineType, defineField, defineArrayMember } from 'sanity'
import React from 'react'

export default defineType({
  name: 'episode',
  title: 'Episode',
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
      type: 'text'
    }),
    defineField({
      name: 'content',
      title: 'Content (Arabic)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL (Arabic)',
      type: 'url',
      description: 'URL for the episode thumbnail in Arabic'
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
      type: 'text'
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'thumbnailUrlEn',
      title: 'Thumbnail URL (English)',
      type: 'url',
      description: 'URL for the episode thumbnail in English'
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
      name: 'videoUrl',
      title: 'Video URL (Arabic)',
      type: 'url',
      description: 'URL for the video in Arabic'
    }),
    defineField({
      name: 'videoUrlEn',
      title: 'Video URL (English)',
      type: 'url',
      description: 'URL for the video in English'
    }),
    // --- العلاقات ---
    defineField({
      name: 'playlists',
      title: 'Playlists',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'playlist' }]
        })
      ]
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
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'article' }]
        })
      ]
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
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

      const PreviewImage = () => {
        const imageUrl = thumbnailUrl || thumbnailUrlEn
        if (!imageUrl) return null
        return React.createElement('img', {
          src: imageUrl,
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