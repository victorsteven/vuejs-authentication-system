<template>
    <div>
        <div class="row">
            <div class="col-md-6 offset-md-3 my-3">
                <div class="card">
                    <div class="card-body">
                        <div class="card-header my-2">
                            Signup
                        </div>
                        <div class="form-group">
                            <!-- add the class 'is-invalid' if error.name is true -->
                            <!-- the 'is-invalid' class is a standard class that colors the border of the input field red. if we dont want that color, we can define a new class with the css we want -->
                            <!-- is-valid gives a green border, we will check if the user inputed the right value and has submitted the form  -->
                            <input :class="{ 'is-invalid': errors.name, 'is-valid': !errors.name && submitted }" v-model="name" type="text"  class="form-control" placeholder="enter name">
                            <div class="errors" v-if="errors.name">
                                <small class="text-danger" v-for="error in errors.name"  :key="error">{{ error }}</small>
                            </div>
                        </div>
                        <div class="form-group">
                            <input :class="{ 'is-invalid': errors.email, 'is-valid': !errors.email && submitted }" v-model="email" type="text"  class="form-control" placeholder="enter email">
                            <div class="errors" v-if="errors.email">
                                <small class="text-danger" v-for="error in errors.email"  :key="error">{{ error }}</small>
                            </div>
                        </div>
                        <div class="form-group">
                            <input :class="{ 'is-invalid': errors.password, 'is-valid': !errors.password && submitted }" v-model="password" type="password"  class="form-control" placeholder="enter password">
                            <div class="errors" v-if="errors.password">
                                <small class="text-danger" v-for="error in errors.password"  :key="error">{{ error }}</small>
                            </div>
                        </div>
                        <div class="form-group">
                            <button @click="registerUser" :disabled="loading" class="btn btn-success">
                                <!-- {{ loading ? 'fas fa-spinner fa-spin' : signup }} -->
                                <!-- Signup
                                <i class="fas fa-spinner fa-spin"></i> -->
                                <!-- Signup -->
                                <i class="fas fa-spinner fa-spin" v-if="loading"></i>
                                {{ loading ? '' : 'Signup' }}
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
import config from '@/config.js';
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
                name: '',
                email: '',
                password: '',
                errors: {},
                submitted: false,
                loading: false
            }
        },
        methods: {
            registerUser(){
                this.loading = true;
                // console.log(this.name, this.email, this.password)
                axios.post(`${config.apiUrl}/auth/register`, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                // .then(response => {
                //     localStorage.setItem('auth', JSON.stringify(response.data.data))
                //     console.log(response)
                //     this.$root.auth = response.data.data
                // })
                //using destructuring
                .then((response) => {
                    this.loading = false;
                    this.submitted = true
                    const { data } = response.data;
                    localStorage.setItem('auth', JSON.stringify(data))
                    console.log(response)
                    this.$root.auth = data

                    this.$noty.success("Successfully Signed up");
                    //redirect to the home page after signup
                    this.$router.push('/')
                })

                // .catch(error => {
                //     console.log(error)
                // });
                .catch(({response}) => {
                    this.$noty.success("Oops something went wrong");
                    this.loading = false;
                    this.submitted = true
                    // console.log(response)
                    // this.myauth = response
                    this.errors = response.data
                });

            }
        }

    }
</script>

<style>
    .lid{
        /* background: blue; */
        /* color: green; */
        border: 1px solid green;
    }
</style>