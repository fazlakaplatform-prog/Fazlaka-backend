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
    })
  ],
  validation: (Rule) =>
    Rule.custom((field) => {
      if (!field?.episode && !field?.article) {
        return 'يجب اختيار حلقة أو مقالة على الأقل'
      }
      if (field?.episode && field?.article) {
        return 'لا يمكن اختيار حلقة ومقالة معاً'
      }
      return true
    })
  })
