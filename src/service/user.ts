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

export async function getUserByUsername(username: string) {
  const result = await client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      following[]->{
        username, image
      },
      followers[]->{
        username, image
      },
      "bookmarks": bookmarks[]->_id
    }`
  );

  return result;
}

// get all user list
export async function getAllUsers() {
  const result = await client.fetch(
    `*[_type == "user"]{
      ...,
      "id": _id,
      following[]->{
        username, image
      },
      followers[]->{
        username, image
      },
      "bookmarks": bookmarks[]->_id
    }`
  );

  return result;
}
