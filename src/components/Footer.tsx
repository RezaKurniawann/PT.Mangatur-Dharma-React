import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Footer() {
  const [show, setShow] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const handleMouseMove = (e: MouseEvent): void => {
      const windowHeight: number = window.innerHeight;
      const triggerZone: number = windowHeight - 80;

      if (e.clientY >= triggerZone) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return (): void => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.footer
      initial={{ y: "100%" }}
      animate={{ y: show ? "0%" : "100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed bottom-0 left-0 w-full bg-[#003138] text-white text-center h-[4vh] z-50"
    >
      <div className=" container mx-auto h-full flex items-center justify-center px-10">
        <p className="text-xs md:text-sm leading-none">
          © 2026 PT Mangatur Dharma
        </p>
      </div>
    </motion.footer>
  );
}
