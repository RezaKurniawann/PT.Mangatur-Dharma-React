import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function useLenis() {
  const lenisRef = useRef(null);

  if (!lenisRef.current) {
    lenisRef.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      prevent: (node) => node.id === "modal",
    });
  }

  useEffect(() => {
    const lenis = lenisRef.current;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef.current;
}
