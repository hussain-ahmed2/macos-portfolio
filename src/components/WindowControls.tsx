import type { WindowKey } from "@/constants";
import useWindowStore from "@/store/window";

type Props = {
	target: WindowKey;
};

const WindowControls = ({ target }: Props) => {
	const { closeWindow } = useWindowStore();

	return (
		<div id="window-controls">
			<div className="close" onClick={() => closeWindow(target)} />
			<div className="minimize" />
			<div className="maximize" />
		</div>
	);
};
export default WindowControls;
