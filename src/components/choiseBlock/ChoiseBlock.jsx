import styles from './choiseBlock.module.css';
import cn from 'classnames';

const ChoiseBlock = ({ elements, index, setIndex }) => {
	return (
		<div className={styles['choise__block']}>
			{Object.entries(elements).map(item => (
				<div
					key={item[0]}
					className={cn(styles['table__item'], {
						[styles['active']]: item[0] === index
					})}
					onClick={() => setIndex(item[0])}
				>
					{item[1].text}
				</div>
			))}
		</div>
	);
};

export default ChoiseBlock;
