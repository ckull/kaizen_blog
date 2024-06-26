import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { wrapLines } from "@/utils/text";
const useTextLinesReveal = () => {
  const animationElemsRef = useRef([]);
  const splitTypeInstancesRef = useRef([]);
  const tlRef = useRef();

  const initializeSplitType = useCallback(() => {
    // Clear previous instances
    splitTypeInstancesRef.current.forEach((instance) => instance.revert());
    splitTypeInstancesRef.current = [];

    // Select elements and initialize SplitType
    animationElemsRef.current = document.querySelectorAll(".anim");
    animationElemsRef.current.forEach((el) => {
      const splitTypeInstance = new SplitType(el, { types: "lines" });
      wrapLines(splitTypeInstance.lines, "div", "oh");
      splitTypeInstancesRef.current.push(splitTypeInstance);
    });
  }, []);

  const animateLines = useCallback(() => {
    // Kill previous timeline if it exists
    if (tlRef.current) tlRef.current.kill();

    // Create new timeline
    tlRef.current = gsap.timeline();

    splitTypeInstancesRef.current.forEach((instance) => {
      tlRef.current.fromTo(
        instance.lines,
        {
          y: "180%",
          rotate: -2,
          rotationX: -120,
          transformOrigin: "center 5% -80px",
        },
        {
          y: "0%",
          rotationX: 0,
          rotate: 0,
          stagger: 0.04,
          duration: 2,
          delay: 0.4,
          ease: "power3.out",
        }
      );
    });
  }, []);

  const revealLines = useCallback(() => {
    initializeSplitType();
    animateLines();
  }, [initializeSplitType, animateLines]);

  useEffect(() => {
    const handleResize = () => {
      revealLines();
    };

    // Initial setup
    revealLines();

    // Event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
      splitTypeInstancesRef.current.forEach((instance) => instance.revert());
      if (tlRef.current) tlRef.current.kill();
    };
  }, [revealLines]);

  return { revealLines };
};

export default useTextLinesReveal;
