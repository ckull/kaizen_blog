import ReactLenis from "@studio-freight/react-lenis"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";

export default function Layout({ children }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);


    return (
        <>
            <ReactLenis root>
                <main>{children}</main>
            </ReactLenis>
        </>
    )
}