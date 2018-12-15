<template>
    <div>
        <div class="d-flex mt-4 justify-content-between">
            <button @click="getPrevArticles" :disabled="articles.prev_page_url === null" class="btn btn-warning">Prev Page</button>
            <button @click="getNextArticles" :disabled="articles.next_page_url === null" class="btn btn-warning">Next Page</button>

        </div>
        <div class="row" v-if="articles.data && !loading" >
            <div class="col-md-10 offset-md-1 my-3"  v-for="article in articles.data" :key="article.id">
            <Article  :article="article"/>
            </div>
        </div>
        <div v-else class="text-center fa-5x"><i class="fas fa-spinner fa-spin" v-if="loading"></i></div>
    </div>
</template>

<script>
import axios from 'axios';
import config from '@/config.js';
import Article from '@/components/Article.vue'

    export default {

        components: {
            Article
        },

        data(){
            return {
              articles: {},
              loading: true  
            }
        },
        mounted(){
            this.getArticles()
        },

        methods: {
            // getArticles(){
            //     this.loading = true
            //     axios.get(`${config.apiUrl}/articles`).then(response => {
            //         this.articles = response.data.data
            //         this.loading = false;

            //     })
            // }
            //if a url is passed, override the default property
            getArticles(url = `${config.apiUrl}/articles` ){
                this.loading = true
                axios.get(url).then(response => {
                    this.articles = response.data.data
                    this.loading = false;

                })
            },
            getNextArticles(){
                this.getArticles(this.articles.next_page_url);
            },
            getPrevArticles(){
                this.getArticles(this.articles.prev_page_url);

            }
        }
    }
</script>   

<style>
    .btn-warning{
        color: #fff;
    }
</style>
