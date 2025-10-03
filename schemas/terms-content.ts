// sanity/schemas/documents/terms-content.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'termsContent',
  title: 'محتوى الشروط والأحكام',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'نوع القسم',
      type: 'string',
      options: {
        list: [
          { title: 'شروط وأحكام رئيسية', value: 'mainTerms' },
          { title: 'مصطلح قانوني', value: 'legalTerm' },
          { title: 'حقوق ومسؤوليات', value: 'rightsResponsibility' },
          { title: 'سياسة إضافية', value: 'additionalPolicy' },
          { title: 'إعدادات الموقع', value: 'siteSettings' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    
    // حقول اللغة
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Arabic', value: 'ar' },
          { title: 'English', value: 'en' }
        ]
      },
      initialValue: 'ar',
      validation: (Rule) => Rule.required()
    }),
    
    // حقول مشتركة
    defineField({
      name: 'title',
      title: 'العنوان (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'mainTerms' && 
                               parent?.sectionType !== 'rightsResponsibility' && 
                               parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if ((sectionType === 'mainTerms' || sectionType === 'rightsResponsibility' || sectionType === 'additionalPolicy') && 
            ((language === 'ar' && !value) || (language === 'en' && !value))) {
          return language === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'
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
        const language = (context.parent as any)?.language
        if ((sectionType === 'mainTerms' || sectionType === 'rightsResponsibility' || sectionType === 'additionalPolicy') && 
            language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'content',
      title: 'المحتوى (Arabic)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'عادي', value: 'normal' }],
          lists: [{ title: 'قائمة', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'عريض', value: 'strong' },
              { title: 'مائل', value: 'em' },
              { title: 'تحته خط', value: 'underline' },
            ],
          },
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'mainTerms',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'mainTerms' && language === 'ar' && (!value || value.length === 0)) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'mainTerms' && language === 'en' && (!value || value.length === 0)) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    // حقول خاصة بالمصطلحات القانونية
    defineField({
      name: 'term',
      title: 'المصطلح (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'legalTerm',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'legalTerm' && language === 'ar' && !value) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'legalTerm' && language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'definition',
      title: 'التعريف (Arabic)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'legalTerm',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'legalTerm' && language === 'ar' && !value) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'legalTerm' && language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'icon',
      title: 'الأيقونة',
      type: 'string',
      description: 'رمز إيموجي يمثل المصطلح أو القسم',
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
      title: 'نوع الحقوق/المسؤوليات',
      type: 'string',
      options: {
        list: [
          { title: 'حقوق المستخدم', value: 'userRights' },
          { title: 'مسؤوليات المستخدم', value: 'userResponsibilities' },
          { title: 'حقوق الشركة', value: 'companyRights' },
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
      title: 'العناصر (Arabic)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'العنصر',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'rightsResponsibility',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'rightsResponsibility' && language === 'ar' && (!value || value.length === 0)) {
          return 'هذا الحقل مطلوب'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'itemsEn',
      title: 'العناصر (English)',
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
        const language = (context.parent as any)?.language
        if (sectionType === 'rightsResponsibility' && language === 'en' && (!value || value.length === 0)) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'color',
      title: 'لون الخلفية',
      type: 'string',
      options: {
        list: [
          { title: 'أخضر', value: 'bg-green-50' },
          { title: 'أصفر', value: 'bg-yellow-50' },
          { title: 'أزرق', value: 'bg-blue-50' },
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
      title: 'لون الحدود',
      type: 'string',
      options: {
        list: [
          { title: 'أخضر', value: 'border-green-200' },
          { title: 'أصفر', value: 'border-yellow-200' },
          { title: 'أزرق', value: 'border-blue-200' },
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
      title: 'الوصف (Arabic)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'additionalPolicy' && language === 'ar' && !value) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'additionalPolicy' && language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'linkText',
      title: 'نص الرابط (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'additionalPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'additionalPolicy' && language === 'ar' && !value) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'additionalPolicy' && language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'linkUrl',
      title: 'رابط السياسة',
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
      title: 'عنوان الموقع (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'siteSettings' && language === 'ar' && !value) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'siteSettings' && language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'siteDescription',
      title: 'وصف الموقع (Arabic)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'siteSettings' && language === 'ar' && !value) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'siteSettings' && language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'logo',
      title: 'شعار الموقع',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
    }),
    
    defineField({
      name: 'footerText',
      title: 'نص التذييل (Arabic)',
      type: 'string',
      hidden: ({ parent }) => parent?.sectionType !== 'siteSettings',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'siteSettings' && language === 'ar' && !value) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'siteSettings' && language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'lastUpdated',
      title: 'تاريخ آخر تحديث',
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
      title: 'نوع القسم، ثم العنوان',
      name: 'sectionTypeThenTitle',
      by: [
        { field: 'sectionType', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
})