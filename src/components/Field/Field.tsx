import { useDispatch, useSelector } from 'react-redux';
import Block from '../Block/Block';
import styles from './Field.module.scss'
import { RootState } from '../../store/store';
import { resetGame } from '../../store/gameSlice';
import { useEffect } from 'react';

const Field = () => {

    const ids = useSelector((state: RootState) => state.game.ids);
    const move = useSelector((state: RootState) => state.game.move);
    const finishText = useSelector((state: RootState) => state.game.finishText);
    const isResetGame = useSelector((state: RootState) => state.game.isResetGame);

    const dispatch = useDispatch();

    const handleResetGame = () => {
        dispatch(resetGame())
    }

    useEffect(() => {
        if (resetGame) {
            setTimeout(() => {
                dispatch(resetGame())
            }, 0);
        }
    }, [isResetGame, dispatch])

    return (
        <div className={styles.Field}>
            <div className={styles.Field_game}>
                {
                    ids.map((id) => (
                        <Block
                            key={id}
                            id={id} />
                    ))
                }
            </div>
            {
                move ? <p className={styles.move}>{move}</p> : <p className={styles.finishText}>{finishText}</p>
            }
            <button
                className={styles.button}
                onClick={handleResetGame}
            >
                Начать снова</button>
        </div>
    )
}


export default Field;