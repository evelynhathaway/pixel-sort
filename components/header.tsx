import styles from "./header.module.scss";
import {Icon} from "./icon";

export const Header = () => {
	return (
		<header className={styles.header}>
			<Icon />
			<h1 className={styles.text}>Pixel Sort</h1>
		</header>
	);
};
