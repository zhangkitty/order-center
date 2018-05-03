import fetch from "../../lib/fetch";
import {under2Camal} from '../../lib/camal'
import moment from 'moment'
import {parseQuery} from "../../lib/query-string";
export  const  getoverstocksearchconditionsSer = ()=>(
  fetch('/Order/getOverStockSearchConditions',{
    method:'GET'
  }).then(res=>under2Camal(res))
)

export const getoverstocklistSer = (temp)=>{
  const keys = [
    'page_number',
    'page_size',
    'billno',
    'site_from',
    'goods_sn',
    'over_date',
    'start_time',
    'end_time',
    'status',
    'is_cod',
    'is_trouble',

  ];
  return fetch('/Order/getOverStockList',{
    method:'POST',
    body: JSON.stringify(parseQuery(keys,temp))
  }).then(res=>under2Camal(res))
}
