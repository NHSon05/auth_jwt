import { useAuthStore } from '@/stores/useAuthStore'
import axios from 'axios'

const api = axios.create({
    // nêu ở chế độ development thì axios gửi request tới localhost:5001/api
    // ngược lại khi build production thì nó sẽ gửi request lại /api
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api',
    // nêu không có dòngn này thì cookie sẽ không được gửi lên server
    // người dùng có thể bị logout liên tục
    withCredentials: true,
})

// gắn accessToken vào req header
// Mỗi lần request gửi đi thì nó sẽ qua hàm này trước
api.interceptors.request.use((config) => {
    // Hơi khác so với cách lấy state trong store
    // - Khi gọi useAuthStore.getState() thí nó chỉ lấy giá trị của accessToken tại thời điểm code chạy
    //      + Nếu accessToken trong store thay đổi thì access Token trong hàm này vẫn giữ nguyên
    // - Nếu dùng cú pháp thông thường ( tức là gọi useAuthStore thông thường )
    //      + Tự động theo dõi và cập nhật mỗi lần state trong store thay đổi
    const { accessToken } = useAuthStore.getState()
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

export default api