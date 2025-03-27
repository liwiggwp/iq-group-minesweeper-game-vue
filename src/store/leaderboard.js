const state = {
  leaderboard: JSON.parse(localStorage.getItem("leaderboard")) || [],
};

const getters = {
  TOPLEADERS: (state) => state.leaderboard,
};

const mutations = {
  ADD_LEADER(state, record) {
    state.leaderboard.push(record);
    state.leaderboard.sort((a, b) => a.time - b.time);
    state.leaderboard = state.leaderboard.slice(0, 10);
    localStorage.setItem("leaderboard", JSON.stringify(state.leaderboard));
  },
};

export default {
  state,
  getters,
  mutations,
};
