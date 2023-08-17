export default {
  userId(state) {
    return state.UserId;
  },
  IsSuperUser(state)
  {
    return state.IsSuperUser;
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
