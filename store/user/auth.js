// import Cookie from 'cookie'
// import Cookies from 'js-cookie'

export const state = () => ({
  isAuth: false,
  token: ''
})

export const mutations = {
}

export const actions = {
}
//
// export const actions = {
//   async refreshToken() { // TODO make async/await ES7
//     // return http.post(JWT_REFRESH_URL, {token: store.get('jwt')});
//   },
//
//   update () {
//     return User.update({username: this.user.username}, this.user)
//   },
//
//   login(context, creds, redirect) {
//     context.$http.post(JWT_AUTH_URL, creds).then(res => {
//       store.set('jwt', res.body.token)
//
//       this.isAuth = true
//       this.user = res.body.user
//       blockchains.initBlockchains()
//       if (redirect) { context.$router.push(redirect) }
//
//     }, res => {
//       showErrors(res.body, context)
//     })
//   },
//
//   existngSignUp(context, creds, redirect) {
//     User.existngSignUp(creds).then(res => {
//       store.clearAll()
//
//       store.set('jwt', res.body.token)
//       this.isAuth = true
//       this.user = res.body.user
//
//       // Добавляем ключ для голоса
//       store.set(`golos_${this.user.username}_posting_key`, creds.wif)
//       blockchains.initBlockchains()
//
//       if (redirect) { context.$router.push(redirect) }
//
//     }, res => {
//       showErrors(res.body, context)
//     })
//   },
//
//   signUp(context, creds, redirect) {
//     User.signUp(creds).then(res => {
//       store.clearAll()
//
//       store.set('jwt', res.body.token)
//       this.isAuth = true
//       this.user = res.body.user
//
//       // Добавляем ключ для голоса
//       store.set(`golos_${this.user.username}_posting_key`, res.body.posting_key)
//       blockchains.initBlockchains()
//
//       context.$alert(
//         res.body.posting_key,
//         'Сохраните ваш приватный постинг ключ от golos.io', {
//           confirmButtonText: 'Я сохранил ключ',
//           callback: () => {
//             if (redirect) { context.$router.push(redirect) }
//           }
//         }
//       )
//
//     }, res => {
//       showErrors(res.body, context)
//     })
//   },
//
//   logout(context) {
//     this.isAuth = false
//     this.user = {}
//
//     store.remove('jwt')
//   },
//
//   checkAuth() {
//     this.isAuth = !!store.get('jwt');
//
//     // Обновим токен и запросим юзера при старте приложения
//     // Токен обновляется при каждом запуске приложения
//     if (this.isAuth) {
//       this.refreshJWT().then(res => {
//         store.set('jwt', res.body.token)
//
//         this.user = res.body.user
//         blockchains.initBlockchains()
//       }, res => {
//         // Если токен просрочен или не правильный
//         console.log('Auth error: ', res.body)
//         this.logout()
//       })
//     }
//   },
//
//   getAuthToken() {
//     let token = store.get('jwt')
//     return !!token ? 'JWT ' + token : null
//   }
//
// }
//
export const getters = {
}

