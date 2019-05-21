import React from 'react';

class AnnotationForm extends React.Component {
  constructor(props) {
    super(props);
    const { track_id, currentUser, annotProps } = this.props;
    this.state = {                   
      track_id,
      user_id: currentUser.id,
      content: '',
      start_idx: annotProps.start,
      end_idx: annotProps.end,
      range: annotProps.range
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelForm = this.cancelForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      const {handleSubmit, cancelForm} = this;
      document.getElementById('anno-form').addEventListener('mousedown', 
        (e) => { 
          const { id } = e.srcElement;
          if (id == 'cancel-anno') { this.cancelForm() }
          if (id == 'save-anno') { 
            e.stopPropagation();
            handleSubmit(); }
          else { e.stopPropagation(); } }, true)
      document.getElementById('root').addEventListener('mousedown', cancelForm, false);
    }, 1000)
  }

  cancelForm() {
    debugger
    const el = document.getElementById('temp-annotated');
    const parent = el.parentNode;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
    this.closeModal();
  }

  closeModal() {
    const {cancelForm} = this;
    document.getElementById('root').removeEventListener('mousedown', cancelForm, false);
    this.props.closeModal();
  }

  handleUpdate() {
    return (event) => this.setState({
      content: event.currentTarget.value
    });
  }

  handleSubmit() {
    delete this.state.range;
    const annotation = {... this.state};
    this.props.createAnnotation(annotation).then(
    this.closeModal)
  };
  
  render() {
    return (
        <form id="anno-form">
              <div id="new-anno-wrapper">
                <textarea
                  id="anno-input"
                  placeholder="Don't just put the lyric in your own words... drop some knowledge!"
                  onChange={this.handleUpdate()}
                  style={{cursor: "text"}}
                ></textarea>
                <div id="anno-submit">
                  <input id="save-anno" type="submit" value="Save"/>
                  <input id="cancel-anno" type="button" value="Cancel"/>
                </div>
              </div>
        </form>
    );
  }
}

export default AnnotationForm;