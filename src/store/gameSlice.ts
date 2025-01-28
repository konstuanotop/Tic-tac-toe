import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GameState {
   ids: number[];
   finish: number[][];
   playerChange: boolean;
   move: string;
   player1: number[];
   player2: number[];
   winner: number[] | null;
   draw: boolean;
   isResetGame: boolean;
   finishText: string;
   blocks: { [key: number]: { isDisabled: boolean; select: string | null } };
}

const initialState: GameState = {
   ids: [1, 2, 3, 4, 5, 6, 7, 8, 9],
   finish: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]],
   playerChange: false,
   move: 'Сейчас ход игрока 1 (О)',
   player1: [],
   player2: [],
   winner: null,
   draw: false,
   isResetGame: false,
   finishText: '',
   blocks: {}
};

const gameSlice = createSlice({
   name: 'game',
   initialState,
   reducers: {
      setPlayerChange: (state, action: PayloadAction<boolean>) => {
         state.playerChange = action.payload;
      },
      setMove: (state, action: PayloadAction<string>) => {
         state.move = action.payload;
      },
      setPlayer1: (state, action: PayloadAction<number[]>) => {
         state.player1 = action.payload;
      },
      setPlayer2: (state, action: PayloadAction<number[]>) => {
         state.player2 = action.payload;
      },
      setWinner: (state, action: PayloadAction<number[] | null>) => {
         state.winner = action.payload;
      },
      setDraw: (state, action: PayloadAction<boolean>) => {
         state.draw = action.payload;
      },
      setFinishText: (state, action: PayloadAction<string>) => {
         state.finishText = action.payload;
      },
      resetGame: (state) => {
         state.playerChange = false;
         state.move = 'Сейчас ход игрока 1 (О)';
         state.player1 = [];
         state.player2 = [];
         state.winner = null;
         state.draw = false;
         state.isResetGame = true;
         state.finishText = '';
         state.blocks = {};
      },
      playerChoise: (state, action: PayloadAction<{ id: number; playerChange: boolean }>) => {
         const { id, playerChange } = action.payload;
         if (playerChange === false) {
            state.player1.push(id);
            state.blocks[id] = { isDisabled: true, select: 'circle' }
         } else {
            state.player2.push(id);
            state.blocks[id] = { isDisabled: true, select: 'x' }
         }

         state.playerChange = !playerChange;
         finishGame(state);
         playerMove(state);
         finishGameText(state);
      },
      resetBlock: (state, action: PayloadAction<number>) => {
         state.blocks[action.payload] = { isDisabled: false, select: null }
      }
   },
});

const finishGame = (state: GameState) => {
   state.finish.forEach((elem) => {
      if (state.player1.length >= 3 && elem.every((e) => state.player1.includes(e))) {
         state.winner = state.player1;
      }
      if (state.player2.length >= 3 && elem.every((e) => state.player2.includes(e))) {
         state.winner = state.player2;
      }
      if (state.player1.length === 5 && !state.winner) {
         state.draw = true;
      }
   });
};

const playerMove = (state: GameState) => {
   if (state.playerChange === false) {
      state.move = 'Сейчас ход игрока 1 (О)';
   } else {
      state.move = 'Сейчас ход игрока 2 (Х)';
   }
};

const finishGameText = (state: GameState) => {
   if (state.winner !== null && state.playerChange === true) {
      state.move = '';
      state.finishText = 'Победил игрок 1 (О)'
   } if (state.winner !== null && state.playerChange === false) {
      state.move = '';
      state.finishText = 'Победил игрок 2 (Х)'
   } if (state.draw && state.winner === null) {
      state.move = '';
      state.finishText = 'Ничья';
   }
};

export const { setPlayerChange, setMove, setPlayer1, setPlayer2, setWinner, setDraw, setFinishText, resetGame, playerChoise, resetBlock } = gameSlice.actions;

export default gameSlice.reducer;