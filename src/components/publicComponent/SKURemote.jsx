/**
 * Create by liufeng on 2017/9/15
 * 模糊搜索
 */
import React from 'react';
import { Select, Spin } from 'antd';
import { debounce } from 'lodash';

const Option = Select.Option;

class RemoteSelect extends React.Component {
  constructor(props) {
    super(props);
    this.fetchUser = debounce(this.fetchUser, 300);
    this.state = {
      data: [],
      value: { key: '', label: '' },
      fetching: false,
    };
  }
  fetchUser(value) {
    this.setState({ fetching: true });
    if (value.trim().length > 4) {
      fetch(`/goods/fetchGoodsFuzzy?goodsSnLike=${encodeURIComponent(value.trim())}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // token: localStorage.getItem('token'),
        },
        method: 'GET',
      })
        .then(response => response.json())
        .then((body) => {
          if (body && body.length) {
            const data = body.map(tag => ({
              text: tag.name,
              value: tag.id,
              fetching: false,
            }));
            this.setState({ data });
          } else {
            this.setState({ fetching: false, data: body });
          }
        });
    } else {
      this.setState({ fetching: false, data: [] });
    }
  }
  handleChange(value) {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
    if (value) {
      this.props.onChange({ id: value.key, goodsSn: value.label });
    } else {
      this.props.onChange({ id: null, goodsSn: null });
    }
  }
  render() {
    const { fetching, data, value } = this.state;
    return (
      <Select
        allowClear
        labelInValue
        showSearch
        value={value}
        notFoundContent={fetching ? <Spin size="small" /> : 'Not Found'}
        filterOption={false}
        onSearch={v => this.fetchUser(v)}
        onChange={v => this.handleChange(v)}
        style={{ width: '100%' }}
      >
        {data.map(d => <Option key={d.value}>{d.text}</Option>)}
      </Select>
    );
  }
}
RemoteSelect.propTypes = {
  onChange: React.PropTypes.func,
};
export default RemoteSelect;
