import React, { PropTypes } from 'react';
import { Input, Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import { filterCommit, getData } from './action';
import style from './style.css';

// TODO: lan
const lan = {
  pkgNum: '包裹号',
  qudao: '发货渠道',
  danhao: '物流单号',
  leixing: '问题类型',
  zhaungtai: '处理状态',
  jieguo: '处理结果',
  chuliren: '处理人',
  cou: '国家',
  site: '站点',
  tijiaoDate: '提交日期',
  fahuoDate: '发货日期',
  search: __('common.search'),
};

const OP = Select.Option;
const RP = DatePicker.RangePicker;
const Filters = ({
  dispatch, filters, filter, load,
}) => (
  <form
    className={style.fliterFlex}
    onSubmit={(e) => {
      e.preventDefault();
      dispatch(getData(filter));
    }}
  >
    {/* row 1 */}
    <div>
      <div>
        <span>{ lan.pkgNum }</span>
        <Input value={filter.reference_number} onChange={e => dispatch(filterCommit('reference_number', e.target.value))} />
      </div>
      <div>
        <span>{ lan.qudao }</span>
        <Input value={filter.shipping_method_real} onChange={e => dispatch(filterCommit('shipping_method_real', e.target.value))} />
      </div>
      <div>
        <span>{ lan.danhao }</span>
        <Input value={filter.shipping_no} onChange={e => dispatch(filterCommit('shipping_no', e.target.value))} />
      </div>
      <div>
        <span>{ lan.leixing }</span>
        <Select value={filter.trouble_type} onChange={v => dispatch(filterCommit('trouble_type', v))} allowClear>
          {filters.trouble_type.map(v => (<OP key={v.id}>{v.name}</OP>))}
        </Select>
      </div>
    </div>
    {/* row 2 */}
    <div>
      <div>
        <span>{ lan.zhaungtai }</span>
        <Select value={filter.handle_status} onChange={v => dispatch(filterCommit('handle_status', v))} allowClear>
          {filters.handle_status.map(v => (<OP key={v.id}>{v.name}</OP>))}
        </Select>
      </div>
      <div>
        <span>{ lan.jieguo }</span>
        <Select value={filter.handle_result} onChange={v => dispatch(filterCommit('handle_result', v))} allowClear>
          {filters.handle_result.map(v => (<OP key={v.id}>{v.name}</OP>))}
        </Select>
      </div>
      <div>
        <span>{ lan.chuliren }</span>
        <Input value={filter.handle_user_name} onChange={e => dispatch(filterCommit('handle_user_name', e.target.value))} />
      </div>
      <div>
        <span>{ lan.cou }</span>
        <Select
          mode={'multiple'}
          value={(filter.shipping_country_name ? filter.shipping_country_name.split(',') : [])}
          onChange={v => dispatch(filterCommit('shipping_country_name', v.join(',')))}
          allowClear
        >
          {filters.country.map(v => (<OP key={v.id}>{v.name}</OP>))}
        </Select>
      </div>
    </div>
    {/* row 3 */}
    <div>
      <div>
        <span>{ lan.site }</span>
        <Select
          mode={'multiple'}
          value={(filter.site_from ? filter.site_from.split(',') : [])}
          onChange={v => dispatch(filterCommit('site_from', v.join(',')))}
          allowClear
        >
          {filters.site_from.map(v => (<OP key={v.id}>{v.name}</OP>))}
        </Select>
      </div>
      <div >
        <span>{ lan.tijiaoDate }</span>
        <RP
          style={{ width: '100%' }}
          format={'YYYY-MM-DD'}
          value={[
            filter.add_time_from ? moment(filter.add_time_from) : null,
            filter.add_time_to ? moment(filter.add_time_to) : null,
          ]}
          onChange={(d, str) => {
            dispatch(filterCommit('add_time_from', str[0]));
            dispatch(filterCommit('add_time_to', str[1]));
          }}
        />
      </div>
      <div >
        <span>{ lan.fahuoDate }</span>
        <RP
          style={{ width: '100%' }}
          format={'YYYY-MM-DD'}
          value={[
            filter.delivery_time_from ? moment(filter.delivery_time_from) : null,
            filter.delivery_time_to ? moment(filter.delivery_time_to) : null,
          ]}
          onChange={(d, str) => {
            dispatch(filterCommit('delivery_time_from', str[0]));
            dispatch(filterCommit('delivery_time_to', str[1]));
          }}
        />
      </div>
    </div>
    <div className={style.searchBtn}>
      <Button
        loading={load}
        type={'primary'}
        htmlType={'submit'}
      >
        {lan.search}
      </Button>
    </div>
  </form>
);
Filters.propTypes = {
  dispatch: PropTypes.func,
  filters: PropTypes.shape(),
  filter: PropTypes.shape(),
  load: PropTypes.bool,
};
export default Filters;