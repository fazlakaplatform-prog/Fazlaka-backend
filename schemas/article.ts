// schema/article.js
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
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
      name: 'excerpt',
      title: 'Excerpt (Arabic)',
      type: 'text',
      hidden: ({ document }) => document?.language !== 'ar'
    }),
    defineField({
      name: 'content',
      title: 'Content (Arabic)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
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
      name: 'excerptEn',
      title: 'Excerpt (English)',
      type: 'text',
      hidden: ({ document }) => document?.language !== 'en'
    }),
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true }
    }),
    // --- العلاقات مع التصفية ---
    defineField({
      name: 'episode',
      title: 'Episode',
      type: 'reference',
      to: [{ type: 'episode' }],
      // فلترة الحلقات حسب لغة المقال
      options: {
        filter: ({ document }) => {
          const articleLanguage = document?.language
          if (!articleLanguage) return {}
          return {
            filter: `language == $lang`,
            params: { lang: articleLanguage }
          }
        }
      }
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'reference',
      to: [{ type: 'season' }],
      // فلترة المواسم حسب لغة المقال
      options: {
        filter: ({ document }) => {
          const articleLanguage = document?.language
          if (!articleLanguage) return {}
          return {
            filter: `language == $lang`,
            params: { lang: articleLanguage }
          }
        }
      }
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
      language: 'language',
      featuredImage: 'featuredImage'
    },
    prepare(selection) {
      const { title, titleEn, language, featuredImage } = selection
      const displayTitle = language === 'en' ? titleEn : title
      return {
        title: displayTitle || 'Untitled',
        media: featuredImage
      }
    }
  }
})