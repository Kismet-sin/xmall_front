<template>
    <div class="gray-box">
        <div class="title">
            <h2>{{title}}</h2>            
        </div>
        <div>
            <!--具名插槽-->
            <slot name="content"></slot>

            
        </div>
    </div>
</template>

<script>
    export default {
        props:[
            'title'
        ]
    };
</script>

<style lang="scss" scoped>
.gray-box {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
    .title {
        padding-left: 30px;
        position: relative;
        z-index: 10;
        height: 60px;
        padding: 0 10px 0 24px;
        border-bottom: 1px solid #d4d4d4;
        border-radius: 8px 8px 0 0;
        box-shadow: rgba(0, 0, 0, 0.06) 0 1px 7px;
        background: -webkit-linear-gradient(#fbfbfb, #ececec);
        background: linear-gradient(#fbfbfb, #ececec);
        line-height: 60px;
        font-size: 18px;
        color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h2 {
            font-size: 18px;
            font-weight: 400;
            color: #626262;
            display: inline-block;
        }
    }
}


</style>