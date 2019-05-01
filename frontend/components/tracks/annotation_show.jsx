import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import { fetchTrack } from '../../actions/track_actions';


class AnnotationShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.fetchTrack(this.props.track.id)
  }

  render() {
    let annoId = this.props.annotProps.id;
    const annotation = (id) => {
        return this.props.annotations.map(anno => {
            if (anno.id == id){ 
                return anno.content;} })}

    return (
      <div className="annotation-container">
        <p style={{fontSize: "10px", 
                  textTransform: "uppercase", 
                  fontWeight: "bold"}}>Scenius Annotation</p>
        <p>{annotation(annoId)}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    annotations: state.entities.tracks.annotations,
    track: state.entities.tracks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrack: (id) => dispatch(fetchTrack(id)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationShow);