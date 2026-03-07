import { useAuthStore } from "@/stores/useAuthStore"
import { Button } from "../ui/button"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const Logout = () => {
    const {signOut} = useAuthStore()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await signOut()
            navigate('/login')
        } catch (error) {
            console.error("Không thể logout", error)
            toast.error("Không thể logout")
        }
    }
  return (
    <Button onClick={handleLogout}>
        Logout
    </Button>
  )
}

export default Logout