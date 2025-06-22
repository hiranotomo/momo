import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const location = useLocation();

  useEffect(() => {
    // Add page transition class
    document.body.classList.add('page-transitioning');
    
    // Remove class after animation
    const timeout = setTimeout(() => {
      document.body.classList.remove('page-transitioning');
    }, 300);

    return () => clearTimeout(timeout);
  }, [location.pathname]);
};