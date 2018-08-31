import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'components'
import syllable from 'syllable'

import * as modalActionCreators from 'redux/modules/modal'
import * as haikuActionCreators from 'redux/modules/haikus'

const mapStateToProps =({ modal, users }) => ({
  user: users[users.authedId] ? users[users.authedId].info : {},
  isOpen: modal.isOpen,
  haikuText: modal.haikuText,
/********************** add logic for haiku check here maybe? **********************************/
  isSubmitDisabled: syllable(modal.haikuText) != 17

  // isSubmitDisabled: modal.haikuText.length <= 0 || modal.haikuText.length > 140
})


const mapDispatchToProps = dispatch => (
  bindActionCreators({...modalActionCreators, ...haikuActionCreators}, dispatch)
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
