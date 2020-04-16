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
					this.$buefy.toast.open({
						duration: 5000,
						message: `Please wait your turn!`,
						position: 'is-bottom',
						type: 'is-danger'
					})
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