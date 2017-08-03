<template>
    <div>
        <div class="wrapper">
            <div class="tape" v-bind:class="{ tapeMobile: detectmob() }" >
            <!-- <div class="tape" v-if="detectmob()"> -->
                <!-- <UserProfile v-if="$route.params.modules" :has-not-pages="has_not_pages"></UserProfile> -->
                <UserProfile v-if="user && user != 'mapala'" :has-not-pages="has_not_pages"></UserProfile>

                <!-- <router-link :to="{name: 'add', params: {modules: auth.modules.username}}"
                    v-if="auth.isAuth && (!has_not_pages || !$route.params.modules) &&
                        (auth.modules.username == $route.params.modules || $route.name == 'index')" class="add_post"> -->
                <router-link :to="{name: 'add', params: {user: auth.user.username}}"
                    v-if="auth.isAuth &&
                        (auth.user.username == $route.params.user || $route.name == 'index')" class="add_post">
                    <div class="av_wrap">
                        <img class="user_av" :src="auth.user.avatar">
                    </div>
                    <div class="write_post">{{ $t("base.add") }}</div>
                </router-link>

                <el-row v-if="auth.user.username != $route.params.user && !isMobile" type="flex" class="blog-nav" justify="space-between">
                    <el-col :span="11">
                        <router-link :to="{name: 'index'}">
                            <el-button :plain="true" size="large" type="info">Блоги путешественников</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="11">
                        <router-link :to="'/mapala'">
                            <el-button :plain="true" size="large" type="info">Блог Mapala</el-button>
                        </router-link>
                    </el-col>
                </el-row>

                <div v-if="auth.user.username != $route.params.user && isMobile">
                    <el-row type="flex" class="blog-nav" justify="space-between">
                        <el-col :span="24">
                            <router-link :to="{name: 'index'}">
                                <el-button :plain="true" size="large" type="info">Блоги путешественников</el-button>
                            </router-link>
                        </el-col>
                    </el-row>
                    <el-row v-if="auth.user.username != $route.params.user" type="flex" class="blog-nav" justify="space-between">
                        <el-col :span="24">
                            <router-link :to="'/mapala'">
                                <el-button :plain="true" size="large" type="info">Блог Mapala</el-button>
                            </router-link>
                        </el-col>
                    </el-row>
                </div>

                <PostList></PostList>

              <MugenScroll v-if="!has_not_pages" tag="mu" :handler="nextPosts" :should-handle="!loading">&nbsp;</MugenScroll>
            </div>

            <component v-if="!isMobile" v-bind:is="rightView"></component>
        </div>

        <modal></modal>
    </div>
</template>

<script>
import auth from '../auth'
import bc from '../blockchains'
import finance from '../services/finance'
import MugenScroll from 'vue-mugen-scroll'
import {Page, Comment, User} from '../services'

import PostMap from '../base/PostMap.vue'
import PostList from '../page/PostList.vue'
import UserProfile from '../modules/UserProfile.vue'
import Auth from '../auth/Auth.vue'

import Modal from './Modal.vue'
import BlogMain from '../blog/BlogMain.vue'

import blockchains from '../blockchains'

export default {
    data() {
        return {
            auth: auth,
            rightView: null
        }
    },
    methods: {
        // newPost(post) {
        //     // this.pages.unshift(post)
        //     this.$store.commit('addPost', post)
        // },
        nextPosts () {
            this.$store.dispatch('nextPosts')
        },
        authorPosts (user) {
            this.$store.dispatch('authorPosts', user)
                .then(this.setRight())
        },
        // getPosts(params = {}) {
        //     if (!this.next_page) { return }
        //         this.loading = true

        //         params.page = this.next_page

        //         // Пока только посты с гео поинтом
        //         params.has_point = true

        //         if (this.$route.params.modules) {
        //             params.author__username = this.$route.params.modules
        //             this.last_user = this.$route.params.modules
        //         } else {
        //             this.last_user = ''
        //         }

        //         Page.get(params).then(res => {
        //             this.pages = this.pages.concat(res.body.results)
        //             this.has_not_pages = this.pages.length ? false : true
        //             this.next_page = res.body.next
        //             this.loading = false
        //         })
        // },
        setRight () {
            let user = this.$store.state.posts.author
            if (user == 'mapala') {
                this.rightView = BlogMain
            } else {
                this.rightView = PostMap
            }
        },
        //TODO перенести в utils и раcширить данный метод
        /**
         * detect mobile device
         * @return boolean
         */
        detectmob() {
           if(window.innerWidth <= 1000 && window.innerHeight <= 600) {
             return true;
           } else {
             return false;
           }
        }
    },

  computed: {
    loading () {
      return this.$store.state.posts.loading
    },
    has_not_pages () {
      return this.$store.state.posts.has_not_pages
    },
    user () {
      return this.$route.params.user
    },
    isMobile() {
        return this.detectmob()
    }
  },
  //TODO Костыль, в ближайшее время перенести хранение ключей в VUEX, логику блокчейн в отдельный модуль, и хуки роутинга тоже отдельно!!!
  beforeRouteEnter (to, from, next) {
    if (to.matched.some(record => record.meta.needPosting && !blockchains.bc_list[0].wif)) {
        this.$alert(
            'Добавьте, пожалуйста, ПРИВАТНЫЙ постинг ключ в настройках аккаунта', {
              confirmButtonText: 'Хорошо'
            }
          )
        next('/settings')
    } else {
        next()
    }
  },
  beforeRouteUpdate (to, from, next) {
    var user = to.params.user
    var userFrom = from.params.user
    if (to.matched.some(record => record.meta.isModal) || from.matched.some(record => record.meta.isModal)) {
        if (to.matched.some(record => record.meta.needPosting && !blockchains.bc_list[0].wif)) {
            this.$alert(
                'Добавьте, пожалуйста, ПРИВАТНЫЙ постинг ключ в настройках аккаунта.', {
                  confirmButtonText: 'Хорошо'
                }
              )
            next('/settings')
        }
        if (userFrom && userFrom == 'mapala') {
            this.rightView = BlogMain
        }
        if (user && user != this.$store.state.posts.author && from.name == 'page') {
            this.authorPosts(user)
            next()
        } else {
            next()
        }
    } else {
        this.authorPosts(user)
        next()
    }
  },
  created() {
    let user = this.$route.params.user
    this.authorPosts(user)
  },
    components: {
        MugenScroll,
        PostList,
        UserProfile,
        PostMap,
        Modal,
        BlogMain
    }
}
</script>

<style>
    .hideScroll {
        overflow-y: hidden;
    }
    .blog-nav {
        margin-bottom: 25px;
        text-align: center;
    }
    .blog-nav button {
        width: 100%;
    }
    .blog-nav .router-link-exact-active button {
        border-color: #50bfff;
        color: #50bfff;
    }
    .el-notification__content {
        text-align: left;
    }
    .tapeMobile {
        margin-left: 0!important;
    }
</style>
