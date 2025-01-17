import { useEffect, useMemo, useState } from 'react';
import Block from '../Block/Block';
import styles from './Field.module.scss'

const Field = () => {

    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const finish = useMemo(() => [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]], []);

    const [playerChange, setPlayerChange] = useState(false);
    const [move, setMove] = useState<string>('')

    const [player1, setPlayer1] = useState<number[]>([]);
    const [player2, setPlayer2] = useState<number[]>([]);


    const [winner, setWinner] = useState<number[] | null>(null);
    const [draw, setDraw] = useState(false);
    const [resetGame, setResetGame] = useState<boolean>(false)

    const [finishText, setFinishText] = useState<string>('');


    useEffect(() => {
        finish.forEach((elem) => {

            if (player1.length >= 3 && elem.every((e) => player1.includes(e))) {
                setWinner(player1)
            }
            if (player2.length >= 3 && elem.every((e) => player2.includes(e))) {
                setWinner(player2)
            }

            if (player1.length === 5 && !winner) {
                setDraw(true);
            }

        })
    }, [player1, player2, draw, winner, finish])

    useEffect(() => {
        if (playerChange === false) {
            setMove('Сейчас ход игрока 1 (O)')
        }
        if (playerChange === true) {
            setMove('Сейчас ход игрока 2 (X)')
        }

        if (winner !== null && playerChange === true) {
            setMove('')
            setFinishText('Победил игрок 1 (O)')

        } if (winner !== null && playerChange === false) {
            setMove('')
            setFinishText('Победил игрок 2 (X)')

        } if (draw && winner === null) {
            setMove('')
            setFinishText('Ничья')
        }

    }, [winner, playerChange, draw])

    const handleResetGame = () => {
        setPlayer1([]);
        setPlayer2([]);
        setPlayerChange(false);
        setWinner(null);
        setResetGame(true);
        setDraw(false)
        setTimeout(() => setResetGame(false), 0);
    };


    return (
        <div className={styles.Field}>
            <div className={styles.Field_game}>
                {
                    ids.map((id) => (
                        <Block
                            key={id}
                            id={id}
                            setPlayer1={setPlayer1}
                            setPlayer2={setPlayer2}
                            playerChange={playerChange}
                            setPlayerChange={setPlayerChange}
                            resetGame={resetGame}
                            winner={winner}
                        />
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