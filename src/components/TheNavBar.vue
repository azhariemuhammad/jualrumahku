<template>
<div>
    
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <router-link :to="{path: '/'}">
          <span class="mdl-layout-title">Jual-Rumahku</span>
          </router-link>
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <router-link :to="{path: '/admin'}"><a class="mdl-navigation__link" href="">Admin</a>
            </router-link>
            <a class="mdl-navigation__link" href="">Link</a>
            <a class="mdl-navigation__link" href="">Link</a>
            <button class="mdl-button mdl-js-button mdl-button--raised" @click="show">
              Account
            </button>
          </nav>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Title</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
          <a class="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>

    <modal name="hello-world">
      <div id="card-modal">
        <div v-if="!isLogin">
          <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">Login</h2>
            </div>
            <div class="mdl-card__supporting-text">
              Discover the latest properties for rent across Indonesia. JualRumahku allows you to search for the latest properties to rent in your ideal suburb.
            </div>
            
            <div class="mdl-card__actions mdl-card--border">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="loginGoogle">
                Login with Google
              </a>
          </div>
        </div>
        <div v-else>
          <div class="mdl-card__title mdl-card--expand">
          <h2 class="mdl-card__title-text">Hello, {{ username }}</h2>
            </div>
            <div class="mdl-card__supporting-text">
              Discover the latest properties for rent across Indonesia. JualRumahku allows you to search for the latest properties to rent in your ideal suburb.
            </div>
            
            <div class="mdl-card__actions mdl-card--border">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="logout">
                Logout
              </a>
          </div>
        </div>
        
      </div>
    </modal>
</div>
  
</template>

<script>
import firebase from 'firebase'
import { mapActions } from 'vuex'
export default {
  name: 'TheNavBar',
  data () {
    return {
      provider1: '',
      username: '',
      isLogin: false,
      formLogin: {
        email: '',
        username: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'createUser',
      'signout'
    ]),
    show () {
      this.$modal.show('hello-world')
    },
    hide () {
      this.$modal.hide('hello-world')
    },
    login: function () {
      console.log('hello')
      this.createUser(this.formLogin)
    },
    loginGoogle: function () {
      console.log('hello')
      let provider1 = new firebase.auth.GoogleAuthProvider()
      provider1.addScope('https://www.googleapis.com/auth/contacts.readonly')
      provider1.addScope('profile')
      provider1.addScope('email')
      this.auth(provider1)
    },
    logout: function () {
      let vm = this
      firebase.auth().signOut().then(function () {
        vm.username = ''
        vm.isLogin = ''
        vm.signout()
        vm.hide()
        alert('logout')
      }).catch(function (error) {
        // An error happened.
        console.log(error)
      })
    },
    auth: function (provider) {
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          console.log('token: ', result.user.photoURL)
          let user = result.user
          this.formLogin.email = user.email
          this.formLogin.username = user.displayName
          this.formLogin.photo = user.photoURL
          this.formLogin.uid = user.uid
          console.log('user: ', result.user)
          console.log(this.formLogin)
          this.username = user.displayName
          this.isLogin = true
          this.createUser(this.formLogin)
          this.hide()
        })
        .catch(err => alert(err.message))
    }
  },
  created () {
    if (localStorage.getItem('uidRumah')) {
      this.username = localStorage.getItem('username')
      this.isLogin = true
    }
  }
}
</script>

<style>
.v--modal-box.v--modal {
  height: 375px !important;
}

.mdl-card__supporting-text {
  font-size: 18px;
}
* { box-sizing:border-box; }

body {
	font-family: Helvetica;
	background: #eee;
  -webkit-font-smoothing: antialiased;
}

hgroup { 
	text-align:center;
	margin-top: 1em;
}

h1, h3 { font-weight: 300; }

h1 { color: #636363; }

h3 { color: #4a89dc; }

form {
	width: 380px;
	margin: 0.5em auto;
	padding: 0em 2em 2em 0.5em;
	background: #fafafa;
	border: 1px solid #ebebeb;
	box-shadow: rgba(0,0,0,0.14902) 0px 1px 1px 0px,rgba(0,0,0,0.09804) 0px 1px 2px 0px;
}

.group { 
	position: relative; 
	margin-bottom: 45px; 
}

input {
	font-size: 18px;
	padding: 5px 5px 5px 2.5px;
	-webkit-appearance: none;
	display: block;
	background: #fafafa;
	color: #636363;
	width: 100%;
	border: none;
	border-radius: 0;
	border-bottom: 1px solid #757575;
}

input:focus { outline: none; }


/* Label */

label {
	color: #999; 
	font-size: 18px;
	font-weight: normal;
	position: absolute;
	pointer-events: none;
	left: 2.5px;
	top: 5px;
	transition: all 0.2s ease;
}


/* active */

input:focus ~ label, input.used ~ label {
	top: -20px;
  transform: scale(.75); left: -2px;
	/* font-size: 14px; */
	color: #4a89dc;
}


/* Underline */

.bar {
	position: relative;
	display: block;
	width: 100%;
}

.bar:before, .bar:after {
	content: '';
	height: 2px; 
	width: 0;
	bottom: 1px; 
	position: absolute;
	background: #4a89dc; 
	transition: all 0.2s ease;
}

.bar:before { left: 50%; }

.bar:after { right: 50%; }


/* active */

input:focus ~ .bar:before, input:focus ~ .bar:after { width: 50%; }


/* Highlight */

.highlight {
	position: absolute;
	height: 60%; 
	width: 100px; 
	top: 25%; 
	left: 0;
	pointer-events: none;
	opacity: 0.5;
}


/* active */

input:focus ~ .highlight {
	animation: inputHighlighter 0.3s ease;
}


/* Animations */

@keyframes inputHighlighter {
	from { background: #4a89dc; }
	to 	{ width: 0; background: transparent; }
}


/* Button */

.button {
  position: relative;
  display: inline-block;
  padding: 12px 24px;
  margin: .3em 0 1em 0;
  width: 100%;
  vertical-align: middle;
  color: #fff;
  font-size: 16px;
  line-height: 20px;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  letter-spacing: 1px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid #3160B6;
  cursor: pointer;
  transition: all 0.15s ease;
}
.button:focus { outline: 0; }


/* Button modifiers */

.buttonBlue {
  background: #4a89dc;
  text-shadow: 1px 1px 0 rgba(39, 110, 204, .5);
}

.buttonBlue:hover { background: #357bd8; }


/* Ripples container */

.ripples {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
}


/* Ripples circle */

.ripplesCircle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
}

.ripples.is-active .ripplesCircle {
  animation: ripples .4s ease-in;
}


/* Ripples animation */

@keyframes ripples {
  0% { opacity: 0; }

  25% { opacity: 1; }

  100% {
    width: 200%;
    padding-bottom: 200%;
    opacity: 0;
  }
}

</style>
