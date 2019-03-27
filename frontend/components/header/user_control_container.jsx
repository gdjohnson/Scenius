import { connect } from "react-redux";
import UserControl from './user_control';

export const mapStateToProps = state => {
    return ({
        currentUser: state.entities.session.currentUser
    })
}

export const mapDispatchToProps = dispatch => {
    return ({
        signOut: dispatch(sign_out())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserControl);