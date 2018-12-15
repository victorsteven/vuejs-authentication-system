<template>
    <div>
        <!-- <h1>THis is the start view</h1> -->
        <!-- $route is injected by router, params is that dynamic parameter we are loading -->
        <!-- <div v-if="!loading">{{ $route.params.id }}</div> -->
        <div v-if="!loading">
            <div class="container my-3">
                <div class="row">
                    <div class="col-md-10 offset-md-1">
                        <div class="card">
                         <img height="420px" :src="article.imageUrl" alt="" class="card-img-top">
                         <div class="card-body">
                             <h1  class="card-title text-center">{{ article.title }}</h1>
                             <p>{{ article.content }}</p>
                         </div>
                           <div class="comments ml-4 mr-4">
                                <!-- <vue-disqus shortname="vuejs-practice" :identifier="article.slug" :url="`http://localhost:8080/article/${article.slug}`"></vue-disqus> -->
                                 <vue-disqus shortname="vuejs-practice" :identifier="article.slug" :url="url"></vue-disqus>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
           
        </div>
        <div v-else class="my-5 text-center fa-3x"><i class="fas fa-spinner fa-spin"></i></div>
    </div>  
</template>

<script>
import axios from 'axios';
import config from '@/config';
    export default {
        data(){
            return {
                loading: true,
                article: {},
                url: window.location.href

            }
        },
        mounted(){
            this.getArticle()
        },
        methods: {
            getArticle(){
                this.loading = true
                axios.get(`${config.apiUrl}/article/${this.$route.params.id}`)
                .then(response => {
                    this.article = response.data.data
                    console.log(response)
                    this.loading = false
                })
            }
        }
    }
</script>