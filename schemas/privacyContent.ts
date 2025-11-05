import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'privacyContent',
  title: 'Privacy Content',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Main Privacy Policy', value: 'mainPolicy' },
          { title: 'User Right', value: 'userRight' },
          { title: 'Data Type', value: 'dataType' },
          { title: 'Security Measure', value: 'securityMeasure' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    
    // حقول مشتركة
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'mainPolicy' && 
                               parent?.sectionType !== 'userRight' &&
                               parent?.sectionType !== 'dataType' &&
                               parent?.sectionType !== 'securityMeasure',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if ((sectionType === 'mainPolicy' || 
             sectionType === 'userRight' ||
             sectionType === 'dataType' ||
             sectionType === 'securityMeasure') && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'mainPolicy' && 
                               parent?.sectionType !== 'userRight' &&
                               parent?.sectionType !== 'dataType' &&
                               parent?.sectionType !== 'securityMeasure',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if ((sectionType === 'mainPolicy' || 
             sectionType === 'userRight' ||
             sectionType === 'dataType' ||
             sectionType === 'securityMeasure') && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'content',
      title: 'Content (Arabic)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
          },
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'mainPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'mainPolicy' && (!value || value.length === 0)) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'contentEn',
      title: 'Content (English)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
          },
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'mainPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'mainPolicy' && (!value || value.length === 0)) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji icon representing the section',
      hidden: ({ parent }) => parent?.sectionType !== 'userRight' &&
                               parent?.sectionType !== 'dataType' &&
                               parent?.sectionType !== 'securityMeasure',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if ((sectionType === 'userRight' ||
             sectionType === 'dataType' ||
             sectionType === 'securityMeasure') && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'description',
      title: 'Description (Arabic)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'userRight' &&
                               parent?.sectionType !== 'dataType' &&
                               parent?.sectionType !== 'securityMeasure',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if ((sectionType === 'userRight' ||
             sectionType === 'dataType' ||
             sectionType === 'securityMeasure') && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'userRight' &&
                               parent?.sectionType !== 'dataType' &&
                               parent?.sectionType !== 'securityMeasure',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if ((sectionType === 'userRight' ||
             sectionType === 'dataType' ||
             sectionType === 'securityMeasure') && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    // حقول خاصة بأنواع البيانات
    defineField({
      name: 'color',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'bg-blue-100' },
          { title: 'Green', value: 'bg-green-100' },
          { title: 'Purple', value: 'bg-purple-100' },
          { title: 'Yellow', value: 'bg-yellow-100' },
        ],
      },
      hidden: ({ parent }) => parent?.sectionType !== 'dataType',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'dataType' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'text-blue-800' },
          { title: 'Green', value: 'text-green-800' },
          { title: 'Purple', value: 'text-purple-800' },
          { title: 'Yellow', value: 'text-yellow-800' },
        ],
      },
      hidden: ({ parent }) => parent?.sectionType !== 'dataType',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'dataType' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'datetime',
      hidden: ({ parent }) => parent?.sectionType !== 'mainPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'mainPolicy' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
  ],
  orderings: [
    {
      title: 'Section Type, then Title',
      name: 'sectionTypeThenTitle',
      by: [
        { field: 'sectionType', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
})