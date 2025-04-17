<template>
    <div class="login">
        <div class="box">
            <span>使用账号 登录官网</span>
            <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm"
            >
                <el-form-item label="账号" prop="user">
                    <el-input type="text" v-model="ruleForm.user" autocomplete="off" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button>返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {setStore,removeStore,getStore} from '@/utils/storage'
    export default {
        data() {
            let validateUser = (rule, value, callback) => {
                if (value === ""){
                    callback(new Error('请输入账号'))
                }else{
                    callback()
                }
            };
            let validatePwd = (rule, value, callback) => {
                if (value === ""){
                    callback(new Error('请输入密码'))
                }else{
                    callback()
                }
            };
            return {
                ruleForm: {
                    user: "",
                    pwd: ""
                },
                rules: {
                user: [{ validator: validateUser, trigger: 'blur' }],
                pwd: [{ validator: validatePwd, trigger: 'blur' }],
                }
                
            }
        },
        mounted(){
            //缓存当前购物车数据
            this.login_addCart()
        },
        methods: {
            login_addCart(){
                let cartArr = [];
                let localCart = JSON.parse(getStore('buyCart'))
                if (localCart && localCart.length){
                    localCart.forEach(item => {
                        cartArr.push({
                            userId: getStore('id'),
                            productId: item.productId,
                            productNum: item.productNum
                        })
                    })
                }
                this.cart = cartArr;
            },
            submitForm(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        //获取用户名密码
                        // let {user,pwd} = this.ruleForm;
                        // let res = await this.$http.post('/api/login',this.ruleForm)
                        try {
                            const res = await this.$http.post('/api/login', {
                                user: this.ruleForm.user,
                                pwd: this.ruleForm.pwd,
                            });
                            const data = res.data;
                            console.log('登录响应',data);
                        if (data.code === 200 && data.state ===1) {
                            // let { username, token, id} = res.data;
                            //持久化存储
                            setStore('token',data.token);
                            setStore('id', data.id);
                            //console.log('wangjiahe');
                            //setStore('user', data.user)
                            if (this.cart && this.cart.length) {
                                this.cart.forEach(async item => {
                                    let res = await this.$http.post('/api/addCart',item);
                                    if (res.data.success === true){
                                        console.log('添加购物车成功')

                                    }
                                    removeStore('buyCart');
                                    this.$router.push('/');

                                })
                            }
                            // 更新 Vuex 状态
                            this.$store.commit('ISLOGIN', data);
                            this.$router.push('/');
                            this.$message.success('登录成功');
                        }else {
                            await this.$router.push('/');
                            this.$message.error(data.message || '登录失败');
                        }
                        } catch (error) {
                            console.log(error)
                        }
                    } 
                    
                    else {
                        console.log('error submit!!');
                        return false;
                        
                    }
                });
            },
        }

    };
</script>

<style lang="scss" scoped>
    .login {
        position: relative;
        overflow: visible;
        background: #ededed;
        .box {
            width: 450px;
            border: 1px solid #dadada;
            border-radius: 10px;
            position: absolute;
            top: 200px;
            left: 50%;
            padding: 50px 50px 50px 10px;
            margin-left: -225px;
            box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
            0 18px 20px -10px rgba(0, 0, 0, 0.04),
            0 18px 20px -10px rgba(0, 0, 0, 0.04),
            0 10px 20px -10px rgba(0, 0, 0, 0.04);
            text-align: center;
            form {
                margin-top: 30px;
            }
            span {
                color: #333;
                font-weight: 400;
            }
        }
    }
</style>