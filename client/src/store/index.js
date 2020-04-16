import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: {
      test: {
        gameName: '',
        p1Name: '',
        p2Name: '',
        tiles: [],
        winner: '',
        status: 'waiting',
        player: 'p1'
      }
    },
    playerName: '',
    nickname: ''
  },
  getters: {
  },
  mutations: {
    updateGame: (state, payload) => {
      const currentGames = {...state.games};
      currentGames[payload.room] = payload.game;
      state.games = currentGames;
    },
    updatePlayerName: (state, payload) => {
      state.playerName = payload.playerName;
    },
    updateAllGames: (state, payload) => {
      state.games = payload.games;
    },
    SET_NICKNAME(state, n) {
      state.nickname = n;
    }
  },
  actions: {
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
          player: ''
        }
      })
    },
    pushTile: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame[payload.room]['tile'] = payload.tile;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updateStatus: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame[payload.room]['status'] = payload.status;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updateWinner: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame[payload.room]['winner'] = payload.winner;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updateP1Name: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame[payload.room]['p1Name'] = payload.p1Name;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updateP2Name: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame[payload.room]['p2Name'] = payload.p2Name;
      commit({
        type: 'updateGame',
        room: payload.room,
        game: currentGame
      })
    },
    updatePlayer: ({state, commit}, payload) => {
      const currentGame = {...state.games[payload.room]};
      currentGame[payload.room]['player'] = payload.player;
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
