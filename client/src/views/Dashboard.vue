<template>
    <div class="contentDashboard">
        <h2 class="title">Welcome, {{$store.state.nickname}}</h2>
        <button class="button is-medium is-info" @click="formNewRoom">
            Create Room
        </button>
        <hr>
        <div class="container">
            <div class="columns is-multiline">
                <Room v-if="createNew" :nameRoom="nameRoom"></Room>
            </div>
        </div>
    </div>
</template>
<script>
import Room from './Room.vue';
export default {
    name: 'Dashboard',
    components: {
        Room
    },
    data () {
        return {
            nameRoom: '',
            createNew: false
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
                    this.$buefy.toast.open(`Your room is: ${value}`)
                }
            })
        },
    },
}
</script>

<style>
    .contentDashboard {
      padding-top: 50px;
    }
</style>