<template>
    <div>
        <div class="row">
            <div class="col-md-6 offset-md-3 my-3">
                <div class="card">
                    <div class="card-body">
                        <div class="card-header my-2">
                            Login
                        </div>
                        <div class="form-group">
                            <input :class="{'is-invalid' : errors.email}" v-model="email" type="text" class="form-control" placeholder="enter email">
                            <div class="errors" v-if="errors.email">
                                <small  class="text-danger" v-for="error in errors.email" :key="error">
                                    {{ error }}
                                </small>
                            </div>
                        </div>
                        <div class="form-group">
                            <input :class="{'is-invalid' : errors.password}" v-model="password" type="password" class="form-control" placeholder="enter password">
                            <div class="errors" v-if="errors.password">
                                <small  class="text-danger" v-for="error in errors.password" :key="error">
                                    {{ error }}
                                </small>
                            </div>
                        </div>
                        <div class="form-group">
                            <button @click="loginUser" :disabled="loading" class="btn btn-success">
                                <i class="fas fa-spinner fa-spin" v-if="loading"></i>
                                {{ loading ? '' : 'Login' }}
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import config from '@/config.js'
    export default {
        beforeRouteEnter (to, from, next) {
            //we cant do: this.$root.auth, because we have no authenticated user yet. so we need to check local storage
            console.log(to, from, next);
            if(localStorage.getItem('auth')){
                return next({path: "/"});
            }
            //if no localStorage, redirect to the login route
            next();
        },
        data(){
            return {
                email: '',
                password: '',
                errors: {},
                loading: false
            }
        },
        methods: {
            loginUser(){
                this.loading = true
                axios.post(`${config.apiUrl}/auth/login`, {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    this.$noty.success("Welcome back!")
                    this.loading = false
                    this.$root.auth = response.data.data
                    localStorage.setItem('auth', JSON.stringify(response.data.data))

                    this.$router.push('/')
                    
                    // console.log(response)
                }).catch(({response}) => {
                    this.loading = false
                    this.$noty.error("Oops, something went wrong!")
                    if(response.status === 401){
                        // this.errors.email = ['These credentials do not match our records']
                        this.errors = {
                            email: ["These credentials do not match our records"]
                        };
                    }else{
                        this.errors = response.data
                    }
                    // console.log(response);
                    // this.errors = response.data
                });
            }
        }
    }
</script>