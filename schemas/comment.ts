// schemas/comment.ts

import { defineType, defineField, PreviewValue } from 'sanity'

// --- تعريف الأنواع (Types) لقسم المعاينة (Preview) ---
// هذا يضمن أن البيانات المستخدمة في دالة prepare من النوع الصحيح
interface CommentPreviewSelection {
  content?: string;
  userFirstName?: string;
  userImageUrl?: string;
  name?: string;
}

// هذا يحدد شكل الكائن الذي يجب أن ترجعه دالة prepare
interface CommentPreviewResult {
  title: string;
  subtitle: string;
  media: { src: string } | null;
}

export default defineType({
  name: 'comment',
  title: 'Comment | تعليق',
  type: 'document',
  fields: [
    // --- حقول المستخدم من نظام التوثيق (مثل Clerk) ---
    defineField({
      name: 'userId',
      title: 'User ID | معرف المستخدم',
      type: 'string',
      description: 'ID of the user from the authentication system | معرف المستخدم من نظام التوثيق'
    }),
    defineField({
      name: 'userFirstName',
      title: 'User First Name | الاسم الأول للمستخدم',
      type: 'string',
      description: 'First name from the authentication system | الاسم الأول من نظام التوثيق'
    }),
    defineField({
      name: 'userLastName',
      title: 'User Last Name | اسم العائلة للمستخدم',
      type: 'string',
      description: 'Last name from the authentication system | اسم العائلة من نظام التوثيق'
    }),
    defineField({
      name: 'userImageUrl',
      title: 'User Image URL | رابط صورة المستخدم',
      type: 'url',
      description: 'Profile image URL from the authentication system | رابط صورة الملف الشخصي من نظام التوثيق'
    }),

    // --- حقول بديلة للمستخدمين غير المسجلين ---
    defineField({
      name: 'name',
      title: 'Name | الاسم',
      type: 'string',
      description: 'Name of the commenter (used if user is not logged in) | اسم المعلق (يُستخدم إذا لم يقم المستخدم بتسجيل الدخول)'
    }),
    defineField({
      name: 'email',
      title: 'Email | البريد الإلكتروني',
      type: 'string',
      description: 'Email of the commenter (used if user is not logged in) | بريد المعلق الإلكتروني (يُستخدم إذا لم يقم المستخدم بتسجيل الدخول)',
      validation: (Rule) => Rule.email().error('Please enter a valid email address | يرجى إدخال بريد إلكتروني صحيح')
    }),

    // --- محتوى التعليق ---
    defineField({
      name: 'content',
      title: 'Content | المحتوى',
      type: 'text',
      validation: (Rule) => Rule.required().error('Comment content is required | المحتوى مطلوب')
    }),

    // --- ارتباط التعليق بالمحتوى ---
    defineField({
      name: 'episode',
      title: 'Episode | حلقة',
      type: 'reference',
      to: [{ type: 'episode' }],
      description: 'The episode this comment is associated with | الحلقة المرتبطة بهذا التعليق'
    }),
    defineField({
      name: 'article',
      title: 'Article | مقال',
      type: 'reference',
      to: [{ type: 'article' }],
      description: 'The article this comment is associated with | المقال المرتبط بهذا التعليق'
    }),

    // --- للردود على التعليقات ---
    defineField({
      name: 'parentComment',
      title: 'Parent Comment | التعليق الأصل',
      type: 'reference',
      to: [{ type: 'comment' }],
      description: 'Reference to the parent comment for threaded replies | مرجع للتعليق الأصل للردود المتسلسلة'
    }),

    // --- تاريخ الإنشاء ---
    defineField({
      name: 'createdAt',
      title: 'Created At | تاريخ الإنشاء',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required()
    })
  ],

  // --- قواعد التحقق من الصحة ---
  validation: (Rule) =>
    Rule.custom((fields) => {
      const hasEpisode = fields?.episode;
      const hasArticle = fields?.article;

      if (!hasEpisode && !hasArticle) {
        return 'A comment must be linked to either an episode or an article. | يجب ربط التعليق بحلقة أو مقال.';
      }
      if (hasEpisode && hasArticle) {
        return 'A comment cannot be linked to both an episode and an article simultaneously. | لا يمكن ربط التعليق بحلقة ومقال في نفس الوقت.';
      }
      return true;
    }),

  // --- عرض مخصص في قائمة المحتوى (نسخة TypeScript النهائية) ---
  preview: {
    select: {
      content: 'content',
      userFirstName: 'userFirstName',
      userImageUrl: 'userImageUrl',
      name: 'name',
    },
    // **إضافة الأنواع (Types) هنا**
    prepare(selection: CommentPreviewSelection): CommentPreviewResult {
      const { content, userFirstName, userImageUrl, name } = selection;

      // تحديد الاسم الذي سيتم عرضه (اسم المستخدم أو الاسم البديل)
      const displayName = userFirstName || name || 'Anonymous';

      return {
        title: content ? `${content.substring(0, 50)}...` : 'No content',
        subtitle: `by ${displayName}`,
        // الإصلاح الرئيسي: تحويل الرابط إلى كائن وسائط صالح
        media: userImageUrl ? { src: userImageUrl } : null,
      };
    }
  }
})