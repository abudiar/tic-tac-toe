<template>
    <div>
        <div class="boxs">
            <h1>Tic Tac Toe</h1>
            <hr>
            <form>
                <input class="btn btn-primary" type="text" placeholder="Nickname" v-model="inputNickname">
                <button type="submit" class="btn btn-primary" @click.prevent="toDashboard">Play Game</button>
            </form>
        </div>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    name: 'Home',
    data () {
        return {
            inputNickname: ''
        }
    },
    methods: {
      toDashboard() {
        if(this.inputNickname === '') {
          Swal.fire(
            'Warning!',
            'Nickname cannot be empty!',
            'error'
          );
        } else if (this.inputNickname.length > 15) {
          Swal.fire(
            'Warning!',
            'Nickname must be a maximum of 15 characters!',
            'error'
          );
        } else {
          this.$store.commit('SET_NICKNAME', this.inputNickname);
          this.inputNickname = '';
          this.$router.push('/dashboard');
        }
      }
    },
}
</script>

<style>
    .boxs {
        background-color: #cbecdd7d;
        padding: 30px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-sizing: border-box;
        position: absolute;
    }
</style>