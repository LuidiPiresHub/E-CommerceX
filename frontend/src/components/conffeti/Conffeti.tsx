import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function Conffeti() {
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const detectResize = () => setScreenSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener('resize', detectResize);

    return () => {
      window.removeEventListener('resize', detectResize);
    };
  }, [screenSize]);

  return <Confetti width={screenSize.width} height={screenSize.height} />;
}
