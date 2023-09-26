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
export async function getUsers(type: 'all' | 'search', data?: string) {
  if (type === 'all') {
    return await client.fetch(
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
  }
  // return search username or name & data is search query
  return await client.fetch(
    `*[_type == "user" && (username match "${data}*" || name match "${data}*") ]{
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
}
