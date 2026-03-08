import { useAuthStore } from "@/stores/useAuthStore"
import { Navigate, Outlet } from "react-router"

const ProtectedRoute = () => {
    const {accessToken, user, loading} =  useAuthStore()

    if (!accessToken) {
        return (
            <Navigate
                to='/login'
                replace
            />
        )
    }

    return (
        <div>
            {/* Hiển thị root con bên trong root cha */}
            <Outlet>
                
            </Outlet>
        </div>
    )
}

export default ProtectedRoute