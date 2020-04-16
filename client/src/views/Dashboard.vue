<template>
    <div>
        <div class="boxs">
            <h1>Tic Tac Toe</h1>
            <hr>
            <form >
                <input class="btn btn-primary" type="text" placeholder="Nickname">
                <button type="submit" class="btn btn-primary">Play Game</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Dashboard',
    data () {
        return {
            
        }
    }
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