import styles from './menuItems.module.css';

const Punkt = ({ punkt }) => {
	return (
		<ul>
			<ul className={styles['menu__items']}>
				{Object.keys(punkt.childrens).map(key => (
					<li className={styles['punktItem']} key={key}>
						{key + ' какой-нибудь текст'}
					</li>
				))}
			</ul>
		</ul>
	);
};

export default Punkt;
