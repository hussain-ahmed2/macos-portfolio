import { WindowControls } from "@/components";
import type { Location } from "@/constants";
import WindowWrapper from "@/hoc/WindowWrapper";
import useWindowStore from "@/store/window";

const Image = () => {
	const { windows } = useWindowStore();
	const data = windows.imgfile?.data;

	if (!data) return null;

	const { imageUrl, name } = data as Location;

	return (
		<>
			<div id="window-header">
				<WindowControls target="imgfile" />
				<h2>{name}</h2>
			</div>

			<div className="p-5 bg-white">
				{imageUrl ? (
					<div className="w-full">
						<img src={imageUrl} alt={name} className="w-full h-auto max-h-[70vh] object-contain rounded" />
					</div>
				) : null}
			</div>
		</>
	);
};

const ImageWindow = WindowWrapper(Image, "imgfile");
export default ImageWindow;
