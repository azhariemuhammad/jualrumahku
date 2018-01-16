import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'https://us-central1-project-sirius-1510852092492.cloudfunctions.net/app/api/'
})
const state = {
  username: localStorage.getItem('username'),
  email: localStorage.getItem('email'),
  houses: [],
  filterHouse: [],
  editItem: [],
  housesBaseUid: []
}

const mutations = {
  saveUser: function (state, payload) {
    localStorage.setItem('uidRumah', payload._id)
    localStorage.setItem('email', payload.email)
    localStorage.setItem('username', payload.username)
    alert('succes login')
  },
  removeUser: function (state, payload) {
    localStorage.removeItem('uidRumah')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
  },
  setData: function (state, payload) {
    state.houses = payload
    state.filterHouse = payload
  },
  setNewData: function (state, payload) {
    state.houses.push(payload)
    alert('succes create data')
  },
  setDataBasedUid: function (state, payload) {
    state.housesBaseUid = payload
  },
  updateStateHouse: function (state, payload) {
    console.log(payload)
    state.houses.forEach((element, index) => {
      if (element._id === payload._id) {
        state.houses.splice(index, 1, payload)
        state.editItem = []
      }
    })
  },
  setEdit: function (state, payload) {
    state.editItem = payload
  },
  remove: function (state, payload) {
    let index = state.housesBaseUid.findIndex(x => {
      return x._id === payload._id
    })
    console.log(index)
  },
  filterHome: function (state, payload) {
    state.filterHouse = state.houses.filter(item => {
      return item.title.toLowerCase().includes(payload.toLowerCase()) ||
      item.address.toLowerCase().includes(payload.toLowerCase())
    })
  }
}

const actions = {
  createUser: ({commit}, payload) => {
    http.post('users', {
      email: payload.email,
      username: payload.username
    })
      .then(({data}) => {
        commit('saveUser', data.user)
      })
      .catch(err => console.log(err))
  },
  signout: ({commit}, payload) => {
    commit('removeUser')
  },
  getDataHouses: ({commit}, payload) => {
    http.get('houses')
      .then(({data}) => {
        commit('setData', data)
      })
      .catch(err => console.log(err))
  },
  postHouse: ({commit}, payload) => {
    http.post('houses', {
      title: payload.title,
      userId: localStorage.getItem('uidRumah'),
      desc: payload.desc,
      photoDenah: payload.downloadURL,
      lat: payload.lat,
      lng: payload.lng,
      address: payload.address,
      price: payload.price
    })
      .then(({data}) => {
        commit('setNewData', data)
      })
      .catch(err => console.log(err))
  },
  editPost: ({commit}, payload) => {
    commit('setEdit', payload)
  },
  deleteHouse: ({commit}, payload) => {
    http.delete(`house/${payload._id}`)
      .then(({ data }) => {
        commit('remove', data)
      })
      .catch(err => console.log(err))
  },
  updateHouse: ({commit}, payload) => {
    http.put(`houses/${payload.id}`, {
      title: payload.title,
      desc: payload.desc,
      photoDenah: payload.downloadURL,
      lat: payload.lat,
      lng: payload.lng,
      address: payload.address,
      price: payload.price
    })
      .then(({data}) => {
        commit('updateStateHouse', data)
      })
      .catch(err => console.log(err))
  },
  findHouseByUid: ({commit}, payload) => {
    http.get(`houses/user/${localStorage.getItem('uidRumah')}`)
      .then(({data}) => {
        commit('setDataBasedUid', data)
      })
      .catch(err => console.log(err))
  },
  filter: ({commit}, payload) => {
    commit('filterHome', payload)
  }
}

const store = new Vuex.Store({
  state,
  actions,
  mutations
})

export default store
