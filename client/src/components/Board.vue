<template>
    <div class="board-content">
        <div class="message">
            <p>MESSAGE</p>
        </div>
        <div class="board">
            <Tile v-for="i in tilesTotal" :key="i" :tile="i" @playTurn="playTurn(i)"
                :activeSym="getActiveSym" :playerSym="getSym" :room="room"/>
        </div>
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
            getActiveSym() {
                return this.tiles.length % 2 == 0 ? 'X' : 'O';
            },
            getSym() {
                return this.$store.state.games[this.room]['player'] == 'p1' ? 'X' : 'O';
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
                winConditions: [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ]
            }
        },
        methods: {
            playTurn(tile) {
				this.$socket.client.emit('playTurn', {
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
                console.log(message);
				this.$socket.client.emit('gameEnded', {
                    room: this.room,
                    message
				});
            }
        },
        watch: {
            tiles: function() {
                if (this.tiles.length >= 9) {
                    this.$store.dispatch({
                        type: 'updateStatus',
                        room: this.room,
                        status: 'draw'
                    });
                    this.gameEnded('draw');
                }
                console.log('aaaaaa',this.status);
                if (this.status == 'running') {
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
                    console.log(this.status, tilesX, tilesY);
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
                                    winner: this.p1Name
                                });
                                this.gameEnded(this.p1Name + ' won');
                                break;
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
                                    winner: this.p2Name
                                });
                                this.gameEnded(this.p2Name + ' won');
                                break;
                            }
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
        },
        sockets: {
            connect() {
                console.log('socket connected')
            },
            gameEnd(data) {
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
            },
            turnPlayed(data) {
                this.$store.dispatch({
                    type: 'pushTile',
                    room: this.room,
                    tile: data.tile
                });
            }
        },
	}
</script>

<style scoped lang="scss">
    .board-content {
        width: 100%;
        padding-top: 100%;
        position: relative;
        .board {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
    }
    .message {
        height: 50%;
        width: 200%;
        position: absolute;
        top: 25%;
        left: -50%;
        background: blue;
        z-index: 1;
        transform: rotate(-45deg);
        p {
            
        }
    }
</style>