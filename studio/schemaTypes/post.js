export default {
  name: 'post',
  title: 'Work Log Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      // Time aur Date dono ke liye
      name: 'publishedAt',
      title: 'Published Date & Time',
      type: 'datetime', 
    },
    {
      // Text, Images, Videos ke liye
      name: 'body',
      title: 'Body Content (Text, Images, Videos)',
      type: 'blockContent', 
    },
  ],
  // Posts ko sort karna (latest sab se oopar)
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
    },
  },
}