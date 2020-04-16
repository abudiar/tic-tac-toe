<template>
	<td class="tile" @click="check">{{ symbol }}</td>
</template>

<script>
	export default {
		name: "Tile",
		props: {
			activeSymbol: String,
			playerSymbol: String,
			tile: Number,
			room: String
		},
		data () {
			return {
				symbol: ''
			}	
		},
		methods: {
			check: function() {
				if (this.symbol == '' && this.playerSymbol == this.activeSymbol) {
					this.symbol = this.activeSymbol;
					playTurn();
				}
				else {

				}
			},
			playTurn() {
				this.$socket.emit('playTurn', {
					tile: this.tile,
					room: this.room
				});
			}
		}
	}
</script>

<style>
</style>