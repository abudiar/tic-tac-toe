<template>
    <div class="contentDashboard">
        <h2 class="title">Welcome, {{$store.state.nickname}}</h2>
        <button class="button is-medium is-info" @click="formNewRoom">
            Create Room
        </button>
        <hr>
        <div class="container">
            <div v-if="games" class="columns is-multiline">
                <RoomCard v-for="(game, key) in reversedGames" :key="key" :room="key" :nameRoom="game['gameName']"></RoomCard>
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
        },
        reversedGames: function () { 
            if (this.games)  {
                const arr = [];
                const newGames = {};
                for (let key in this.games) {
                    arr.push(key);
                }
                for (let i = arr.length - 1; i >= 0; i--) {
                    newGames[arr[i]] = this.games[arr[i]];
                }
                return newGames;
            }
            return null;
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
                        name: this.$store.state.nickname,
                        gameName: value
                    })
                    this.$buefy.toast.open(`Your room is: ${value}`);
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
            this.$store.dispatch({
                type: 'updateGameName',
                gameName: data.gameName,
                room: data.room
            });
            this.$router.push('/games/' + data.room);
        },
        rooms(data) {
            console.log('rooms',data)
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
            // console.log(this.games);
        }
    },

}
</script>

<style>
    .contentDashboard {
      padding-top: 50px;
    }
</style>