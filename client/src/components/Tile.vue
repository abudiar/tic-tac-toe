<template>
	<div class="tile" @click="check">{{ symbol }}</div>
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
	.tile {
		width: 100%;
		height: 50px;
		background: rgb(255, 255, 255);
		border: 1px solid;
	}
</style>