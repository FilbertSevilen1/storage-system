export default function appReducer(state = initialState, action) {
    switch (action.type) {
      case 'test': {
        return {
          ...state,
          count: state.count + 1
        }
      }
      default:
        return state
    }
  }