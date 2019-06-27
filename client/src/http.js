import axios from 'axios'
import router from './router'

// 请求拦截  设置统一header
axios.interceptors.request.use(config => {
    if (localStorage.stuToken)
        config.headers.Authorization = localStorage.stuToken
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截  
axios.interceptors.response.use(response => {
    return response
}, error => {
    // 错误提醒
    const { status } = error.response
    if (status == 401) {
        alert('您已下线，请重新登录')
        // 清除token
        localStorage.removeItem('stuToken')

        // 页面跳转
        router.push('/login')
    } else
        alert(error.response.data)

    return Promise.reject(error)
})

export default axios
