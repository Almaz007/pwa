import SendForm from '../../sendForm/SendForm';
import Information from './Information';
import styles from './menu.module.css';
import Punkt from './Punkt';

const MenuBle = () => {

    const [connect] = useBluetoothState(state => [state.connect])

    return ( <div className={styles['menu']}>
        <div>
            <button
                onClick={connect}
                className={styles['button']}
            >
                поиск ble
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
); );
}
 
export default MenuBle;