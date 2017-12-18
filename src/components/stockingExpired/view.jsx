import React from 'react';
import { connect } from 'react-redux';
import Head from './head';

class stockingExpired extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head {...this.props} />
        <div>oooo</div>
      </div>
    );
  }
}

const mapStateToProps = state => state.stockingExpired;
export default connect(mapStateToProps)(stockingExpired);
