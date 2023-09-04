import {Canvas} from "../../components/canvas";
import {OptionsPanel} from "../../components/options-panel";
import {SortContextProvider} from "../../contexts/sort";

export default function SortPage () {
	return (
		<SortContextProvider>
			<Canvas />
			<OptionsPanel />
		</SortContextProvider>
	);
}
