import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'الأسئلة الشائعة',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'اللغة',
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
    defineField({
      name: 'question',
      title: 'السؤال',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'الإجابة',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    // === تم تعديل هذا الحقل ===
    defineField({
      name: 'category',
      title: 'الفئة',
      type: 'string' // تم حذف جزء options ليصبح حقل نصي عادي
    })
    // === نهاية التعديل ===
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      language: 'language'
    },
    prepare(selection) {
      const { title, subtitle, language } = selection;
      return {
        title: `${title} (${language === 'ar' ? 'العربية' : 'English'})`,
        subtitle: subtitle
      };
    }
  }
});