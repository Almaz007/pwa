import { useState } from 'react';
import CurrentValuesAnalogSignals from '../../components/currentValuesAnalogSignals/CurrentValuesAnalogSignals';
import CurrentValuesDiscreteSignals from '../../components/CurrentValuesDiscreteSignals/CurrentValuesDiscreteSignals';
import TabeLayout from '../../components/tableLayout/TableLayout';
import ChoiseBlock from '../../components/choiseBlock/ChoiseBlock';

const Monitoring = () => {
	const [index, setIndex] = useState('0');

	const elements = {
		0: {
			text: 'Текущие величины аналоговых сигналов',
			element: <CurrentValuesAnalogSignals />
		},
		1: {
			text: 'Текущие значения дискретных сигналов',
			element: <CurrentValuesDiscreteSignals />
		}
	};

	return (
		<div>
			<ChoiseBlock elements={elements} index={index} setIndex={setIndex} />
			<TabeLayout text={elements[index].text}>
				{elements[index].element}
			</TabeLayout>
		</div>
	);
};

export default Monitoring;
