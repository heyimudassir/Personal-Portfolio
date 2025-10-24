import { createClient } from '@sanity/client';

export default createClient({
  // 'studio/sanity.json' se apni Project ID yahan paste karein
  projectId: 'qh4h53pa', 
  
  dataset: 'production', // Yeh 'production' hi rahega
  useCdn: true, // true rakhein taake data fast load ho
  apiVersion: '2024-10-24', // Aaj ki date ya latest API version
});