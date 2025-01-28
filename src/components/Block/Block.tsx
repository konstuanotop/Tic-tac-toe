import { useEffect, } from 'react';
import styles from './Block.module.scss'
import circle from '../../assets/img/circle.png'
import x from '../../assets/img/X.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { playerChoise, resetBlock } from '../../store/gameSlice';


const Block: React.FC<{ id: number }> = ({ id }) => {

    const playerChange = useSelector((state: RootState) => state.game.playerChange);
    const isResetGame = useSelector((state: RootState) => state.game.isResetGame);
    const winner = useSelector((state: RootState) => state.game.winner);
    const blocks = useSelector((state: RootState) => state.game.blocks);

    const dispatch = useDispatch();

    const handlePlayerChoise = () => {
        dispatch(playerChoise({ id, playerChange }))
    }

    useEffect(() => {
        if (isResetGame) {
            dispatch(resetBlock(id))
        }
    }, [isResetGame, dispatch, id])

    const block = blocks[id] || { isDisabled: false, select: null }


    return (
        <button
            className={`${styles.Block} ${block.select === 'circle' ? styles.circleSelected : ''} ${block.select === 'x' ? styles.xSelected : ''}`}
            disabled={block.isDisabled || winner !== null}
            onClick={() => handlePlayerChoise()}
        >
            {block.select === 'circle' && <img src={circle} alt="Circle" />}
            {block.select === 'x' && <img src={x} alt="X" />}
        </button>
    )
}

export default Block;