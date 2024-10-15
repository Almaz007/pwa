import { useState } from 'react';

import DefinitionMfKz from './definitionMfKz/DefinitionMfKz';
import DefinitionOzz from './definitionOzz/DefinitionOzz';
import IceFormation from './iceFormation/IceFormation';
import ChoiseBlock from '../../components/choiseBlock/ChoiseBlock';
import TabeLayout from '../../components/tableLayout/TableLayout';

const Setpoints = () => {
	const [index, setIndex] = useState('0');

	const elements = {
		0: {
			text: 'Определение МФ КЗ',
			element: <DefinitionMfKz />
		},
		1: {
			text: 'Опредление ОЗЗ',
			element: <DefinitionOzz />
		},
		2: {
			text: 'Голеледообразование',
			element: <IceFormation />
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

export default Setpoints;
