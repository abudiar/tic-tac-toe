<template>
	<div class="tile" @click="check">{{ symbol }}</div>
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
				return [...this.$store.state.games[this.room].tiles];
			},
			status: function() {
				return this.$store.state.games[this.room].status;
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
		methods: {
			check: function() {
				// console.log(this.symbol, this.playerSym, this.activeSym)
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
					else if (this.status.includes('stopped'))
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
			},
			getSymbol: function() {
				let i = this.tiles.findIndex((element) => element == this.tile);
				if (i >= 0)
					return i % 2 == 0 ? 'X' : 'Y';
				return '';
			},
			playTurn() {
				this.$emit('playTurn');
			}
		}
	}
</script>
<style>
	.tile {
		width: 100%;
		height: 50px;
		background: rgb(255, 255, 255);
		border: 1px solid;
	}
</style>