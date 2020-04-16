<template>
	<td class="tile" @click="check">{{ symbol }}</td>
</template>

<script>
	export default {
		name: "Tile",
		props: {
			activeSym: String,
			playerSym: String,
			room: String
		},
		data () {
			return {
				symbol: ''
			}	
		},
		methods: {
			check: function() {
				if (this.symbol == '' && this.playerSym == this.activeSym) {
					this.symbol = this.activeSym;
					this.playTurn();
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
				this.$emit('playTurn');
			}
		}
	}
</script>

<style>
</style>