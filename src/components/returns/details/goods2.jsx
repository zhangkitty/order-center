import {Table} from 'antd'
const lan={
  未申请却退回商品信息:'未申请却退回商品信息',
  退货ＱＣ状态:'退货ＱＣ状态',
  商品图片:'商品图片',
  商品名称:'商品名称',
  尺码:'尺码',
  商品SKU:'商品SKU',
  关联退货单:'关联退货单'
}



const Goods2 = ({returnsInfoData:{yishenqingWeituihui}})=>{
  return(
    <div>
      <h3 style={{ margin: '20px 0' }}>{lan.未申请却退回商品信息}</h3>
      <Table
        size="small"
        pagination={false}
        dataSource={yishenqingWeituihui}
        rowKey={'goodsId'}
        bordered
        columns={[
          {
            title:lan.退货ＱＣ状态,
            dataIndex: 'qcState',
            width:150
          },
          {
            title:lan.商品图片,
            dataIndex:'goodsImage',
            width:150,
            render:(img,rec)=>(
              <div>
                <img src={img} alt="" width={100}/>
              </div>
            )
          },
          {
            title:lan.商品名称,
            dataIndex:"goodsName",
            width:150
          },
          {
            title:lan.商品SKU,
            dataIndex:'goodsSn',
            width:150
          },
          {
            title:lan.尺码,
            dataIndex:'size',
            width:50
          },
          {
            title:lan.关联退货单,
            dataIndex:'returnReason',
            width:150
          }
        ]}
      />
    </div>
  )
}
export default Goods2