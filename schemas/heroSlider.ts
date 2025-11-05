import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSlider',
  title: 'Hero Slider',
  type: 'document',
  fields: [
    // --- الحقول العربية ---
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      description: 'Title for the slide in Arabic',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description (Arabic)',
      type: 'text',
      description: 'Description for the slide in Arabic',
      validation: Rule => Rule.required()
    }),

    // --- الحقول الإنجليزية ---
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      description: 'Title for the slide in English',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      description: 'Description for the slide in English',
      validation: Rule => Rule.required()
    }),

    // --- الحقول المشتركة ---
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
      name: 'image',
      title: 'Image URL (Arabic)',
      type: 'url',
      description: 'URL for the slide image in Arabic',
      hidden: ({ document }) => document?.mediaType !== 'image'
    }),
    defineField({
      name: 'imageEn',
      title: 'Image URL (English)',
      type: 'url',
      description: 'URL for the slide image in English',
      hidden: ({ document }) => document?.mediaType !== 'image'
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (Arabic)',
      type: 'url',
      description: 'URL for the slide video in Arabic (e.g., direct .mp4 link, YouTube, Vimeo)',
      hidden: ({ document }) => document?.mediaType !== 'video'
    }),
    defineField({
      name: 'videoUrlEn',
      title: 'Video URL (English)',
      type: 'url',
      description: 'URL for the slide video in English (e.g., direct .mp4 link, YouTube, Vimeo)',
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
          description: 'Text for the link button in Arabic'
        }),
        defineField({
          name: 'textEn',
          title: 'Link Text (English)',
          type: 'string',
          description: 'Text for the link button in English'
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
      image: 'image',
      imageEn: 'imageEn',
      mediaType: 'mediaType'
    },
    prepare(selection) {
      const { title, titleEn, image, imageEn, mediaType } = selection;
      const imageUrl = image || imageEn;
      return {
        title: `${title || 'Untitled'} / ${titleEn || 'Untitled'}`,
        subtitle: `${mediaType === 'image' ? 'Image' : 'Video'} Slide`,
        media: mediaType === 'image' && imageUrl ? { src: imageUrl } : null
      }
    }
  }
});