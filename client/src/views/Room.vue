<template>
    <div class="contentDashboard">
        <h2 class="title">Welcome, </h2>
        <hr>
        <div class="container">
            <Board v-if="$store.state.games[$route.params.room] && $store.state.games[$route.params.room]['player']" :room="$route.params.room"/>
        </div>
    </div>
</template>
<script>
import Board from '@/components/Board.vue';
export default {
    name: 'Room',
    components: {
        Board
    },
    data () {
        return {
        }
    },
    methods: {
    },
    mounted () {
        if (!this.$store.state.games[this.$route.params.room])
            this.$socket.client.emit('joinGame', {
                room: this.$route.params.room,
                name: this.$store.state.nickname
            })
    },
    sockets: {
        err: function(data) {
            this.$router.push('/dashboard');
            this.$buefy.toast.open(data.message);
        },
        player2(data) {
            this.$store.dispatch({
                type: 'resetBoard',
                room: data.room
            });
            this.$store.dispatch({
                type: 'updateStatus',
                status: 'running',
                room: data.room
            });
            this.$store.dispatch({
                type: 'updateP2Name',
                p2Name: data.name,
                room: data.room
            });
            this.$store.dispatch({
                type: 'updatePlayer',
                player: 'p2',
                room: data.room
            });
        },
        player1(data) {
            this.$store.dispatch({
                type: 'updateStatus',
                status: 'running',
                room: this.$route.params.room
            });
        }
    }

}
</script>

<style scoped lang="scss">
    .contentDashboard {
      padding-top: 50px;
      .container {
		width: 30%;
      }
    }
</style>