import styles from './menu.module.css';
import SendForm from '../sendForm/SendForm';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Punkt from './menuItems/Punkt';
import Information from './menuItems/Information';
import { api } from '../../shared/api.js';
import { useMenu } from '../../store/store.js';

const useTest = handleClick => {
	const ref = useRef(null);
	ref.current = handleClick;
	return useCallback((...args) => {
		ref.current(...args);
	}, []);
};

const Menu = () => {
	const [text, setText] = useState('');

	const [
		historyChoices,
		fetchHistoryChoices,
		portConnect,
		backToHistoryChoices,
		errMessage,
		addHistoryChoice
	] = useMenu(state => [
		state.historyChoices,
		state.fetchHistoryChoices,
		state.portConnect,
		state.backToHistoryChoices,
		state.errMessage,
		state.addHistoryChoice
	]);
	const handlePort = useTest(handleClick);

	const menu = {
		type: 'punkt',
		childrens: {
			1: {
				type: 'punkt',
				childrens: {
					1.1: {
						type: 'info',
						text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, corporis dignissimos.'
					}
				}
			},
			2: {
				type: 'punkt',
				childrens: {
					2.1: {
						type: 'punkt',
						childrens: {
							'2.1.1': {
								type: 'info',
								text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, corporis dignissimos.'
							},
							'2.1.2': {
								type: 'info',
								text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, corporis dignissimos.'
							}
						}
					}
				}
			},
			3: {
				type: 'punkt',
				childrens: {
					3.1: {
						type: 'info',
						text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, corporis dignissimos.'
					},
					3.2: {
						type: 'info',
						text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, corporis dignissimos.'
					},
					3.3: {
						type: 'info',
						text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, corporis dignissimos.'
					}
				}
			}
		}
	};

	const punkt = useMemo(() => {
		if (historyChoices.length === 0) return menu;

		let choisedPunkt = { ...menu };

		historyChoices.forEach(choice => {
			choisedPunkt = choisedPunkt.childrens[choice.punkt];
		});

		return choisedPunkt;
	}, [historyChoices]);

	const validateText = text => {
		if (punkt.type === 'punkt') {
			return Object.keys(punkt.childrens).includes(text);
		} else {
			return false;
		}
	};

	function handleClick(text) {
		if (text === '-1') {
			backToHistoryChoices();
			return;
		}
		console.log('1.1?: ', text == '1.1');

		if (validateText(text)) {
			console.log('success');
			addHistoryChoice(text);
		}

		setText('');
	}

	useEffect(() => {
		fetchHistoryChoices();
	}, [fetchHistoryChoices]);

	return (
		<div className={styles['menu']}>
			<div>
				<button
					onClick={() => portConnect(handlePort)}
					className={styles['button']}
				>
					порт
				</button>
				<div className={styles['description']}>
					Если хотите пойти на шаг назад введите -1
				</div>
				{punkt.type === 'info' && <Information punkt={punkt} />}
				{punkt.type === 'punkt' && <Punkt punkt={punkt} />}
			</div>
			<div>
				<SendForm
					text={text}
					setText={setText}
					handleClick={() => handleClick(text)}
				/>
				{errMessage && <p className={styles['err__punkt']}>{errMessage}</p>}
			</div>
		</div>
	);
};

export default Menu;
