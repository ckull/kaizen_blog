import ReactLenis from "@studio-freight/react-lenis"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
import Transition from "@/components/Transition";
import { useRouter } from "next/router";
export default function Layout({ children }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    const router = useRouter()


    return (
        <>
            <ReactLenis root>
                <Transition location={router.pathname}>
                    <main>{children}</main>
                </Transition>
            </ReactLenis>
        </>
    )
}