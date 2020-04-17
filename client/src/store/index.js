import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: {},
    playerName: '',
    nickname: ''
  },
  getters: {
  },
  mutations: {
    SET_NICKNAME(state, n) {
      state.nickname = n;
    },
    updateGame: (state, payload) => {
      const currentGames = {...state.games};
      currentGames[payload.room] = {...currentGames[payload.room], ...payload.game};
      state.games = currentGames;
      console.log(state.games);
    },
    updatePlayerName: (state, payload) => {
      state.playerName = payload.playerName;
    }
  },
  actions: {
    updateAllGames: ({state, commit}, payload) => {
      for (let key in payload.games) {
        const game = {
          gameName: '',
          p1Name: '',
          p2Name: '',
          tiles: [],
          winner: '',
          status: 'waiting',
          player: '',
        }
        commit({
          type: 'updateGame',
          room: key,
          game: {...game, ...payload.games[key]}
        })
      }
    },
    resetBoard: ({commit}, payload) => {
      commit({
        type: 'updateGame',
        room: payload.room,
        game: {
          gameName: '',
          p1Name: '',
          p2Name: '',
          tiles: [],
          winner: '',
          status: 'waiting',
          player: '',
        }
      })
    },
    pushTile: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      console.log(state.games);
      console.log(currentGame);
      console.log(payload.room);
      console.log(currentGame['tiles'] )
      currentGame['tiles'].push(payload.tile);
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updateStatus: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame['status'] = payload.status;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updateWinner: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame['winner'] = payload.winner;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updateP1Name: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame['p1Name'] = payload.p1Name;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updateP2Name: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame['p2Name'] = payload.p2Name;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updatePlayer: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      console.log(payload.player);
      currentGame['player'] = payload.player;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
  },
  modules: {
  }
})
