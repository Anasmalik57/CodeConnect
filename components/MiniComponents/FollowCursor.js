"use client";
import { useMotionValue, useSpring, motion } from "framer-motion";
import { useEffect } from "react";
const FollowCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);
  return (
    <>
      {/* Magical Cursor */}
      <motion.div
        className="fixed top-0 left-0 size-12 border-2  border-white  bg-radial-[at_25%_25%] from-blue-400 to-emerald-900 to-75%  rounded-full pointer-events-none z-50 mix-blend-screen opacity-70 blur-xs cursor-pointer "
        style={{ translateX: cursorXSpring, translateY: cursorYSpring }}
      />
    </>
  );
};

export default FollowCursor;
