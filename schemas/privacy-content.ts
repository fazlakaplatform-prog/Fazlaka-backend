// sanity/schemas/documents/privacy-content.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'privacyContent',
  title: 'محتوى سياسة الخصوصية',
  type: 'document',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'نوع القسم',
      type: 'string',
      options: {
        list: [
          { title: 'سياسة الخصوصية الرئيسية', value: 'mainPolicy' },
          { title: 'حق المستخدم', value: 'userRight' },
          { title: 'نوع البيانات', value: 'dataType' },
          { title: 'إجراء أمني', value: 'securityMeasure' },
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
        const language = (context.parent as any)?.language
        if ((sectionType === 'mainPolicy' || 
             sectionType === 'userRight' ||
             sectionType === 'dataType' ||
             sectionType === 'securityMeasure') && language === 'en' && !value) {
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
      hidden: ({ parent }) => parent?.sectionType !== 'mainPolicy',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if (sectionType === 'mainPolicy' && language === 'ar' && (!value || value.length === 0)) {
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
        const language = (context.parent as any)?.language
        if (sectionType === 'mainPolicy' && language === 'en' && (!value || value.length === 0)) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    defineField({
      name: 'icon',
      title: 'الأيقونة',
      type: 'string',
      description: 'رمز إيموجي يمثل القسم',
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
      title: 'الوصف (Arabic)',
      type: 'text',
      hidden: ({ parent }) => parent?.sectionType !== 'userRight' &&
                               parent?.sectionType !== 'dataType' &&
                               parent?.sectionType !== 'securityMeasure',
      validation: (Rule) => Rule.custom((value, context) => {
        const sectionType = (context.parent as any)?.sectionType
        const language = (context.parent as any)?.language
        if ((sectionType === 'userRight' ||
             sectionType === 'dataType' ||
             sectionType === 'securityMeasure') && language === 'ar' && !value) {
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
        const language = (context.parent as any)?.language
        if ((sectionType === 'userRight' ||
             sectionType === 'dataType' ||
             sectionType === 'securityMeasure') && language === 'en' && !value) {
          return 'This field is required'
        }
        return true
      }),
    }),
    
    // حقول خاصة بأنواع البيانات
    defineField({
      name: 'color',
      title: 'لون الخلفية',
      type: 'string',
      options: {
        list: [
          { title: 'أزرق', value: 'bg-blue-100' },
          { title: 'أخضر', value: 'bg-green-100' },
          { title: 'بنفسجي', value: 'bg-purple-100' },
          { title: 'أصفر', value: 'bg-yellow-100' },
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
      title: 'لون النص',
      type: 'string',
      options: {
        list: [
          { title: 'أزرق', value: 'text-blue-800' },
          { title: 'أخضر', value: 'text-green-800' },
          { title: 'بنفسجي', value: 'text-purple-800' },
          { title: 'أصفر', value: 'text-yellow-800' },
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
      title: 'تاريخ آخر تحديث',
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
      title: 'نوع القسم، ثم العنوان',
      name: 'sectionTypeThenTitle',
      by: [
        { field: 'sectionType', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
})