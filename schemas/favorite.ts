import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'favorite',
  title: 'Favorite',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'episode',
      title: 'Episode',
      type: 'reference',
      to: [{ type: 'episode' }]
    }),
    defineField({
      name: 'article',
      title: 'Article',
      type: 'reference',
      to: [{ type: 'article' }]
    }),
    // تم إضافة حقل createdAt ليتوافق مع خدمة Dart
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true, // جعله للقراءة فقط لأنه يتم تحديده عبر الـ API
    })
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      // التحقق من أن المستخدم يجب أن يختار حلقة أو مقالة، وليس كليهما أو لا شيء منهما
      if (!fields?.episode && !fields?.article) {
        return 'يجب اختيار حلقة أو مقالة على الأقل'
      }
      if (fields?.episode && fields?.article) {
        return 'لا يمكن اختيار حلقة ومقالة معاً'
      }
      return true
    })
})