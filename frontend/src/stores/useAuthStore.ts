import {create} from 'zustand'
import {toast} from 'sonner'
import { authService } from '@/services/authService'
import type { AuthState } from '@/types/store'

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    setAccessToken: (accessToken) => {
        set({accessToken})
    },
    clearState: () => {
        set({accessToken: null, user: null, loading: false})
    },

    signUp: async (username, password, email, firstName, lastName) => {
        try {   
            set({loading: true})
            // call api
            await authService.signUp(username, password, email, firstName, lastName)
            toast.success("Đăng ký thành công")
        } catch (error) {
            console.error(error)
            toast.error('Đăng ký không thành công')
        } finally {
            set({loading: false})
        }
    },
    signIn: async (username, password) => {
        try {
            set({loading: true})

            const {accessToken} = await authService.signIn(username, password)
            get().setAccessToken(accessToken);

            await get().fetchMe()

            toast.success("Chào mừng bạn quay lại")
        } catch (error) {
            console.error(error)
            toast.error("Đăng nhập không thành công")
        } finally {
            set({loading: false})
        }
    },
    signOut: async () => {
        try {
            get().clearState()
            await authService.signOut();
            toast.success("Logout thành công")
        } catch (error) {
            console.error(error)
            toast.error("Lỗi xảy ra khi logout")
        }
    },
    fetchMe: async() => {
        try {
            set({loading: true})
            const user = await authService.fetchMe()
            set({user})
        } catch (error) {
            console.log(error)
            set({user: null, accessToken: null})
            toast.error("Lỗi xảy ra khi lấy dữ liệu người dùng, hãy thử lại")
        } finally {
            set({loading: false})
        }
    }
}))