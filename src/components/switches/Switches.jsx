import { useState, useMemo } from 'react';
import cn from 'classnames';
import styles from './switches.module.css';
import Toggle from './toggle/Toggle';

const Switches = () => {
	const defaultValues = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0
	};
	const [binaryValues, setBinaryValues] = useState({ ...defaultValues });

	const handleClick = index => {
		setBinaryValues(actual => ({
			...actual,
			[index]: actual[index] === 0 ? 1 : 0
		}));
	};

	const calculatedValue = useMemo(() => {
		const binaryString = Object.values(binaryValues).join('');
		let decimalNumber = parseInt(binaryString, 2);
		let hexString = decimalNumber.toString(16);
		console.log(hexString);

		return hexString;
	}, [binaryValues]);

	return (
		<div>
			<div className={styles['switches__block']}>
				<div className={styles['swictches__row']}>
					{[...new Array(8)].map((_, index) => (
						<Toggle
							key={index}
							index={index}
							binaryValues={binaryValues}
							handleClick={handleClick}
						/>
					))}
				</div>
				<div className={styles['calculate__value']}>
					Value: {calculatedValue}
				</div>
			</div>
			<button
				className={styles['button']}
				onClick={() => setBinaryValues({ ...defaultValues })}
			>
				Сбросить
			</button>
		</div>
	);
};

export default Switches;
