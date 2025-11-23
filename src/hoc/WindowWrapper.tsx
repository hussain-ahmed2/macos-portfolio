import type { WindowKey } from "@/constants";
import useWindowStore from "@/store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useLayoutEffect, useRef } from "react";

type Props = Record<string, unknown>;

const WindowWrapper = (Component: React.FC, windowKey: WindowKey) => {
	const Wrapped = (props: Props) => {
		const { windows, focusWindow } = useWindowStore();
		const { zIndex, isOpen } = windows[windowKey];
		const ref = useRef<HTMLElement>(null);

		useGSAP(() => {
			const el = ref.current;
			if (!el || !isOpen) return () => {};

			el.style.display = "block";

			gsap.fromTo(
				el,
				{ scale: 0.8, opacity: 0, y: 40 },
				{ scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
			);
		}, [isOpen]);

		useGSAP(() => {
			const el = ref.current;
			if (!el) return;

			const [instance] = Draggable.create(el, { onPress: () => focusWindow(windowKey) });

			return () => {
				instance.kill();
			};
		}, []);

		useLayoutEffect(() => {
			const el = ref.current;
			if (!el) return;

			el.style.display = isOpen ? "block" : "none";
		}, [isOpen]);

		return (
			<section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
				<Component {...props} />
			</section>
		);
	};

	Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

	return Wrapped;
};
export default WindowWrapper;
