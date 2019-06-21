import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams, deleteStream } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  onDeleteStream = () => {};

  renderAdmin = stream => {
    if (this.props.currentUserId === stream.userId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui primary button">
            Edit
          </Link>
          <button onClick={this.onDeleteStream}>Delete</button>
        </div>
      );
    }
  };
  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description} </div>
          </div>
          <div className="right menu">{this.renderAdmin(stream)}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()} </div>
        <div className="ui right floated menu">
          <Link to="/streams/new" className="ui primary button">
            new stream
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId
  };
};
export default connect(
  mapStateToProps,
  { fetchStreams, deleteStream }
)(StreamList);
