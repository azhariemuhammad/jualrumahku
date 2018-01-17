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

export default mutations
