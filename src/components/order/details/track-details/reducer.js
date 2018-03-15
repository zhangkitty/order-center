import assign from 'object-assign';
import * as Types from './types';

const defaultData = {
  data: [],
};

export default (state = defaultData, action) => {
  switch (action.type) {
    case Types.PUT_DATA:
      return assign({}, state, {
        data: action.data,
        // data: [
        //   {
        //     "id": "51860",
        //     "package_status": "在途",
        //     "secondary_status_id": "14",
        //     "description": "已预报",
        //     "handle_time": "2017-12-16 22:43:00",
        //     "handle_address": "INGLEWOOD,CA 90301",
        //     "handle_content": "Shipping Label Created, USPS Awaiting Item",
        //     "status": "1",
        //     "secondary_status": "包裹信息传送"
        //   },
        //   {
        //     "id": "51861",
        //     "package_status": "在途",
        //     "secondary_status_id": "28",
        //     "description": "头程揽收",
        //     "handle_time": "2017-12-24 19:10:00",
        //     "handle_address": "INGLEWOOD,CA 90301",
        //     "handle_content": "Accepted at USPS Origin Facility",
        //     "status": "1",
        //     "secondary_status": "头程揽收"
        //   },
        //   {
        //     "id": "51862",
        //     "package_status": "在途",
        //     "secondary_status_id": "19",
        //     "description": "到达区域首处理中心",
        //     "handle_time": "2017-12-24 20:25:00",
        //     "handle_address": "LOS ANGELES CA DISTRIBUTION CENTER",
        //     "handle_content": "Arrived at USPS Regional Origin Facility",
        //     "status": "1",
        //     "secondary_status": "在途"
        //   },
        //   {
        //     "id": "51863",
        //     "package_status": "在途",
        //     "secondary_status_id": "19",
        //     "description": "发往目的地",
        //     "handle_time": "2017-12-25 12:25:00",
        //     "handle_address": "On its way to PFLUGERVILLE,TX 78660",
        //     "handle_content": "In Transit to Destination",
        //     "status": "1",
        //     "secondary_status": "在途"
        //   },
        //   {
        //     "id": "51864",
        //     "package_status": "在途",
        //     "secondary_status_id": "19",
        //     "description": "离开区域处理中心",
        //     "handle_time": "2017-12-26 04:44:00",
        //     "handle_address": "LOS ANGELES CA DISTRIBUTION CENTER",
        //     "handle_content": "Departed USPS Regional Facility",
        //     "status": "1",
        //     "secondary_status": "在途"
        //   },
        //   {
        //     "id": "51865",
        //     "package_status": "在途",
        //     "secondary_status_id": "19",
        //     "description": "到达区域处理中心",
        //     "handle_time": "2017-12-26 05:12:00",
        //     "handle_address": "LOS ANGELES CA NETWORK DISTRIBUTION CENTER",
        //     "handle_content": "Arrived at USPS Regional Facility",
        //     "status": "1",
        //     "secondary_status": "在途"
        //   },
        //   {
        //     "id": "51866",
        //     "package_status": "在途",
        //     "secondary_status_id": "19",
        //     "description": "发往目的地",
        //     "handle_time": "2017-12-27 12:28:00",
        //     "handle_address": "On its way to PFLUGERVILLE,TX 78660",
        //     "handle_content": "In Transit to Destination",
        //     "status": "1",
        //     "secondary_status": "在途"
        //   },
        //   {
        //     "id": "51867",
        //     "package_status": "在途",
        //     "secondary_status_id": "19",
        //     "description": "离开处理中心",
        //     "handle_time": "2017-12-28 01:44:00",
        //     "handle_address": "GRAPEVINE,TX 76051",
        //     "handle_content": "Departed USPS Facility",
        //     "status": "1",
        //     "secondary_status": "在途"
        //   },
        //   {
        //     "id": "51868",
        //     "package_status": "在途",
        //     "secondary_status_id": "19",
        //     "description": "到达区域处理中心",
        //     "handle_time": "2017-12-28 05:23:00",
        //     "handle_address": "AUSTIN TX DISTRIBUTION CENTER",
        //     "handle_content": "Arrived at USPS Regional Facility",
        //     "status": "1",
        //     "secondary_status": "在途"
        //   },
        //   {
        //     "id": "51869",
        //     "package_status": "在途",
        //     "secondary_status_id": "19",
        //     "description": "离开区域处理中心",
        //     "handle_time": "2017-12-28 23:15:00",
        //     "handle_address": "AUSTIN TX DISTRIBUTION CENTER",
        //     "handle_content": "Departed USPS Regional Facility",
        //     "status": "1",
        //     "secondary_status": "在途"
        //   },
        //   {
        //     "id": "51870",
        //     "package_status": "在途",
        //     "secondary_status_id": "26",
        //     "description": "到达邮局",
        //     "handle_time": "2017-12-29 05:15:00",
        //     "handle_address": "PFLUGERVILLE,TX 78660",
        //     "handle_content": "Arrived at Post Office",
        //     "status": "1",
        //     "secondary_status": "到达派送中心"
        //   },
        //   {
        //     "id": "51871",
        //     "package_status": "在途",
        //     "secondary_status_id": "26",
        //     "description": "分配派送员",
        //     "handle_time": "2017-12-29 08:24:00",
        //     "handle_address": "PFLUGERVILLE,TX 78660",
        //     "handle_content": "Sorting Complete",
        //     "status": "1",
        //     "secondary_status": "到达派送中心"
        //   },
        //   {
        //     "id": "51872",
        //     "package_status": "在途",
        //     "secondary_status_id": "16",
        //     "description": "外出派送",
        //     "handle_time": "2017-12-29 08:34:00",
        //     "handle_address": "PFLUGERVILLE,TX 78660",
        //     "handle_content": "Out for Delivery",
        //     "status": "1",
        //     "secondary_status": "外出派送"
        //   },
        //   {
        //     "id": "51873",
        //     "package_status": "签收",
        //     "secondary_status_id": "24",
        //     "description": "投入邮箱",
        //     "handle_time": "2017-12-29 11:18:00",
        //     "handle_address": "PFLUGERVILLE,TX 78660",
        //     "handle_content": "Delivered, In/At Mailbox",
        //     "status": "2",
        //     "secondary_status": "投入邮箱"
        //   }
        // ],
      });
    default:
      return state;
  }
};
