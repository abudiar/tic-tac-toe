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
            <div class="room-footer btn-join" @click.prevent="toRoom">
                Join
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
    ]
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
    }
    .room-footer:hover {
        cursor: pointer;
    }
</style>