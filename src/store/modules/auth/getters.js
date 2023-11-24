export default {
  userId(state) {
    return state.UserId;
  },
  IsSuperUser(state) {
    if (state.IsSuperUser == "True") {
      return true;
    } else {
      return false;
    }
  },
  IsWorker(state) {
    if (state.IsSuperUser == "False" && state.UseCases.includes(20)) {
      return true;
    } else {
      return false;
    }
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
