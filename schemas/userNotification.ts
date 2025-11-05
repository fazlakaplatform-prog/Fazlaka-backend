// schemas/notification.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title (Arabic)',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'titleEn',
      title: 'Title (English)',
      type: 'string'
    }),
    defineField({
      name: 'message',
      title: 'Message (Arabic)',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'messageEn',
      title: 'Message (English)',
      type: 'text'
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Success', value: 'success' },
          { title: 'Warning', value: 'warning' },
          { title: 'Error', value: 'error' }
        ]
      },
      initialValue: 'info'
    }),
    defineField({
      name: 'relatedId',
      title: 'Related ID',
      type: 'string'
    }),
    defineField({
      name: 'relatedType',
      title: 'Related Type',
      type: 'string',
      options: {
        list: [
          { title: 'Episode', value: 'episode' },
          { title: 'Article', value: 'article' },
          { title: 'Playlist', value: 'playlist' },
          { title: 'Season', value: 'season' }
        ]
      }
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (Arabic)',
      type: 'image'
    }),
    defineField({
      name: 'imageUrlEn',
      title: 'Image URL (English)',
      type: 'image'
    }),
    defineField({
      name: 'isRead',
      title: 'Is Read',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: 'readAt',
      title: 'Read At',
      type: 'datetime'
    }),
    defineField({
      name: 'actionUrl',
      title: 'Action URL',
      type: 'string'
    }),
    defineField({
      name: 'actionText',
      title: 'Action Text (Arabic)',
      type: 'string'
    }),
    defineField({
      name: 'actionTextEn',
      title: 'Action Text (English)',
      type: 'string'
    })
  ],
  preview: {
    select: {
      title: 'title',
      titleEn: 'titleEn',
      message: 'message',
      messageEn: 'messageEn',
      isRead: 'isRead',
      createdAt: 'createdAt'
    },
    prepare({ title, titleEn, message, messageEn, isRead, createdAt }) {
      return {
        title: title || titleEn || 'Untitled',
        subtitle: `${isRead ? 'Read' : 'Unread'} - ${new Date(createdAt).toLocaleDateString()}`
      };
    }
  }
});