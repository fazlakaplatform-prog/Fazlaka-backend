// Import all schema types
import episode from './episode'
import season from './season'
import article from './article'
import comment from './comment'
import favorite from './favorite'
import playlist from './playlist'
import teamMember from './teamMember'
import faqSchema from './faq';
import terms from './termsContent';
import privacy from './privacyContent';
import heroSlider from './heroSlider';
import socialLinks from './socialLinks';
import user from './user';
import userNotification from './userNotification';

// Then export them as an array
export const schemaTypes = [
  episode,
  season,
  article,
  comment,
  favorite,
  playlist,
  teamMember,
  faqSchema,
  terms,
  privacy,
  heroSlider,
  socialLinks,
  user,
  userNotification
]