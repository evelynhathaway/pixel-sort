import {Canvas} from "../../components/canvas.tsx";
import {OptionsPanel} from "../../components/options-panel.tsx";
import {SortContextProvider} from "../../contexts/sort.tsx";

export default function SortPage () {
	return (
		<SortContextProvider>
			<Canvas />
			<OptionsPanel />
		</SortContextProvider>
	);
}
