// sanity/schemas/heroSlider.ts
export default {
  name: 'heroSlider',
  title: 'Hero Slider',
  type: 'document',
  fields: [
    {
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
    },
    {
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      description: 'Title for the slide in Arabic',
      validation: Rule => Rule.required()
    },
    {
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      description: 'Title for the slide in English',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description (Arabic)',
      type: 'text',
      description: 'Description for the slide in Arabic',
      validation: Rule => Rule.required()
    },
    {
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      description: 'Description for the slide in English',
      validation: Rule => Rule.required()
    },
    {
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
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Upload an image for the slide',
      options: {
        hotspot: true
      },
      hidden: ({ document }) => document?.mediaType !== 'image'
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      description: 'Upload a video for the slide',
      options: {
        accept: 'video/*'
      },
      hidden: ({ document }) => document?.mediaType !== 'video'
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'External video URL (YouTube, Vimeo, etc.)',
      hidden: ({ document }) => document?.mediaType !== 'video'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Link Text (Arabic)',
          type: 'string',
          description: 'Text for the link button in Arabic'
        },
        {
          name: 'textEn',
          title: 'Link Text (English)',
          type: 'string',
          description: 'Text for the link button in English'
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
          description: 'URL for the link button'
        }
      ]
    },
    {
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      description: 'Order of the slide in the slider'
    }
  ],
  preview: {
    select: {
      title: 'title',
      titleEn: 'titleEn',
      media: 'image',
      mediaType: 'mediaType',
      language: 'language'
    },
    prepare({ title, titleEn, media, mediaType, language }) {
      return {
        title: language === 'ar' ? title : titleEn,
        subtitle: `${mediaType === 'image' ? 'Image' : 'Video'} Slide (${language === 'ar' ? 'Arabic' : 'English'})`,
        media: mediaType === 'image' ? media : null
      }
    }
  }
}