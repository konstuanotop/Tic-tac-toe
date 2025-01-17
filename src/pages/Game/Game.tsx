import Field from '../../components/Field/Field';
import styles from './Game.module.scss'

const Game = () => {
    return (
        <div className={styles.Field}>
            <h1>Игровое поле </h1>
            <Field />
        </div>
    )
}

export default Game;