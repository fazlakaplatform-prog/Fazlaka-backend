import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSlider',
  title: 'Hero Slider',
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
      validation: Rule => Rule.required()
    }),

    // --- الحقول العربية ---
    // تظهر فقط عندما تكون اللغة 'ar'
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      description: 'Title for the slide in Arabic',
      hidden: ({ document }) => document?.language !== 'ar',
      validation: Rule =>
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
      description: 'Description for the slide in Arabic',
      hidden: ({ document }) => document?.language !== 'ar',
      validation: Rule =>
        Rule.custom((value, { document }) => {
          if (document?.language === 'ar' && !value) {
            return 'الوصف (العربي) مطلوب'
          }
          return true
        })
    }),

    // --- الحقول الإنجليزية ---
    // تظهر فقط عندما تكون اللغة 'en'
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      description: 'Title for the slide in English',
      hidden: ({ document }) => document?.language !== 'en',
      validation: Rule =>
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
      description: 'Description for the slide in English',
      hidden: ({ document }) => document?.language !== 'en',
      validation: Rule =>
        Rule.custom((value, { document }) => {
          if (document?.language === 'en' && !value) {
            return 'Description (English) is required'
          }
          return true
        })
    }),

    // --- الحقول المشتركة (لا تتغير) ---
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' }
        ],
        layout: 'radio'
      },
      initialValue: 'image',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image', // تغيير الاسم من imageUrl إلى image
      title: 'Image URL',
      type: 'url',
      description: 'URL for the slide image',
      hidden: ({ document }) => document?.mediaType !== 'image'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL for the slide video (e.g., direct .mp4 link, YouTube, Vimeo)',
      hidden: ({ document }) => document?.mediaType !== 'video'
    }),
    
    // --- حقل الرابط مع حقول داخلية متغيرة حسب اللغة ---
    defineField({
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Link Text (Arabic)',
          type: 'string',
          description: 'Text for the link button in Arabic',
          hidden: ({ document }) => document?.language !== 'ar'
        }),
        defineField({
          name: 'textEn',
          title: 'Link Text (English)',
          type: 'string',
          description: 'Text for the link button in English',
          hidden: ({ document }) => document?.language !== 'en'
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'URL for the link button',
          validation: Rule => Rule.required()
        })
      ]
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      description: 'Order of the slide in the slider'
    })
  ],
  preview: {
    select: {
      title: 'title',
      titleEn: 'titleEn',
      image: 'image', // تغيير من imageUrl إلى image
      mediaType: 'mediaType',
      language: 'language'
    },
    prepare(selection) {
      const { title, titleEn, image, mediaType, language } = selection;
      return {
        title: language === 'en' ? titleEn : title,
        subtitle: `${mediaType === 'image' ? 'Image' : 'Video'} Slide (${language === 'ar' ? 'Arabic' : 'English'})`,
        media: mediaType === 'image' && image ? { src: image } : null
      }
    }
  }
});