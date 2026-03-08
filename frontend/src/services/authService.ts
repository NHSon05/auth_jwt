import api from '@/lib/axios'

export const authService = {
    signUp: async(
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string
    ) => {
        const res = await api.post(
            "/auth/signup",
            {username, password, email, firstName, lastName},
            {withCredentials: true}
        )
        return res.data
    },
    signIn: async ( username: string, password: string) => {
        const res = await api.post(
            "auth/login",
            {username, password},
            {withCredentials: true}
        )
        return res.data;  // access token server response
    },
    signOut: async () => {
        return api.post('/auth/signout', {}, {withCredentials: true})
    },
    fetchMe: async () => {
        const res = await api.get('users/me', {withCredentials: true})
        return res.data.user
    }
}