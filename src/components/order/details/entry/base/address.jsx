import React  from 'react';
import { Card } from 'antd';

const info = {
  sadrr: {
    left: [
      { name: 'Name', key: 'name' },
      { name: 'Address Line 1', key: 'address_1' },
      { name: 'Address Line 2', key: 'address_2' },
      { name: 'City', key: 'city' },
      { name: 'Country', key: 'country' },
      { name: 'Telephone', key: 'telephone' },
      { name: '退货邮箱', key: 'email' },
    ],
    right: [
      { name: 'Company Name', key: 'company_name' },
      { name: 'State/Province', key: 'state' },
      { name: 'Post/Zip Code', key: 'post' },
      { name: 'Fax', key: 'fax' },
    ],
  },
  badrr: {
    left: [
      { name: 'Name', key: 'name' },
      { name: 'Address Line 1', key: 'address_1' },
      { name: 'Address Line 2', key: 'address_2' },
      { name: 'City', key: 'city' },
      { name: 'Country', key: 'country' },
      { name: 'Telephone', key: 'telephone' },
    ],
    right: [
      { name: 'Company Name', key: 'company_name' },
      { name: 'State/Province', key: 'state' },
      { name: 'Post/Zip Code', key: 'post' },
      { name: 'Fax', key: 'fax' },
    ],
  }
};
export default ({ order_info: { shipping_address, billing_address } }) => (
  <div>
    <Card>
      <div>
        {
          info.sadrr.left.map(v => (
            <div key={v.key}>
              <span>{ v.name }:</span>
              <span>{shipping_address[v.key]}</span>
            </div>
          ))
        }
      </div>
      <div>
        {
          info.sadrr.right.map(v => (
            <div key={v.key}>
              <span>{ v.name }:</span>
              <span>{shipping_address[v.key]}</span>
            </div>
          ))
        }
      </div>
    </Card>
    <Card>
      <div>
        {
          info.badrr.left.map(v => (
            <div key={v.key}>
              <span>{ v.name }:</span>
              <span>{billing_address[v.key]}</span>
            </div>
          ))
        }
      </div>
      <div>
        {
          info.badrr.right.map(v => (
            <div key={v.key}>
              <span>{ v.name }:</span>
              <span>{billing_address[v.key]}</span>
            </div>
          ))
        }
      </div>
    </Card>
  </div>
)