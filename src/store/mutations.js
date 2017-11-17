import {
    HEADER_TITLE
} from './mutation-types'

export default {
  [HEADER_TITLE] (state, title) {
    state.title = title
  },
  FOOTBARSTATE (state, boolean) {
    state.footBarState = boolean
  }
}
