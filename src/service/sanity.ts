import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-08-27',
  useCdn: true,
  token: process.env.SANITY_TOKEN
});

type User = {
  email: string;
  image: string;
  name: string;
  username: string;
  _type: 'user';
  _id: string;
};

export async function createUser(user: User) {
  const result = await client
    .createIfNotExists(user)
    .then((res) => console.log(res));
  return result;
}
