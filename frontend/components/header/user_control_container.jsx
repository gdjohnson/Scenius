import { connect } from "react-redux";
import UserControl from './user_control';
import { openModal } from '../../actions/modal_actions';
import { signOut } from '../../actions/session_actions';

export const mapStateToProps = state => {
    return ({
        currentUser: state.entities.session.currentUser
    });
};

export const mapDispatchToProps = dispatch => {
    return ({
        signOut: () => dispatch(signOut()),
        openModal: (modal) => dispatch(openModal(modal))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(UserControl);