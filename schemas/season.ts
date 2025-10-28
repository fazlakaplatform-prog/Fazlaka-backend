// schema/season.ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import React from 'react' // Import React

export default defineType({
  name: 'season',
  title: 'Season',
  type: 'document',
  fields: [
    // 1. حقل اللغة (المتحكم الرئيسي)
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'العربية', value: 'ar' },
          { title: 'English', value: 'en' }
        ],
        layout: 'radio'
      },
      initialValue: 'ar',
      validation: (Rule) => Rule.required()
    }),

    // --- الحقول العربية ---
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      hidden: ({ document }) => document?.language !== 'ar',
      validation: (Rule) =>
        Rule.custom((value, { document }) => {
          if (document?.language === 'ar' && !value) {
            return 'العنوان (العربي) مطلوب'
          }
          return true
        })
    }),
    defineField({
      name: 'description',
      title: 'Description (Arabic)',
      type: 'text',
      description: 'Optional description for the season',
      hidden: ({ document }) => document?.language !== 'ar'
    }),

    // --- الحقول الإنجليزية ---
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      hidden: ({ document }) => document?.language !== 'en',
      validation: (Rule) =>
        Rule.custom((value, { document }) => {
          if (document?.language === 'en' && !value) {
            return 'Title (English) is required'
          }
          return true
        })
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      description: 'Optional description for the season',
      hidden: ({ document }) => document?.language !== 'en'
    }),

    // --- الحقول المشتركة ---
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => doc.language === 'en' ? 'titleEn' : 'title'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL',
      type: 'url',
      description: 'URL for the season thumbnail'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      defaultValue: () => new Date()
    }),
    // --- العلاقات مع التصفية ---
    defineField({
      name: 'episodes',
      title: 'Episodes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'episode' }],
          // فلترة الحلقات حسب لغة الموسم
          options: {
            filter: ({ document }) => {
              const seasonLanguage = document?.language
              if (!seasonLanguage) return {}
              return {
                filter: `language == $lang`,
                params: { lang: seasonLanguage }
              }
            }
          }
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
          to: [{ type: 'article' }],
          // فلترة المقالات حسب لغة الموسم
          options: {
            filter: ({ document }) => {
              const seasonLanguage = document?.language
              if (!seasonLanguage) return {}
              return {
                filter: `language == $lang`,
                params: { lang: seasonLanguage }
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      titleEn: 'titleEn',
      language: 'language',
      thumbnailUrl: 'thumbnailUrl'
    },
    prepare(selection) {
      const { title, titleEn, language, thumbnailUrl } = selection
      const displayTitle = language === 'en' ? titleEn : title

      const PreviewImage = () => {
        if (!thumbnailUrl) return null
        return React.createElement('img', {
          src: thumbnailUrl,
          style: { objectFit: 'cover', width: '100%', height: '100%' },
          alt: displayTitle || 'Preview'
        })
      }

      return {
        title: displayTitle || 'Untitled Season',
        media: PreviewImage // Pass the component, not the URL string
      }
    }
  }
})