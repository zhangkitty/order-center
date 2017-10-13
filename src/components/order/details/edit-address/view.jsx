import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Select, Spin, Button, message } from 'antd';
import { commit, getInfo, infoCommit, getCity, save, getInfoShow } from './action';
import style from './style.css';

const TA = Input.TextArea;
const Op = Select.Option;
const Star = (<span style={{ color: 'red' }}>*</span>);
const lan = {
  save: __('order.entry.save'),
  reset: __('order.entry.cancel1'),
  needState: __('order.entry.submit_title'),
  needCity: __('order.entry.submit_title1'),
  needDistrict: __('order.entry.submit_title2'),
  need: __('order.entry.order_return_15'),
};
const addressLine = {
  address_line_1: __('order.entry.address1'),
  address_line_2: __('order.entry.address2'),
};
class EditAddress extends Component {
  constructor(props) {
    super(props);
    const { ready, dispatch, params: { id, bid }, orderId } = props;
    if (!ready || id !== orderId) {
      dispatch(getInfo(id));
    }
    dispatch(commit('orderId', id));
    dispatch(commit('billno', bid));
  }

  render() {
    const {
      ready, dispatch, submitValue, country_list, load, provinceLoad,
      cities, citySource, districtSource, orderId, billno, addressShow,
      show,
    } = this.props;
    const {
      site_from,
      country_id,
      state,
      city,
      district,
    } = submitValue;
    if (ready) {
      return (
        <form
          className={style.form}
          onSubmit={(e) => {
            e.preventDefault();
            const temp = addressShow.filter(v => v.validate);
            const isDistrict = addressShow.find(v => v.key === 'district');
            let flag = true;
            temp.every(({ key }) => {
              if (isDistrict && !district) {
                message.warning(lan.need);
                flag = false;
                return false;
              }
              if (!submitValue[key]) {
                message.warning(lan.need);
                flag = false;
                return false;
              }
              flag = true;
              return true;
            });
            return flag && dispatch(save(submitValue, billno));
          }}
        >
          <Spin spinning={show}>
            {
            addressShow.map(({ name, validate, key }) => (
              <div key={key}>
                {
                  key !== 'country_id' && key !== 'state' && key !== 'city' && key !== 'district' && key !== 'address_line_1' && key !== 'address_line_2' &&
                  <div className={style.space}>
                    <span className={style.spanWidth}>{validate && Star}{name}:</span>
                    <Input
                      value={submitValue[key]}
                      style={{ width: '30%' }}
                      required={validate}
                      onChange={e => dispatch(infoCommit(key, e.target.value))}
                    />
                  </div>
                }
                {
                  key === 'country_id' &&
                  <div className={style.space}>
                    <span className={style.spanWidth}>{Star}{__('order.entry.address_country')}:</span>
                    <Select
                      value={country_id}
                      style={{ width: '30%' }}
                      showSearch
                      filterOption={(ip, { props }) => (
                        props.children.toLowerCase().startsWith(ip.toLowerCase())
                      )}
                      onChange={(e) => {
                        const cv = country_list.find(v => v.id === e).value;
                        dispatch(infoCommit('country_id', e));
                        dispatch(infoCommit('country_value', cv));
                        dispatch(getCity(cv));
                        dispatch(getInfoShow(site_from, e));
                      }}
                    >
                      {
                        country_list.map(v => (
                          <Op key={v.id}>{v.country}</Op>
                        ))
                      }
                    </Select>
                  </div>
                }
                {
                  key === 'state' &&
                  <div className={style.space}>
                    <span className={style.spanWidth}>{validate && Star}{__('order.entry.address_state')}:</span>
                    <Select
                      value={state}
                      style={{ width: '30%' }}
                      mode="combobox"
                      showSearch
                      filterOption={(ip, { props }) => (
                        props.children.toLowerCase().startsWith(ip.toLowerCase())
                      )}
                      onChange={(v) => {
                        dispatch(infoCommit('state', v));
                        const obj = cities.find(d => d.province_name === v);
                        if (obj) {
                          dispatch(commit('citySource', obj.cities));
                        }
                      }}
                    >
                      {
                        cities.map(v => (
                          <Op key={v.province_name}>{v.province_name}</Op>
                        ))
                      }
                    </Select>
                    {
                      provinceLoad && <Spin style={{ marginLeft: '5px' }} />
                    }
                  </div>
                }
                {
                  key === 'city' &&
                  <div className={style.space}>
                    <span className={style.spanWidth}>{validate && Star}{__('order.entry.address_city')}:</span>
                    <Select
                      value={city}
                      style={{ width: '30%' }}
                      mode="combobox"
                      showSearch
                      filterOption={(ip, { props }) => (
                        props.children.toLowerCase().startsWith(ip.toLowerCase())
                      )}
                      onChange={(v) => {
                        dispatch(infoCommit('city', v));
                        const obj = citySource.find(d => d.city_name === v);
                        if (obj) {
                          dispatch(commit('districtSource', obj.district));
                        } else {
                          dispatch(commit('districtSource', []));
                        }
                      }}
                    >
                      {
                        citySource.map(v => (
                          <Op key={v.city_name}>{v.city_name}</Op>
                        ))
                      }
                    </Select>
                  </div>
                }
                {
                  key === 'district' && !!districtSource.length &&
                  <div className={style.space}>
                    <span className={style.spanWidth}>{Star}{__('order.entry.address_district')}:</span>
                    <Select
                      value={district}
                      style={{ width: '30%' }}
                      mode="combobox"
                      showSearch
                      filterOption={(ip, { props }) => (
                        props.children.toLowerCase().startsWith(ip.toLowerCase())
                      )}
                      onChange={v => dispatch(infoCommit('district', v))}
                    >
                      {
                        districtSource.map(v => (
                          <Op key={v}>{v}</Op>
                        ))
                      }
                    </Select>
                  </div>
                }
                {
                  (key === 'address_line_1' || key === 'address_line_2') &&
                  <div className={style.space}>
                    <span className={style.spanWidth}>{validate && Star}{addressLine[key]}:</span>
                    <TA
                      required={validate}
                      value={submitValue[key]}
                      style={{ width: '30%' }}
                      onChange={e => dispatch(infoCommit(key, e.target.value))}
                    />
                  </div>
                }
              </div>
            ))
          }
            <div style={{ marginTop: '15px' }}>
              <span className={style.spanWidth} />
              <Button onClick={() => dispatch(commit('submitValue', { order_id: orderId }))}>{lan.reset}</Button>
              <Button htmlType="submit" type="primary" loading={load} style={{ marginLeft: '35px' }}>
                {lan.save}
              </Button>
            </div>
          </Spin>
        </form>
      );
    }
    return <Spin />;
  }
}
EditAddress.propTypes = {
  ready: PropTypes.bool,
  load: PropTypes.bool,
  show: PropTypes.bool,
  provinceLoad: PropTypes.bool,
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  submitValue: PropTypes.shape(),
  orderId: PropTypes.string,
  billno: PropTypes.string,
  country_list: PropTypes.arrayOf(PropTypes.shape()),
  addressShow: PropTypes.arrayOf(PropTypes.shape()),
  cities: PropTypes.arrayOf(PropTypes.shape()),
  citySource: PropTypes.arrayOf(PropTypes.shape()),
  districtSource: PropTypes.arrayOf(PropTypes.shape()),
};
const mapStateToProps = state => state['order/details/edit-address'];
export default connect(mapStateToProps)(EditAddress);
