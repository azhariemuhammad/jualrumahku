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
  signout: ({commit}, payload) => {
    commit('removeUser')
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
      userId: localStorage.getItem('uidRumah'),
      desc: payload.desc,
      photoDenah: payload.downloadURL,
      lat: payload.lat,
      lng: payload.lng,
      address: payload.address,
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
  deleteHouse: ({commit}, payload) => {
    console.log(payload, 'payloaddelete')
    http.delete(`house/${payload._id}`)
      .then(({ data }) => {
        console.log(data)
        commit('remove', data)
      })
      .catch(err => console.log(err))
  },
  updateHouse: ({commit}, payload) => {
    console.log('payload, ', payload)
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
        console.log(data)
        commit('updateStateHouse', data)
      })
      .catch(err => console.log(err))
  },
  findHouseByUid: ({commit}, payload) => {
    console.log('haaofoawefoi')
    http.get(`houses/user/${localStorage.getItem('uidRumah')}`)
      .then(({data}) => {
        console.log('data house: ', data)
        commit('setDataBasedUid', data)
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
