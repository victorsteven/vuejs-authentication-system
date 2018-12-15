<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card my-5">
                    <div class="card-body">
                         <picture-input 
                            width="600" 
                            height="200" 
                            accept="image/jpeg,image/png" 
                            size="5" 
                            button-class="btn"
                            :custom-strings="{
                                upload: '<h1>Bummer!</h1>',
                                drag: 'Drag a 😺 GIF or GTFO'
                            }"
                            @change="onChange">
                            </picture-input>
                        <select v-model="category" class="form-control my-3">
                            <option value="">Select a category...</option>
                            <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
                        </select>
                        <input v-model='title' type="text" placeholder="Title" class="form-control my-2">
                        <wysiwyg v-model="content" />
                        <div>
                            <div @click="createArticle" :disabled="loading" class="btn btn-success mt-3">
                                <i class="fas fa-spinner fa-spin" v-if="loading"></i>
                                {{ loading ? '' : 'Create Article' }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PictureInput from 'vue-picture-input';
import config from '@/config';

    export default {
        beforeRouteEnter (to, from, next) {
            //we cant do: this.$root.auth, because we have no authenticated user yet. so we need to check local storage
            console.log(to, from, next);
            if(!localStorage.getItem('auth')){
                return next({path: "/"});
            }
            //if no localStorage, redirect to the login route
            next();
        },

        components: {
            PictureInput
        },
        data(){
            return {
                title: '',
                content: '',
                image: null,
                categories: [],
                category: '',
                loading: false
            }
        },
        mounted(){
            // console.log(process.env)
            this.getCategories()
        },
        methods: {
            onChange(image){
                this.image = image;
            },
            createArticle(){

                if(!this.title || !this.content || !this.image || this.category){
                    this.$noty.error('Please fill in all fields')
                    return;
                }

                this.loading = true
                //FormData is a built-in JS function that help us create form data
                let form = new FormData();
                form.append('file', this.image)
                form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET)
                form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY)
                form.append('api_secret', process.env.VUE_APP_CLOUDINARY_API_SECRET)

                axios.post(process.env.VUE_APP_CLOUDINARY_URL, form).then(res => {
                    console.log(res)
                    axios.post(`${config.apiUrl}/articles`, {
                        title: this.title,
                        content: this.content,
                        category_id: this.category,
                        imageUrl: res.data.secure_url
                    }, {
                        //we need to pass the auth user token, so that our server knows which user is sending this request. to do that, if not we get authenticated error message. We will pass the token in the headers
                        headers: {
                            Authorization: `Bearer ${this.$root.auth.token}`
                        }
                    }).then(() => {
                        this.loading = false

                        this.$noty.success('Article created successfully');
                        this.$router.push("/");
                    }).catch(() => {
                        this.loading = false
                        this.$noty.error('Something went wrong')
                    })
                }).catch(() => {
                        this.loading = false
                        this.$noty.error('Something went wrong')
                    })
            },
            getCategories(){
                //if we have categories in our localStorage, give it to us, else, make the ajax call
                const categories = localStorage.getItem('categories');
                if(categories){
                    this.categories = JSON.parse(categories)
                    return;
                }
                axios.get(`${config.apiUrl}/categories`).then(res => {
                    // console.log(res)
                    this.categories = res.data.categories
                    // console.log(this.categories)
                    //since the categories never check, lets save it when we make the axios request to the localStorage
                    localStorage.setItem('categories', JSON.stringify(this.categories))
                })
            }
        }
    }
</script>

<style>
    @import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>