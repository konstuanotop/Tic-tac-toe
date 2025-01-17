import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Block.module.scss'
import circle from '../../assets/img/circle.png'
import x from '../../assets/img/X.png'


interface BlockProps {
    id: number;
    playerChange: boolean;
    setPlayer1: React.Dispatch<React.SetStateAction<number[]>>;
    setPlayer2: React.Dispatch<React.SetStateAction<number[]>>;
    setPlayerChange: Dispatch<SetStateAction<boolean>>;
    resetGame: boolean;
    winner: number[] | null;
}

const Block: React.FC<BlockProps> = ({ id, playerChange, setPlayer1, setPlayer2, setPlayerChange, resetGame, winner }) => {

    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [select, setSelect] = useState<string | null>(null)

    const playerChoice = (id: number, playerChange: boolean) => {
        if (playerChange === false) {
            setPlayer1((prev) => ([...prev, id]))
            setSelect('circle');

        } else {
            setPlayer2((prev) => ([...prev, id]))
            setSelect('x')
        }

        setPlayerChange(!playerChange);
        setIsDisabled(!isDisabled)
    }

    useEffect(() => {
        if (resetGame) {
            setIsDisabled(false);
            setSelect(null);
        }
    }, [resetGame])

    return (
        <button
            className={`${styles.Block} ${select === 'circle' ? styles.circleSelected : ''} ${select === 'x' ? styles.xSelected : ''}`}
            disabled={isDisabled || winner !== null}
            onClick={() => playerChoice(id, playerChange)}
        >
            {select === 'circle' && <img src={circle} alt="Circle" />}
            {select === 'x' && <img src={x} alt="X" />}
        </button>
    )
}

export default Block;