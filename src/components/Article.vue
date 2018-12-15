<template>
    <div class="card col-md-8 offset-md-2">
        <div class="card-header">{{ article.title}}</div>
        <div class="card-body">
            <div class="my-3" v-html="article.content.substring(0, 200)"></div>
        </div>
        <router-link :to="`/article/${article.slug}`" class="btn btn-primary">Read More</router-link>
    </div>
</template>

<script>
    export default {
        props: ['article']
    }
</script>
