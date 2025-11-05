import { defineType, defineField, defineArrayMember } from 'sanity'
import React from 'react'

export default defineType({
  name: 'article',
  title: 'Article',
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
      name: 'excerpt',
      title: 'Excerpt (Arabic)',
      type: 'text'
    }),
    defineField({
      name: 'content',
      title: 'Content (Arabic)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'featuredImageUrl',
      title: 'Featured Image URL (Arabic)',
      type: 'url',
      description: 'URL for the featured image in Arabic'
    }),

    // --- الحقول الإنجليزية ---
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'excerptEn',
      title: 'Excerpt (English)',
      type: 'text'
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })]
    }),
    defineField({
      name: 'featuredImageUrlEn',
      title: 'Featured Image URL (English)',
      type: 'url',
      description: 'URL for the featured image in English'
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
      name: 'episode',
      title: 'Episode',
      type: 'reference',
      to: [{ type: 'episode' }]
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'reference',
      to: [{ type: 'season' }]
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
      featuredImageUrl: 'featuredImageUrl',
      featuredImageUrlEn: 'featuredImageUrlEn'
    },
    prepare(selection) {
      const { title, titleEn, featuredImageUrl, featuredImageUrlEn } = selection
      const displayTitle = `${title || 'Untitled'} / ${titleEn || 'Untitled'}`

      const PreviewImage = () => {
        const imageUrl = featuredImageUrl || featuredImageUrlEn
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