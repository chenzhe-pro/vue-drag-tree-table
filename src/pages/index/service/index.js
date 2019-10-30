/**
 * Created by chenzhe on 2019/5/5.
 * index入口的公共ajax服务请求
 */
import axios from '../axios'

export default {
  getCurrentUser() {
    try {
      return axios({
        method: "get",
        url: 'account/current',
        params: {}
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  downloadDoc(fileId){
    try {
      return axios({
        method: "get",
        url: `file/download/${fileId}`,
        params: {},
        responseType: 'blob'
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
