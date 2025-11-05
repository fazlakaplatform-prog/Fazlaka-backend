import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    // --- الحقول العربية ---
    defineField({
      name: 'question',
      title: 'Question (Arabic)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answer (Arabic)',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category (Arabic)',
      type: 'string',
      description: 'e.g., تقني، فواتير، عام',
      validation: Rule => Rule.required()
    }),

    // --- الحقول الإنجليزية ---
    defineField({
      name: 'questionEn',
      title: 'Question (English)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answerEn',
      title: 'Answer (English)',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'categoryEn',
      title: 'Category (English)',
      type: 'string',
      description: 'e.g., Technical, Billing, General',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      question: 'question',
      questionEn: 'questionEn',
      category: 'category',
      categoryEn: 'categoryEn'
    },
    prepare(selection) {
      const { question, questionEn, category, categoryEn } = selection;
      const displayQuestion = `${question || 'Untitled'} / ${questionEn || 'Untitled'}`;
      const displayCategory = `${category || 'Uncategorized'} / ${categoryEn || 'Uncategorized'}`;

      return {
        title: displayQuestion,
        subtitle: `Category: ${displayCategory}`
      };
    }
  }
});