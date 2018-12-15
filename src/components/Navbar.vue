<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/" href="#"><img src="../assets/logo.png" width=30px height= 30px; alt=""></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav ml-auto">
            
            <li class="nav-item" v-if="!authUser">
                <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="!authUser">
                <router-link class="nav-link" to="/signup">Signup</router-link>
            </li>
            <li class="nav-item" v-if="authUser">
                <router-link class="nav-link" to="/articles/create">Create Article</router-link>
            </li>
            
            <li class="nav-item dropdown" v-if="authUser">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Hey {{ authUser.name }}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" @click="logout()" href="#">Logout</a>
                </div>
            </li>
            </ul>
        </div>
        </nav>

        
    </div>
</template>

<script>
    export default {
        mounted(){
            // console.log(this.$root.auth.user)
        },
        computed: {
            authUser(){
                return this.$root.auth.user;
            }
        },
        methods: {
            logout(){
                localStorage.removeItem('auth');
                this.$root.auth = {};
                this.$noty.success('good bye')
                this.$router.push('login')
            }
        }
    }
</script>