<template>
    <div class="board">
        <Tile v-for="i in tilesTotal" :key="i" :tile="i" :playTurn="playTurn(i)"
            :activeSym="activeSym" :playerSym="getSym()" :room="room"/>
    </div>
</template>

<script>
    import Tile from './Tile';
	export default {
        name: 'Board',
        components: {
            Tile
        },
        props: {
            room: String,
        },
        computed: {
            tiles: function() {
                return this.$store.state.games[this.room]['tiles'];
            },
            winner: function() {
                return this.$store.state.games[this.room]['winner'];
            },
            status: function() {
                return this.$store.state.games[this.room]['status'];
            },
            p1Name() {
                return this.$store.state.games[this.room]['p1Name'];
            },
            p2Name() {
                return this.$store.state.games[this.room]['p2Name'];
            },
            player() {
                return this.$store.state.games[this.room]['player'];
            },
            getSym() {
                return this.player == 'p1' ? 'X' : 'Y';
            },
            tilesTotal() {
                const arr = [];
                for (let i = 0; i < 9; i++) {
                    arr.push(i);
                }
                return arr;
            }
        },
        data() {
            return {
                activeSym: 'X',
                winConditions: [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ]
            }
        },
        methods: {
            resetBoard() {
                this.$store.dispatch({
                    type: 'resetBoard',
                    room: this.room
                });
                this.activeSym = 'X';
            },
            playTurn(tile) {
				this.$socket.emit('playTurn', {
					room: this.room,
					tile
				});
                this.$store.dispatch({
                    type: 'pushTile',
                    room: this.room,
                    tile
                });
            },
            gameEnded(message) {
				this.$socket.emit('gameEnded', {
                    room: this.room,
                    message
				});
            }
        },
        watch: {
            room: function() {
                this.resetBoard();
            },
            tiles: function() {
                if (this.tiles.length >= 9) {
                    this.$store.dispatch({
                        type: 'updateStatus',
                        room: this.room,
                        status: 'draw'
                    });
                    this.gameEnded('draw');
                }
                const tilesX = [];
                const tilesY = [];
                for (let i in this.tiles) {
                    if (Number(i) % 2 == 0) {
                        tilesX.push(this.tiles[i]);
                    }
                    else {
                        tilesY.push(this.tiles[i]);
                    }
                }
                for (let i in this.winConditions) {
                    if (tilesX.includes(this.winConditions[i][0]) &&
                        tilesX.includes(this.winConditions[i][1]) &&
                        tilesX.includes(this.winConditions[i][2])) {
                            this.$store.dispatch({
                                type: 'updateStatus',
                                room: this.room,
                                status: 'won'
                            });
                            this.$store.dispatch({
                                type: 'updateWinner',
                                room: this.room,
                                status: this.p1Name
                            });
                            this.gameEnded(this.p1Name + ' won');
                        }
                    else if (tilesY.includes(this.winConditions[i][0]) &&
                        tilesY.includes(this.winConditions[i][1]) &&
                        tilesY.includes(this.winConditions[i][2])) {
                            this.$store.dispatch({
                                type: 'updateStatus',
                                room: this.room,
                                status: 'won'
                            });
                            this.$store.dispatch({
                                type: 'updateWinner',
                                room: this.room,
                                status: this.p2Name
                            });
                            this.gameEnded(this.p2Name + ' won');
                        }
                }
            },
            status: function() {
                switch (this.status) {
                    case 'draw':
                        break;
                    case 'running':
                        break;
                    case 'waiting':
                        break;
                }                
            }
        },
        mounted() {
            this.resetBoard();
            this.$socket.on('gameEnd', (data) => {
                let status = '';
                let winner = '';
                if (!data.message == 'draw') {
                    let messageArr = data.message.split(' ');
                    status = messageArr.pop();
                    winner = messageArr.join(' ');
                }
                else {
                    status = data.message;
                }
                this.$store.dispatch({
                    type: 'updateStatus',
                    room: this.room,
                    status
                });
                this.$store.dispatch({
                    type: 'updateWinner',
                    room: this.room,
                    winner
                });
            });
            this.$socket.on('turnPlayed', (data) => {
                this.$store.dispatch({
                    type: 'pushTile',
                    room: this.room,
                    tile: data.tile
                });
            });
        },
	}
</script>

<style scoped lang="scss">
.board {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
}
</style>