import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: 'oxqbemzi',
  dataset: 'production',
  apiVersion: '2023-09-03',
  useCdn: false,
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

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}
//'https://myProjectId.api.sanity.io/v2021-06-07/assets/images/myDataset'
export const assetsURL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${process.env.SANITY_DATASET}`;
