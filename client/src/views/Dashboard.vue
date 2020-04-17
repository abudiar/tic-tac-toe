<template>
    <div class="contentDashboard">
        <h2 class="title">Welcome, {{$store.state.nickname}}</h2>
        <button class="button is-medium is-info" @click="formNewRoom">
            Create Room
        </button>
        <hr>
        <div class="container">
            <div v-if="games" class="columns is-multiline">
                <RoomCard v-for="(game, key) in games" :key="key" :room="key" :nameRoom="key"></RoomCard>
            </div>
        </div>
    </div>
</template>
<script>
import RoomCard from './RoomCard.vue';
export default {
    name: 'Dashboard',
    components: {
        RoomCard
    },
    data () {
        return {
            nameRoom: '',
            createNew: false
        }
    },
    computed: {
        games: function () {
            return {...this.$store.state.games};
        }
    },
    methods: {
        formNewRoom() {
            this.$buefy.dialog.prompt({
                message: `What's your room name?`,
                inputAttrs: {
                    placeholder: 'room name max 10 char',
                    maxlength: 10
                },
                trapFocus: true,
                onConfirm: (value) => {
                    this.nameRoom = value;
                    this.createNew = true;
                    this.$socket.client.emit('createGame', {
                        name: this.$store.state.nickname
                    })
                    this.$buefy.toast.open(`Your room is: ${value}`)
                }
            })
        }
    },
    mounted () {
        this.$socket.client.emit('rooms');
    },
    sockets: {
        connect() {
            console.log('socket connected')
        },
        newGame(data) {
            this.$store.dispatch({
                type: 'resetBoard',
                room: data.room
            });
            this.$store.dispatch({
                type: 'updatePlayer',
                player: 'p1',
                room: data.room
            });
            this.$store.dispatch({
                type: 'updateP1Name',
                p1Name: data.name,
                room: data.room
            });
            this.$router.push('/games/' + data.room);
        },
        rooms(data) {
            if(!data.room) {
                this.$store.dispatch({
                    type: 'updateAllGames',
                    games: data.games
                })
            }
            else {
                if (!this.games[data.room]) 
                    this.$store.dispatch({
                        type: 'resetBoard',
                        room: data.room
                    })
                this.$store.commit({
                    type: 'updateGame',
                    room: data.room,
                    game: data
                })
            }
            console.log(this.games);
        }
    },

}
</script>

<style>
    .contentDashboard {
      padding-top: 50px;
    }
</style>