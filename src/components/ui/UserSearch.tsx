'use client';

import { ProfileUser } from '@/model/user';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import GridSpinner from './GridSpinner';
import UserCard from './UserCard';
import useDebounce from '@/util/hooks';

export default function UserSearch() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword.replace(/\*/g, ''));
  const {
    data: users,
    isLoading,
    error
  } = useSWR<ProfileUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full max-w-2xl my-4 flex flex-col items-center">
      <form className="w-full mb-4" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search for a username or name"
          className="w-full h-12 placeholder:text-neutral-400 placeholder:text-lg border-neutral-400 focus:border-none focus:ring-neutral-500"
          value={keyword}
          autoFocus
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>error</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && <p>No results</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
