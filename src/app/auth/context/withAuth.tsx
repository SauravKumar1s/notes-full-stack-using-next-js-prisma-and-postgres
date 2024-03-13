import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from '@/app/hooks/useAuth';

interface WithAuthProps {
  children: React.ReactNode;
}

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: WithAuthProps) => {
    const Router = useRouter();
    const { isAuthenticated } = useAuth(); // Implement this hook based on your authentication logic

    useEffect(() => {
      if (!isAuthenticated) {
        Router.replace('/');
      }
    }, [isAuthenticated, Router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;