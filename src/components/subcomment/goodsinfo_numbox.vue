<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" 
        value="1" ref="number" @change="countchange"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
        mounted(){
             mui('.mui-numbox').numbox()
        },
        methods:{
            countchange(){
                // this.$refs.number.value
                this.$emit('getcount',parseInt(this.$refs.number.value))
            }
        }
}
</script>

<style>

</style>


