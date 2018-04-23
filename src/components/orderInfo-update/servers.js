import fetch from '../../lib/fetch';


export const getOrderUploadListSer = () => fetch('/OrderUpload/getOrderUploadList', {
  method: 'get',
});

