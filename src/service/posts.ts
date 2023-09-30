import { SimplePost } from '@/model/post';
import { client, urlFor } from './sanity';

const simplePostProjection = `
  ...,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": count(comments),
  "id": _id,
  "createdAt": _createdAt,
`;

export async function getFollowingPostsOf(username: string) {
  const result = await client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
        || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
        | order(_createdAt desc){${simplePostProjection}}`
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
    );

  return result;
}

export async function getPost(id: string) {
  const result = await client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
        ...,
        "username": author->username,
        "userImage": author->image,
        "image": photo,
        "likes": likes[]->username,
        comments[]{comment, "username": author->username, "image": author->image},
        "id": _id,
        "createdAt": _createdAt,
      }`
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));

  return result;
}

// get posts, saved posts, liked posts
export async function getPostsOf(username: string) {
  const parallelCall = [];
  const posts = await client.fetch(
    `*[_type == "post" && author->username == "${username}"] | order(_createdAt desc){${simplePostProjection}}`
  );
  const savedPosts = await client.fetch(
    `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]] | order(_createdAt desc){${simplePostProjection}}`
  );
  const likedPosts = await client.fetch(
    `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].likes[]] | order(_createdAt desc){${simplePostProjection}}`
  );

  parallelCall.push(posts, savedPosts, likedPosts);
  await Promise.all(parallelCall);

  return { posts, savedPosts, likedPosts };
}
