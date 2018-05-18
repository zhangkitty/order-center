import React from 'react';
import { connect } from 'react-redux';
import { change, init } from './action';
import Head from './head';

class UserComments extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(init());
  }

  render() {
    return (
      <div>
        <Head {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => state['user-comments'];

export default connect(mapStateToProps)(UserComments);
