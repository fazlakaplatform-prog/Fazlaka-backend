import { defineType, defineField, defineArrayMember } from 'sanity'
import React from 'react'

export default defineType({
  name: 'playlist',
  title: 'Playlist',
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
      name: 'imageUrl',
      title: 'Image URL (Arabic)',
      type: 'url',
      description: 'URL for the playlist image in Arabic'
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
      name: 'imageUrlEn',
      title: 'Image URL (English)',
      type: 'url',
      description: 'URL for the playlist image in English'
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
      imageUrl: 'imageUrl',
      imageUrlEn: 'imageUrlEn'
    },
    prepare(selection) {
      const { title, titleEn, imageUrl, imageUrlEn } = selection
      const displayTitle = `${title || 'Untitled'} / ${titleEn || 'Untitled'}`
      const previewImageUrl = imageUrl || imageUrlEn
      
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