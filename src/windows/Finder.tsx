import { WindowControls } from "@/components";
import { locations, type Location, type WindowKey } from "@/constants";
import WindowWrapper from "@/hoc/WindowWrapper";
import useLocationStore from "@/store/loaction";
import useWindowStore from "@/store/window";
import clsx from "clsx";
import { Search } from "lucide-react";

const Finder = () => {
	const { openWindow } = useWindowStore();
	const { activeLocation, setActiveLocation } = useLocationStore();

	const openItem = (item: Location) => {
		if (item.fileType === "pdf") return openWindow("resume");
		if (item.kind === "folder") return setActiveLocation(item);
		if (["fig", "url"].includes(item?.fileType || "") && item.href) return window.open(item.href, "_blank");

		if (item.fileType && item.kind) {
			const windowKey = `${item.fileType}${item.kind}` as WindowKey;
			openWindow(windowKey, item);
		}
	};

	const renderList = (name: string, items: Location[]) => (
		<div>
			<h3>{name}</h3>
			<ul>
				{items.map((item) => (
					<li
						key={item.id}
						onClick={() => setActiveLocation(item)}
						className={clsx(item.id === activeLocation?.id ? "active" : "not-active")}
					>
						<img src={item.icon} alt={item.name} className="w-4" />
						<p className="text-sm font-medium truncate">{item.name}</p>
					</li>
				))}
			</ul>
		</div>
	);

	return (
		<>
			<div id="window-header">
				<WindowControls target="finder" />
				<Search className="icon" />
			</div>

			<div className="bg-white flex h-full">
				<div className="sidebar">
					{renderList("Favorites", Object.values(locations))}
					{renderList("Work", locations.work.children ?? [])}
				</div>

				<ul className="content">
					{activeLocation?.children?.map((item) => (
						<li key={item.id} className={item.position} onClick={() => openItem(item)}>
							<img src={item.icon} alt={item.name} />
							<p>{item.name}</p>
						</li>
					)) || ""}
				</ul>
			</div>
		</>
	);
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
