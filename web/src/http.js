import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from './router';

let loading;

// 注册后动画
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '正在加载中...',
    background: 'rgba(0,0,0,.7)'
  })
}

// 注册完成结束动画
function endLoading() {
  loading.close();
}

// 请求拦截
axios.interceptors.request.use(
  config => {
    startLoading();

    // 如果存在token
    if (localStorage.eleToken) {
      // 将token添加到请求头中
      config.headers.Authorization = localStorage.eleToken;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  response => {
    endLoading();
    return response;
  },
  error => {
    endLoading();
    Message.error(error.response.data);

    // 获取状态码
    const { status } = error.response;
    if(status == 401) {
      // 提醒
      Message.error('token失效，请重新登录!');
      // 清除过期token
      localStorage.removeItem('eletoken');
      // 跳转到登录页
      router.push('/login');
    }

    return Promise.reject(error);
  }
);

export default axios;