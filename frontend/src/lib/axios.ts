import axios from 'axios'

const api = axios.create({
    // nêu ở chế độ development thì axios gửi request tới localhost:5001/api
    // ngược lại khi build production thì nó sẽ gửi request lại /api
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api',
    // nêu không có dòngn này thì cookie sẽ không được gửi lên server
    // người dùng có thể bị logout liên tục
    withCredentials: true,
})

export default api