import axios from 'axios'

const http = axios.create({
  baseURL: 'https://us-central1-project-sirius-1510852092492.cloudfunctions.net/app/api/'
})

const actions = {
  createUser: ({ commit }, payload) => {
    http.post('users', {
      email: payload.email,
      username: payload.username
    })
      .then(({ data }) => {
        commit('saveUser', data.user)
      })
      .catch(err => console.log(err))
  },
  signout: ({ commit }, payload) => {
    commit('removeUser')
  },
  getDataHouses: ({ commit }, payload) => {
    http.get('houses')
      .then(({ data }) => {
        commit('setData', data)
      })
      .catch(err => console.log(err))
  },
  postHouse: ({ commit }, payload) => {
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
      .then(({ data }) => {
        commit('setNewData', data)
      })
      .catch(err => console.log(err))
  },
  editPost: ({ commit }, payload) => {
    commit('setEdit', payload)
  },
  deleteHouse: ({ commit }, payload) => {
    http.delete(`house/${payload._id}`)
      .then(({ data }) => {
        commit('remove', data)
      })
      .catch(err => console.log(err))
  },
  updateHouse: ({ commit }, payload) => {
    http.put(`houses/${payload.id}`, {
      title: payload.title,
      desc: payload.desc,
      photoDenah: payload.downloadURL,
      lat: payload.lat,
      lng: payload.lng,
      address: payload.address,
      price: payload.price
    })
      .then(({ data }) => {
        commit('updateStateHouse', data)
      })
      .catch(err => console.log(err))
  },
  findHouseByUid: ({ commit }, payload) => {
    http.get(`houses/user/${localStorage.getItem('uidRumah')}`)
      .then(({ data }) => {
        commit('setDataBasedUid', data)
      })
      .catch(err => console.log(err))
  },
  filter: ({ commit }, payload) => {
    commit('filterHome', payload)
  }
}

export default actions
