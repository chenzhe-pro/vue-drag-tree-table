/**
 * Created by chenzhe on 2019/8/5.
 * index入口的公共ajax服务请求
 */
import axios from '../../axios'

export default {
  getMyPrj() {
    try {
      return axios({
        method: "get",
        url: 'workbench/project',
        params: {}
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  getMyPrjPagination(data) {
    try {
      return axios({
        method: "post",
        url: 'workbench/project/query',
        data: data
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  getMyTask() {
    try {
      return axios({
        method: "get",
        url: 'workbench/task',
        params: {}
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
  getMyTaskPagination(data) {
    try {
      return axios({
        method: "post",
        url: 'workbench/task/query',
        data: data
      });
    } catch (e) {
      console.log(e);
      return false;
    }
  },
}