/**
 * Created by brook on 2017/1/11.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

const rowstyle = {
  marginTop: '10px',
};

const SpaceComPonent = (props) => {
  const {
    'data-gutter': gutter,
    'data-span1': span1,
    'data-component1': component1,
    'data-component2': component2,
    'data-span2': span2,
  } = props;
  return (
    <Row gutter={gutter || 16} style={rowstyle} {...props}>
      <Col span={span1 || 3}>
        { component1 }
      </Col>
      <Col span={span2 || 8}>
        {component2 || null}
      </Col>
    </Row>
  );
};
SpaceComPonent.propTypes = {
  'data-gutter': PropTypes.number,
  'data-span1': PropTypes.number,
  'data-span2': PropTypes.number,
  'data-component1': PropTypes.element.isRequired,
  'data-component2': PropTypes.element,
};
export default SpaceComPonent;
