<template>
    <div class="contentHome">
        <div class="boxs">
            <h1 class="title">Tic Tac Toe</h1>
            <hr>
            <section>
                <b-field label="Nickname">
                    <b-input v-model="inputNickname"></b-input>
                </b-field>
                <b-button type="is-warning" @click.prevent="toDashboard">Play Game</b-button>
            </section>
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
        background-color: #abe3cae0;
        padding: 30px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        box-sizing: border-box;
        position: absolute;
    }
    .contentHome {
      background-image: url('../assets/background.jpg');
      width: 100%;
      height: 100%;
      position: absolute;
      background-size: cover;
    }
</style>