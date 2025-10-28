// schema/playlist.ts
import { defineType, defineField, defineArrayMember } from 'sanity'
import React from 'react' // Import React

export default defineType({
  name: 'playlist',
  title: 'Playlist',
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
        layout: 'radio' // لجعل الاختيار أوضح
      },
      initialValue: 'ar',
      validation: (Rule) => Rule.required()
    }),

    // --- الحقول العربية ---
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      hidden: ({ document }) => document?.language !== 'ar', // إخفاء إذا لم تكن اللغة عربية
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
      hidden: ({ document }) => document?.language !== 'ar' // إخفاء إذا لم تكن اللغة عربية
    }),

    // --- الحقول الإنجليزية ---
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      hidden: ({ document }) => document?.language !== 'en', // إخفاء إذا لم تكن اللغة إنجليزية
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
      hidden: ({ document }) => document?.language !== 'en' // إخفاء إذا لم تكن اللغة إنجليزية
    }),

    // --- الحقول المشتركة ---
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        // تحديد المصدر ديناميكياً بناءً على اللغة
        source: (doc) => doc.language === 'en' ? 'titleEn' : 'title'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL',
      type: 'url',
      description: 'URL for the playlist image'
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
          // فلترة الحلقات حسب لغة قائمة التشغيل
          options: {
            filter: ({ document }) => {
              const playlistLanguage = document?.language
              if (!playlistLanguage) return {}
              return {
                filter: `language == $lang`,
                params: { lang: playlistLanguage }
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
          // فلترة المقالات حسب لغة قائمة التشغيل
          options: {
            filter: ({ document }) => {
              const playlistLanguage = document?.language
              if (!playlistLanguage) return {}
              return {
                filter: `language == $lang`,
                params: { lang: playlistLanguage }
              }
            }
          }
        })
      ]
    })
  ],
  // ====> إضافة معاينة للقائمة <====
  preview: {
    select: {
      title: 'title',
      titleEn: 'titleEn',
      language: 'language',
      imageUrl: 'imageUrl'
    },
    prepare(selection) {
      const { title, titleEn, language, imageUrl } = selection
      const displayTitle = language === 'en' ? titleEn : title
      
      const PreviewImage = () => {
        if (!imageUrl) return null
        return React.createElement('img', {
          src: imageUrl,
          style: { objectFit: 'cover', width: '100%', height: '100%' },
          alt: displayTitle || 'Preview'
        })
      }
      
      return {
        title: displayTitle || 'Untitled Playlist',
        media: PreviewImage // Pass the component, not the URL string
      }
    }
  }
})