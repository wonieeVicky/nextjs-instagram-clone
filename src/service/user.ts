import { client } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  username: string;
};

export async function addUser({ id, username, name, email, image }: OAuthUser) {
  const result = await client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [],
    follwers: [],
    bookmarks: []
  });

  return result;
}

type getFollowingsProps = {
  username: string;
};

export async function getFollowings({ username }: getFollowingsProps) {
  const result = await client.fetch(
    `*[_type == "user" && _username == ${username}][0].following[]->{
      _id,
      username, 
      name, 
      email,
      image
    }`
  );

  return result;
}
