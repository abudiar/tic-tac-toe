<template>
    <div class="contentDashboard">
        <h2 class="title">Welcome, </h2>
        <hr>
        <div class="container">
            <Board />
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

}
</script>

<style>
    .contentDashboard {
      padding-top: 50px;
    }
</style>