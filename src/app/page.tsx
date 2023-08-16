import { createClient } from 'next-sanity';

export default function Home({ ...props }) {
  return <h1 className="text-gray-900"></h1>;
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-08-14',
  useCdn: false
});

// get client from sanity
export async function getStatucProps() {
  const pet = await client.fetch(`*[_type == "pet"]`);
  return {
    props: { pet }
  };
}
