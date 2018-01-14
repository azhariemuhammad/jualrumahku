import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'https://us-central1-project-sirius-1510852092492.cloudfunctions.net/app/api/'
})
const state = {
  username: '',
  email: '',
  houses: [],
  editItem: []
}

const mutations = {
  saveUser: function (state, payload) {
    state.username = payload.username
    state.email = payload.email
    localStorage.setItem('uid', payload._id)
    localStorage.setItem('email', payload.email)
    localStorage.setItem('username', payload.username)
  },
  setData: function (state, payload) {
    state.houses = payload
  },
  setNewData: function (state, payload) {
    state.houses.push(payload)
  },
  updateStateHouse: function (state, payload) {
    console.log(payload)
    state.houses.forEach((element, index) => {
      if (element._id === payload._id) {
        state.houses.splice(index, 1, payload)
      }
    })
  },
  setEdit: function (state, payload) {
    state.editItem = payload
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
        commit('setData', data)
      })
      .catch(err => console.log(err))
  },
  postHouse: ({commit}, payload) => {
    console.log('payload: ', payload)
    http.post('houses', {
      title: payload.title,
      desc: payload.desc,
      photoDenah: payload.downloadURL,
      price: payload.price
    })
      .then(({data}) => {
        console.log(data, 'darta tat')
        commit('setNewData', data)
      })
      .catch(err => console.log(err))
  },
  editPost: ({commit}, payload) => {
    commit('setEdit', payload)
  },
  updateHouse: ({commit}, payload) => {
    console.log('payload, ', payload)
    http.put(`houses/${payload.id}`, {
      title: payload.title,
      desc: payload.desc,
      photoDenah: payload.downloadURL,
      price: payload.price
    })
      .then(({data}) => {
        console.log(data)
        commit('updateStateHouse', data)
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
