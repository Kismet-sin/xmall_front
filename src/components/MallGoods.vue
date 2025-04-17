<template>
    <el-row class="good-item">
        <el-col>
            <el-card :body-style="{padding: 0}">
                <div class="good-img">
                    <a>
                        <img :src="goods.productImageBig" alt>
                    </a>
                </div>
                <h6 class="good-title">{{goods.productName}}</h6>
                <h3 class="sub-title ellipsis">{{ goods.subTitle }}</h3>
                <div class="good-price pr">
                    <div class="ds pa">
                        <a href="javascript:;">
                            <el-button type="default" size="medium"
                                @click="productDetail(goods.productId)">查看详情</el-button>
                        </a>
                        <a href="javascript:;">
                            <el-button type="primary" size="medium"
                                @click='addCart(goods.productId,goods.salePrice,goods.productName,goods.productImageBig)'>加入购物车</el-button>
                        </a>
                    </div>
                    <p>
                        <span style="font-size:14px">¥</span>
                        {{Number(goods.salePrice).toFixed(2)}}
                    </p>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
// import { productDet } from '@/api/goods';
import { mapState,mapMutations } from 'vuex';
import { getStore } from '@/utils/storage';
    export default {
        props:['goods'],
        computed: {
            ...mapState(['login'])
        },
        methods:{
            //编程式导航
            ...mapMutations(['ADDCART']),
            productDetail(id) {
                this.$router.push({
                    path:`goodsDetail?productId=${id}`
                })
            },
            addCart(id, price, name ,img){
                if(this.login){
                    //用户已登录
                    this.$http.post("/api/addCart",{
                       userId:getStore("id"),
                       productId:id,
                       productNum :1
                    });
                    //将当前商品存储到store的carList
                    this.ADDCART({
                        productId:id,
                        salePrice:price,
                        productName:name,
                        productImageBig:img
                    })

                }else{
                    //未登录
                    this.ADDCART({
                        productId: id,
                        salePrice: price,
                        productName: name,
                        productImageBig: img
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.good-img {
    display: flex;
    justify-content: center;
    a {
        display: block;
        img {
            width: 206px;
            height: 206px;
            margin: 50px auto 10px;
            display: block;
        }

    }
}
.good-price {
    margin: 15px 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #d44d44;
    font-family: Arial;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: space-around;
    padding-bottom: 60px;
    a {
        margin-right: 5px;
    }
    .ds {
        display: none;
    }
}
.good-price:hover .ds {
    display: block;
}
.good-title {
    text-align: center;
    font-size: 16px;
    color: #424242;
    line-height: 1.2;
    margin: 0 auto;
    padding: 0 14px;
    overflow: hidden;  
}
h3 {
    text-align: center;
    font-size: 12px;
    color: #d0d0d0;
    line-height: 1.2;
    padding: 10px;
}
.good-item {
    background: #fff;
    width: 25%;
    transition: all 0.5s;
    height: 410px;
    &:hover {
        transform: translateY(-3px);
        box-shadow: 1px 1px 20px #999;
        .good-price P {
            display: none;
        }
        .ds {
            display: flex;
        }
    }
}
.el-card {
    border: none;
}
</style>