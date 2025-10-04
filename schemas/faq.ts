// faq.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    // 1. حقل اللغة (المتحكم الرئيسي)
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'العربية', value: 'ar' },
          { title: 'English', value: 'en' },
        ],
        layout: 'radio'
      },
      initialValue: 'ar',
      validation: Rule => Rule.required()
    }),

    // --- الحقول العربية ---
    defineField({
      name: 'question',
      title: 'Question (Arabic)',
      type: 'string',
      hidden: ({ document }) => document?.language !== 'ar',
      validation: Rule =>
        Rule.custom((value, { document }) => {
          if (document?.language === 'ar' && !value) {
            return 'السؤال (العربي) مطلوب'
          }
          return true
        })
    }),
    defineField({
      name: 'answer',
      title: 'Answer (Arabic)',
      type: 'text',
      hidden: ({ document }) => document?.language !== 'ar',
      validation: Rule =>
        Rule.custom((value, { document }) => {
          if (document?.language === 'ar' && !value) {
            return 'الإجابة (العربية) مطلوبة'
          }
          return true
        })
    }),

    // --- الحقول الإنجليزية ---
    defineField({
      name: 'questionEn',
      title: 'Question (English)',
      type: 'string',
      hidden: ({ document }) => document?.language !== 'en',
      validation: Rule =>
        Rule.custom((value, { document }) => {
          if (document?.language === 'en' && !value) {
            return 'Question (English) is required'
          }
          return true
        })
    }),
    defineField({
      name: 'answerEn',
      title: 'Answer (English)',
      type: 'text',
      hidden: ({ document }) => document?.language !== 'en',
      validation: Rule =>
        Rule.custom((value, { document }) => {
          if (document?.language === 'en' && !value) {
            return 'Answer (English) is required'
          }
          return true
        })
    }),

    // --- الحقل المشترك (حقل نصي عادي) ---
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string', // عاد حقل نصي عادي كما طلبت
      description: 'e.g., Technical, Billing, General'
    })
  ],
  preview: {
    select: {
      question: 'question',
      questionEn: 'questionEn',
      language: 'language',
      category: 'category' // اختيار حقل الفئة مباشرة
    },
    prepare(selection) {
      const { question, questionEn, language, category } = selection;
      const displayQuestion = language === 'en' ? questionEn : question;

      return {
        title: displayQuestion,
        subtitle: `Category: ${category || 'Uncategorized'}`
      };
    }
  }
});