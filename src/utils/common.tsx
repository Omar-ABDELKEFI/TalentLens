import { useState, useEffect } from 'react';
export const removeHtml = (htlmText: string) => {
  let temp = htlmText.replace(/<[^>]+>/g, '');
  temp = temp.replace('&nbsp;', ' ');

  return temp;

};


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export  function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

