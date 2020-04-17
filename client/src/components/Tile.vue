<template>
	<div class="border">
		<div class="tile" v-if="symbol == ''" @click="check"></div>
		<div class="tile" v-if="symbol == 'O'" @click="check">
			<img
    			src="../assets/zero.svg" 
				alt="O"
				height="100%"
				width="auto"/>
		</div>
		<div class="tile" v-if="symbol == 'X'" @click="check">
			<img
    			src="../assets/cross.svg" 
				alt="X"
				height="100%"
				width="auto"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Tile",
		props: {
			tile: Number,
			activeSym: String,
			playerSym: String,
			room: String
		},
		computed: {
			tiles: function() {
                // console.log(this.$store.state.games[this.room].tiles)
				return [...this.$store.state.games[this.room].tiles];
			},
			status: function() {
				return this.$store.state.games[this.room].status;
			},
			player: function() {
				return this.$store.state.games[this.room].player;
			}
		},
		data () {
			return {
				symbol: ''
			}	
		},
		watch: {
			tiles: function() {
				this.symbol = this.getSymbol();
			}
		},
		mounted () {
			this.symbol = '';
			let i = this.tiles.findIndex((element) => element == this.tile);
			if (i >= 0)
				this.symbol = i % 2 == 0 ? 'X' : 'O';
		},
		methods: {
			check: function() {
				// console.log(this.symbol, this.playerSym, this.activeSym)
				if (this.player != '') {
					if (this.symbol == '' && 
						this.playerSym == this.activeSym &&
						this.status == 'running') {
						this.playTurn();
					}
					else {
						let message = '';
						console.log('a',`'${this.status}'`);
						if (this.status.includes('won'))
							message = 'The game has finished!';
						else if (this.status.includes('draw'))
							message = 'The game has finished!';
						else if (this.status.includes('waiting'))
							message = 'Please wait for Player 2';
						else
							message = 'Please wait your turn!';
						this.$buefy.toast.open({
							duration: 5000,
							message,
							position: 'is-bottom',
							type: 'is-danger'
						})
					}
				}
			},
			getSymbol: function() {
				let i = this.tiles.findIndex((element) => element == this.tile);
				if (i >= 0)
					return i % 2 == 0 ? 'X' : 'O';
				return '';
			},
			playTurn() {
				this.$emit('playTurn');
			}
		}
	}
</script>
<style scoped lang="scss">
	.border {
		padding: 5%;
	}
	.tile {
        display: flex; 
		width: 100%;
		height: 100%;
		background: #F7CAC9;
		// border: 20% solid rgba(0, 0, 0, 0);
		border-radius: 10%;
		background-clip: padding-box;
		img { 
			width: 80%;
			height: 80%;
			margin: auto;
			text-align: center; 
		}
	}
</style>