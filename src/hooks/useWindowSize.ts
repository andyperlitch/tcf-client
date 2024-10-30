import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    function handleResize() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200); // Adjust the debounce delay as needed
    }

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handler right away to set initial size
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
