// socialLinks.ts

import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'socialLinks',
  title: 'إدارة الروابط', // عنوان عام للنوع نفسه
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      title: 'الروابط',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'المنصة',
              type: 'string',
              options: {
                list: [
                  // منصات التواصل الاجتماعي
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Threads', value: 'threads' },
                  { title: 'Snapchat', value: 'snapchat' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'Reddit', value: 'reddit' },
                  // تطبيقات المراسلة
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Telegram', value: 'telegram' },
                  // منصات المطورين والمصممين
                  { title: 'GitHub', value: 'github' },
                  { title: 'Behance', value: 'behance' },
                  { title: 'Dribbble', value: 'dribbble' },
                  // متاجر التطبيقات
                  { title: 'App Store', value: 'app_store' },
                  { title: 'Google Play', value: 'google_play' },
                  // روابط عامة
                  { title: 'رابط تطبيق الموبايل', value: 'mobile_app' },
                  { title: 'رابط تطبيق الكمبيوتر', value: 'desktop_app' },
                  { title: 'رابط تحميل مباشر', value: 'download_link' },
                  { title: 'موقع إلكتروني', value: 'website' },
                  { title: 'أخرى', value: 'other' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required().error('يجب اختيار منصة للرابط'),
            }),
            defineField({
              name: 'url',
              title: 'الرابط (URL)',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({ allowRelative: false }).error('يرجى إدخال رابط صحيح'),
            }),
          ],
          // عرض كل رابط على حدة داخل المستند
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
            },
            prepare({ platform, url }) {
              // خريطة لترجمة قيم المنصات إلى عناوين واضحة
              const platformTitles = {
                youtube: 'YouTube',
                instagram: 'Instagram',
                x: 'X (Twitter)',
                facebook: 'Facebook',
                tiktok: 'TikTok',
                linkedin: 'LinkedIn',
                threads: 'Threads',
                snapchat: 'Snapchat',
                pinterest: 'Pinterest',
                reddit: 'Reddit',
                whatsapp: 'WhatsApp',
                telegram: 'Telegram',
                github: 'GitHub',
                behance: 'Behance',
                dribbble: 'Dribbble',
                app_store: 'App Store',
                google_play: 'Google Play',
                mobile_app: 'تطبيق الموبايل',
                desktop_app: 'تطبيق الكمبيوتر',
                download_link: 'رابط تحميل مباشر',
                website: 'موقع إلكتروني',
                other: 'أخرى',
              };

              const displayTitle = platformTitles[platform] || platform;

              return {
                title: `رابط ${displayTitle}`,
                subtitle: url,
              };
            },
          },
        }),
      ],
    }),
  ],
  // هنا التعديل الأهم: جعل عنوان المستند نفسه ديناميكيًا
  preview: {
    select: {
      links: 'links', // اختيار مصفوفة الروابط بأكملها
    },
    prepare({ links }) {
      // التحقق من وجود روابط
      if (!links || links.length === 0) {
        return {
          title: 'لا توجد روابط بعد',
          subtitle: 'اضغط لإضافة روابط جديدة',
        };
      }

      // نفس خريطة الترجمة لضمان التناسق
      const platformTitles = {
        youtube: 'YouTube',
        instagram: 'Instagram',
        x: 'X (Twitter)',
        facebook: 'Facebook',
        tiktok: 'TikTok',
        linkedin: 'LinkedIn',
        threads: 'Threads',
        snapchat: 'Snapchat',
        pinterest: 'Pinterest',
        reddit: 'Reddit',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        github: 'GitHub',
        behance: 'Behance',
        dribbble: 'Dribbble',
        app_store: 'App Store',
        google_play: 'Google Play',
        mobile_app: 'تطبيق الموبايل',
        desktop_app: 'تطبيق الكمبيوتر',
        download_link: 'رابط تحميل مباشر',
        website: 'موقع إلكتروني',
        other: 'أخرى',
      };

      // استخراج عناوين المنصات من كل رابط في المصفوفة
      const linkTitles = links
        .map(link => platformTitles[link.platform] || link.platform)
        .filter(Boolean); // إزالة أي قيم فارغة

      // دمج العناوين في سلسلة نصية واحدة
      const title = linkTitles.join(', ');

      return {
        title: title || 'روابط', // عنوان ديناميكي
        subtitle: `${links.length} رابط/روابط`, // عدد الروابط كعنوان فرعي
      };
    },
  },
});