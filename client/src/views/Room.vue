<template>
    <div class="contentDashboard">
        <h2 class="title">Room {{gameName}}</h2>
        <h3 class="subtitle">{{title}}</h3>
        <hr>
        
            <div class="container">
            <div class="room-card">
                <div class="room-header transition" :class="{'show': isActive && isRunning}">
                    It's your turn!
                </div>
                <Board v-if="$store.state.games[$route.params.room] && $store.state.games[$route.params.room]['player']" :room="$route.params.room"/>
                <div class="room-footer transition" :class="{'show': (!isActive && isRunning) || (isActive && isWaiting)}">
                    {{isRunning ? `It's ${opponentName}'s turn!` : 'Waiting for someone to join...'}}
                    
                </div>
            </div>
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
    computed: {
        p1Name: function() {
            return this.$store.state.games[this.$route.params.room]['p1Name'];
        },
        p2Name: function() {
            return this.$store.state.games[this.$route.params.room]['p2Name'];
        },
        tiles: function() {
            return this.$store.state.games[this.$route.params.room]['tiles'];
        },
        player() {
            return this.$store.state.games[this.$route.params.room]['player'];
        },
        status: function() {
            return this.$store.state.games[this.$route.params.room]['status'];
        },
        gameName: function() {
            return this.$store.state.games[this.$route.params.room]['gameName'];
        },
        isRunning: function() {
            return this.status === 'running';
        },
        isWaiting: function() {
            return this.status === 'waiting';
        },
        isActive() {
            if (this.tiles.length % 2 == 0)
                if (this.player == 'p1')
                    return true;
            if (this.tiles.length % 2 != 0)
                if (this.player == 'p2')
                    return true;
            return false;
        },
        opponentName: function () {
            if (this.player == 'p1')
                return this.p2Name;
            else
                return this.p1Name;
        },
        title: function() {
            return `${this.p1Name}(X) vs. ${this.p2Name}(Y)`
        }
    },
    watch: {
    },
    mounted () {
        if (!this.$store.state.games[this.$route.params.room] ||
            this.$store.state.games[this.$route.params.room]['player'] != 'p1') {
            this.$socket.client.emit('joinGame', {
                room: this.$route.params.room,
                name: this.$store.state.nickname
            });
        }
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
                type: 'updateP1Name',
                p1Name: data.name,
                room: data.room
            });
            this.$store.dispatch({
                type: 'updatePlayer',
                player: 'p2',
                room: data.room
            });
            console.log('rip');
            this.$store.dispatch({
                type: 'updateP2Name',
                p2Name: this.$store.state.nickname,
                room: this.$route.params.room
            });
            // console.log('player1', data.name);
        },
        player1(data) {
            this.$store.dispatch({
                type: 'updateStatus',
                status: 'running',
                room: this.$route.params.room
            });
            this.$store.dispatch({
                type: 'updateP2Name',
                p2Name: data.name,
                room: this.$route.params.room
            });
            // console.log('player2', data.name);
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
    .transition {
        transition: all .3s cubic-bezier(.7,0,.3,1);
    }
    .subtitle {
        font-weight: 700;
        font-size: 20px;
    }
    .room-card {
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        border-radius: 10px;
        overflow: hidden;
    }
    .room-header {
        box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
        font-weight: 700;
        font-size: 20px;
        padding: 0px;
        opacity: 0;
        max-height: 0;
        background-color: #c9f4c8;
    }
    .room-footer {
        border-top: 1px solid #dbdbdb;
        font-weight: 700;
        font-size: 20px;
        background-color: #f0ef9f;
        padding: 0px;
        max-height: 0;
        opacity: 0;
    }
    .show {
        max-height: 100vh;
        padding: 10px;
        opacity: 1;
    }
</style>