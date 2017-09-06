import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DetailsEntry extends Component {
  render() {
    return(
      <div></div>
    )
  }

}

const mapStateToProps = state => state['order/details/entry'];
export default connect(mapStateToProps)(DetailsEntry);
