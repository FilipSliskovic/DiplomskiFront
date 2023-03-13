export default {
  userId(state) {
    return state.UserId;
  },
  Token(state) {
    return state.Token;
  },
  IsAuthenticated(state) {
    if (state.Token) {
      return true;
    } else {
      return false;
    }
  },
};
