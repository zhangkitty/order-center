import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Select, Spin, Button, message } from 'antd';
import { commit, getInfo, infoCommit, getCity, save } from './action';
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
      cities, citySource, districtSource, orderId, billno,
    } = this.props;
    const {
      gender,
      first_name,
      last_name,
      country_id,
      state,
      city,
      district,
      street,
      address_line_1,
      address_line_2,
      post,
      telephone,
      country_value,
      national_id,
      father_name,
    } = submitValue;
    if (ready) {
      return (
        <form
          className={style.form}
          onSubmit={(e) => {
            e.preventDefault();
            if (country_value !== 'TW' && country_value !== 'HK' && !state) {
              return message.warning(lan.needState);
            }
            if (!city) {
              return message.warning(lan.needCity);
            }
            if ((country_value === 'SA' || country_value === 'TW' || country_value === 'HK') && !district) {
              return message.warning(lan.needDistrict);
            }
            return dispatch(save(submitValue, billno));
          }}
        >
          <div>
            <span className={style.spanWidth}>{Star}{__('order.entry.address_gender')}:</span>
            <Input
              value={gender}
              style={{ width: '30%' }}
              required
              onChange={e => dispatch(infoCommit('gender', e.target.value))}
            />
          </div>
          <div>
            <span className={style.spanWidth}>{Star}{__('order.entry.address_first')}:</span>
            <Input
              value={first_name}
              required
              style={{ width: '30%' }}
              onChange={e => dispatch(infoCommit('first_name', e.target.value))}
            />
          </div>
          <div>
            <span className={style.spanWidth}>{country_value !== 'IN' ? Star : null}{__('order.entry.address_last')}:</span>
            <Input
              value={last_name}
              required={country_value !== 'IN'}
              style={{ width: '30%' }}
              onChange={e => dispatch(infoCommit('last_name', e.target.value))}
            />
          </div>
          {
            country_value === 'RU' &&
            <div>
              <span className={style.spanWidth}>{Star}{__('order.entry.address_father')}:</span>
              <Input
                value={father_name}
                required
                onChange={e => dispatch(infoCommit('father_name', e.target.value))}
                style={{ width: '30%' }}
              />
            </div>
          }
          <div>
            <span className={style.spanWidth}>{Star}{__('order.entry.address_country')}:</span>
            <Select
              value={country_id}
              style={{ width: '30%' }}
              showSearch
              filterOption={(ip, { props }) => (
                props.children.toLowerCase().indexOf(ip.toLowerCase()) >= 0
              )}
              onChange={(e) => {
                const cv = country_list.find(v => v.id === e).value;
                dispatch(infoCommit('country_id', e));
                dispatch(infoCommit('country_value', cv));
                dispatch(getCity(cv));
              }}
            >
              {
                country_list.map(v => (
                  <Op key={v.id}>{v.country}</Op>
                ))
              }
            </Select>
          </div>
          <div>
            <span className={style.spanWidth}>{country_value !== 'TW' && country_value !== 'HK' ? Star : null}{__('order.entry.address_state')}:</span>
            <Select
              value={state}
              style={{ width: '30%' }}
              mode="combobox"
              showSearch
              filterOption={(ip, { props }) => (
                props.children.toLowerCase().indexOf(ip.toLowerCase()) >= 0
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
          <div>
            <span className={style.spanWidth}>{Star}{__('order.entry.address_city')}:</span>
            <Select
              value={city}
              style={{ width: '30%' }}
              mode="combobox"
              showSearch
              filterOption={(ip, { props }) => (
                props.children.toLowerCase().indexOf(ip.toLowerCase()) >= 0
              )}
              onChange={(v) => {
                dispatch(infoCommit('city', v));
                const obj = citySource.find(d => d.city_name === v);
                if (obj) {
                  dispatch(commit('districtSource', obj.district));
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
          {
            (country_value === 'SA' || country_value === 'TW' || country_value === 'HK')
            &&
            <div>
              <span className={style.spanWidth}>{Star}{__('order.entry.address_district')}:</span>
              <Select
                value={district}
                style={{ width: '30%' }}
                mode="combobox"
                showSearch
                filterOption={(ip, { props }) => (
                  props.children.toLowerCase().indexOf(ip.toLowerCase()) >= 0
                )}
                onChange={v => dispatch(infoCommit('district', v))}
              >
                {
                  districtSource.map(v => (
                    <Op key={v.city_name}>{v.city_name}</Op>
                  ))
                }
              </Select>
            </div>
          }
          {
            (country_value === 'SA' || country_value === 'KW' || country_value === 'BH' ||
            country_value === 'OM' || country_value === 'KA' || country_value === 'AE' || country_value === 'IN')
            &&
            <div>
              <span className={style.spanWidth}>{country_value !== 'IN' ? Star : null}{__('order.entry.address_street')}:</span>
              <Input
                required={country_value !== 'IN'}
                value={street}
                style={{ width: '30%' }}
                onChange={e => dispatch(infoCommit('street', e.target.value))}
              />
            </div>
          }
          <div>
            <span className={style.spanWidth}>{Star}{__('order.entry.address1')}:</span>
            <TA
              required
              value={address_line_1}
              style={{ width: '30%' }}
              onChange={e => dispatch(infoCommit('address_line_1', e.target.value))}
            />
          </div>
          <div>
            <span className={style.spanWidth}>{__('order.entry.address2')}:</span>
            <TA
              value={address_line_2}
              style={{ width: '30%' }}
              onChange={e => dispatch(infoCommit('address_line_2', e.target.value))}
            />
          </div>
          <div>
            <span className={style.spanWidth}>{Star}{__('order.entry.address_post')}:</span>
            <Input
              required
              value={post}
              style={{ width: '30%' }}
              onChange={e => dispatch(infoCommit('post', e.target.value))}
            />
          </div>
          <div>
            <span className={style.spanWidth}>{__('order.entry.address_telephone')}:</span>
            <Input
              required
              value={telephone}
              style={{ width: '30%' }}
              onChange={e => dispatch(infoCommit('telephone', e.target.value))}
            />
          </div>
          {
            country_value === 'SA' &&
            <div>
              <span className={style.spanWidth}>{__('order.entry.address_national')}:</span>
              <Input
                required
                style={{ width: '30%' }}
                value={national_id}
                onChange={e => dispatch(infoCommit('national_id', e.target.value))}
              />
            </div>
          }
          <div>
            <span className={style.spanWidth} />
            <Button onClick={() => dispatch(commit('submitValue', { order_id: orderId }))}>{lan.reset}</Button>
            <Button htmlType="submit" type="primary" loading={load} style={{ marginLeft: '35px' }}>
              {lan.save}
            </Button>
          </div>
        </form>
      );
    }
    return <Spin />;
  }
}
EditAddress.propTypes = {
  ready: PropTypes.bool,
  load: PropTypes.bool,
  provinceLoad: PropTypes.bool,
  dispatch: PropTypes.func,
  params: PropTypes.shape(),
  submitValue: PropTypes.shape(),
  orderId: PropTypes.string,
  billno: PropTypes.string,
  country_list: PropTypes.arrayOf(PropTypes.shape()),
  cities: PropTypes.arrayOf(PropTypes.shape()),
  citySource: PropTypes.arrayOf(PropTypes.shape()),
  districtSource: PropTypes.arrayOf(PropTypes.shape()),
};
const mapStateToProps = state => state['order/details/edit-address'];
export default connect(mapStateToProps)(EditAddress);
