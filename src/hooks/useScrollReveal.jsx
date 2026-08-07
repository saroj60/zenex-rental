import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // Wait a brief moment to allow React to render the DOM
    const timeoutId = setTimeout(() => {
      const reveals = document.querySelectorAll('.reveal');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              // Optional: Stop observing once revealed to only animate once
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.15, // Trigger when 15% of the element is visible
        }
      );

      reveals.forEach((reveal) => {
        observer.observe(reveal);
      });

      return () => {
        reveals.forEach((reveal) => observer.unobserve(reveal));
      };
    }, 100); // 100ms delay to ensure elements are in the DOM

    return () => clearTimeout(timeoutId);
  }, [location.pathname]); // Re-run whenever the route changes
};

export default useScrollReveal;
