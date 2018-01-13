import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'https://us-central1-project-sirius-1510852092492.cloudfunctions.net/app/api/'
})
const state = {
  username: '',
  email: ''
}

const mutations = {
  saveUser: function (state, payload) {
    state.username = payload.username
    state.email = payload.email
  }
}

const actions = {
  createUser: ({commit}, payload) => {
    console.log('payload user: ', payload)
    http.post('users', {
      email: payload.email,
      username: payload.username
    })
      .then(({data}) => {
        console.log('data Create User: ', data)
        commit('saveUser', data.user)
      })
      .catch(err => console.log(err))
  },
  getDataHouses: ({commit}, payload) => {
    console.log('eee')
    http.get('houses')
      .then(({data}) => {
        console.log('house', data)
      })
      .catch(err => console.log(err))
  },
  postHouse: ({commit}, payload) => {
    console.log('payload: ', payload)
    http.post('houses', {
      title: payload.title,
      desc: payload.desc,
      photoDenah: payload.photoDenah,
      price: payload.price
    })
      .then(({data}) => {
        console.log(data, 'darta tat')
      })
      .catch(err => console.log(err))
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
