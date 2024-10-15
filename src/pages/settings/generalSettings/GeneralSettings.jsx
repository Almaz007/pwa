import { useState } from 'react';
import Indication from '../../../components/indication/Indication';
import NameObject from '../../../components/nameObject/NameObject';
import ChoiseBlock from '../../../components/choiseBlock/ChoiseBlock';
import TabeLayout from '../../../components/tableLayout/TableLayout';

const GeneralSettings = () => {
	const [index, setIndex] = useState('0');

	const elements = {
		0: { text: 'Индикация', element: <Indication /> },
		1: { text: 'Наименование объекта', element: <NameObject /> }
	};

	return (
		<div>
			<ChoiseBlock elements={elements} index={index} setIndex={setIndex} />
			<TabeLayout text={elements['0'].text}>{elements['0'].element}</TabeLayout>
		</div>
	);
};

export default GeneralSettings;
