<template>
    <div class="column is-2">
        <div class="room-card">
            <div class="room-header">
                <p>
                    {{nameRoom}}
                </p>
            </div>
            <div class="room-content">
                <!-- <p>{{$store.state.nickname}}</p>
                <p>{player b}</p> -->
                <Board v-if="$store.state.games[room]" :room="room"/>
            </div>
            <div class="room-footer btn-join" :class="{'disabled': $store.state.games[room].status != 'waiting'}"
                @click.prevent="status == 'waiting' ? $router.push(`/games/${room}`) : null ">
                {{ buttonName }}
            </div>
        </div>
    </div>
</template>
<script>
import Board from '@/components/Board.vue';
export default {
    name: "RoomCard",
    components: {
        Board
    },
    props: [
        'nameRoom',
        "room"
    ],
    methods: {
        // joinGame: function(){
        //     if (!this.$store.state.games[this.room])
        //         this.$socket.client.emit('joinGame', {
        //             room: this.room,
        //             name: this.$store.state.nickname
        //         })
        //     this.$router.push(`/games/${this.room}`)
        // }
    },
    computed: {
        status: function() {
            return this.$store.state.games[this.room].status;
        },
        buttonName: function () {
            if (this.status == "waiting") 
                return 'Join';
            if (this.status == "running") 
                return 'In Progress';
            return 'Ended';
        }
    }
}
</script>

<style scoped lang="scss">
    .btn-join {
        padding: 10px;
        text-align: center;
    }
    .room-card {
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        border-radius: 10px;
        overflow: hidden;
    }
    .room-header {
        box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1);
        font-weight: 700;
        padding: 10px;
        background-color: #c9f4c8;
    }
    .room-footer {
        border-top: 1px solid #dbdbdb;
        background-color: #f0ef9f;
        &.disabled {
            background-color: #f0ef9f6e;
            color: #00000093;
            cursor: default !important;
        }
    }
    .room-footer:hover {
        cursor: pointer;
    }
</style>