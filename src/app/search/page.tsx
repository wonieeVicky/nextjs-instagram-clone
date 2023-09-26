'use client';

import GridSpinner from '@/components/ui/GridSpinner';
import UserList from '@/components/ui/UserList';
import { DetailUser } from '@/model/user';
import { useState } from 'react';
import useSWR from 'swr';

export default function SearchPage() {
  const [value, setValue] = useState<undefined | string>(undefined);
  const [type, setType] = useState<'all' | 'search'>('all');

  // fetch UserList from /api/users API with params
  const { data, isLoading: loading } = useSWR<DetailUser[]>(
    `/api/users?type=${type}&value=${value}`
  );

  return (
    <section className="w-full max-w-screen-xl mx-auto">
      <div className="block p-5 max-w-screen-md mx-auto">
        <input
          type="text"
          placeholder="Search for a username or name"
          className="w-full h-12 placeholder:text-neutral-400 placeholder:text-lg border-neutral-400 focus:border-none focus:ring-neutral-500"
          onKeyUp={(e) => {
            if (!e.currentTarget.value.trim()) {
              setType('all');
              return;
            }
            setValue(e.currentTarget.value);
            setType('search');
          }}
        />
      </div>
      {loading && (
        <div className="text-center mt-32">
          <GridSpinner />
        </div>
      )}
      {data && <UserList list={data} />}
    </section>
  );
}
