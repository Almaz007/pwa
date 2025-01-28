import { useOscilogramms } from '../../store/store';
import styles from './ChartInfo.module.css';

const ChatInfo = ({ data }) => {
	const { xData, yData } = data.xyData;
	const cursorIndex = useOscilogramms(state => state.cursorIndex);
	// console.log('render chatinfo: ', data.id);
	return (
		<div className={styles['chart__info']}>
			<div className={styles['name']}>name: {data.name}</div>
			<div className={styles['time']}>time: {xData[cursorIndex]}</div>
			<div className={styles['value']}>value: {yData[cursorIndex]}</div>
		</div>
	);
};

export default ChatInfo;
