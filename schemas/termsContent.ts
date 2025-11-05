import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'termsContent',
  title: 'Terms Content',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Main Terms and Conditions', value: 'mainTerms' },
          { title: 'Legal Term', value: 'legalTerm' },
          { title: 'Rights and Responsibilities', value: 'rightsResponsibility' },
          { title: 'Additional Policy', value: 'additionalPolicy' },
          { title: 'Site Settings', value: 'siteSettings' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    
    // حقول مشتركة
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'mainTerms' && 
                               parent?.sectionType !== 'rightsResponsibility' && 
                               parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if ((sectionType === 'mainTerms' || sectionType === 'rightsResponsibility' || sectionType === 'additionalPolicy') && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'mainTerms' && 
                               parent?.sectionType !== 'rightsResponsibility' && 
                               parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if ((sectionType === 'mainTerms' || sectionType === 'rightsResponsibility' || sectionType === 'additionalPolicy') && !value) {
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
      hidden: ({ parent }) => parent?.sectionType !== 'mainTerms',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'mainTerms' && (!value || value.length === 0)) {
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
      hidden: ({ parent }) => parent?.sectionType !== 'mainTerms',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'mainTerms' && (!value || value.length === 0)) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    // حقول خاصة بالمصطلحات القانونية
    defineField({
      name: 'term',
      title: 'Term (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'legalTerm',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'legalTerm' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'termEn',
      title: 'Term (English)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'legalTerm',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'legalTerm' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'definition',
      title: 'Definition (Arabic)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'legalTerm',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'legalTerm' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'definitionEn',
      title: 'Definition (English)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'legalTerm',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'legalTerm' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji icon representing the term or section',
      hidden: ({ parent }) => parent?.sectionType !== 'legalTerm' && 
                               parent?.sectionType !== 'rightsResponsibility' && 
                               parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if ((sectionType === 'legalTerm' || sectionType === 'rightsResponsibility' || sectionType === 'additionalPolicy') && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    // حقول خاصة بالحقوق والمسؤوليات
    defineField({
      name: 'rightsType',
      title: 'Rights/Responsibilities Type',
      type: 'string',
      options: {
        list: [
          { title: 'User Rights', value: 'userRights' },
          { title: 'User Responsibilities', value: 'userResponsibilities' },
          { title: 'Company Rights', value: 'companyRights' },
        ],
      },
      hidden: ({ parent }) => parent?.sectionType !== 'rightsResponsibility',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'rightsResponsibility' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'items',
      title: 'Items (Arabic)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'rightsResponsibility',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'rightsResponsibility' && (!value || value.length === 0)) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'itemsEn',
      title: 'Items (English)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'itemEn',
              title: 'Item',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'rightsResponsibility',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'rightsResponsibility' && (!value || value.length === 0)) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'color',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Green', value: 'bg-green-50' },
          { title: 'Yellow', value: 'bg-yellow-50' },
          { title: 'Blue', value: 'bg-blue-50' },
        ],
      },
      hidden: ({ parent }) => parent?.sectionType !== 'rightsResponsibility',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'rightsResponsibility' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'borderColor',
      title: 'Border Color',
      type: 'string',
      options: {
        list: [
          { title: 'Green', value: 'border-green-200' },
          { title: 'Yellow', value: 'border-yellow-200' },
          { title: 'Blue', value: 'border-blue-200' },
        ],
      },
      hidden: ({ parent }) => parent?.sectionType !== 'rightsResponsibility',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'rightsResponsibility' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    // حقول خاصة بالسياسات الإضافية
    defineField({
      name: 'description',
      title: 'Description (Arabic)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'additionalPolicy' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'descriptionEn',
      title: 'Description (English)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'additionalPolicy' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'linkText',
      title: 'Link Text (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'additionalPolicy' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'linkTextEn',
      title: 'Link Text (English)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'additionalPolicy' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'linkUrl',
      title: 'Policy Link',
      type: 'url',
      hidden: ({ parent }) => parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'additionalPolicy' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    // حقول خاصة بإعدادات الموقع
    defineField({
      name: 'siteTitle',
      title: 'Site Title (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'siteSettings' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'siteTitleEn',
      title: 'Site Title (English)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'siteSettings' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'siteDescription',
      title: 'Site Description (Arabic)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'siteSettings' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'siteDescriptionEn',
      title: 'Site Description (English)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'siteSettings' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'logo',
      title: 'Site Logo (Arabic)',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
    }),
    
    defineField({
      name: 'logoEn',
      title: 'Site Logo (English)',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
    }),
    
    defineField({
      name: 'footerText',
      title: 'Footer Text (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'siteSettings' && !value) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'footerTextEn',
      title: 'Footer Text (English)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'siteSettings' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'datetime',
      hidden: ({ parent }) => parent?.sectionType !== 'mainTerms',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        if (sectionType === 'mainTerms' && !value) {
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