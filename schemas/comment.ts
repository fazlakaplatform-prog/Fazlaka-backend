import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
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
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    })
  ],
  validation: (Rule) =>
    Rule.custom((field) => {
      if (!field?.episode && !field?.article) {
        return 'يجب ربط التعليق بحلقة أو مقالة'
      }
      if (field?.episode && field?.article) {
        return 'لا يمكن ربط التعليق بحلقة ومقالة معاً'
      }
      return true
    })
})
