"use client"
import { useEffect, useState } from 'react';
import { useUser as useClerkUser } from '@clerk/nextjs';
import { User } from '@/types/types';


export function useCurrentUser() {
  const { isLoaded, isSignedIn, user: clerkUser } = useClerkUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoaded || !isSignedIn) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('/api/user/current-user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // If using cookies
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setCurrentUser(data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isLoaded, isSignedIn, clerkUser?.id]); // Re-fetch when Clerk user changes

  return {
    user: currentUser,
    clerkUser,
    isLoading: loading,
    isSignedIn,
    error,
    isLoaded, // From Clerk
  };
}