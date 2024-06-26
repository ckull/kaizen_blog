import useScroll from "@/hooks/useScroll"
import { useLenis } from "@studio-freight/react-lenis"
import {
    Transition as ReactTransition,
    TransitionGroup,
} from "react-transition-group"
const TIMEOUT = 200

const getTransitionStyles = {
    entering: {
        position: `absolute`,
        opacity: 0,
        transform: `translateY(20px)`,
    },
    entered: {
        transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
        opacity: 1,
        transform: `translateY(0px)`,
        // animation: ".3s linear 2",
    },
    exiting: {
        transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
        opacity: 0,
        transform: `translateY(-20px)`,
    },
}

const Transition = ({
    children,
    location,
}) => {

    const scrollY = useScroll()
    const lenis = useLenis()
    return (
        <TransitionGroup style={{ position: "relative" }}>
            <ReactTransition
                key={location}
                timeout={{
                    enter: TIMEOUT,
                    exit: TIMEOUT,
                }}
                onExit={(node) => {
                    lenis.scrollTo(scrollY, {
                        immediate: true
                    })
                }}
            >
                {(status) => (
                    <div
                        style={{
                            ...getTransitionStyles[status],
                        }}
                    >
                        {children}
                    </div>
                )}
            </ReactTransition>
        </TransitionGroup>
    )
}
export default Transition