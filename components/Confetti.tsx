
import React, { useEffect } from 'react';

const Confetti: React.FC = () => {
  useEffect(() => {
    // We could use an external library like canvas-confetti here,
    // but for simplicity, we'll create a lightweight custom trigger
    // that the user can fire.
  }, []);

  return null;
};

export default Confetti;
