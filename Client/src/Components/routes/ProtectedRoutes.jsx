import { Navigate, Outlet } from "react-router-dom"
import Cookies from 'universal-cookie';
 
const ProtectedRoutes = () => {

    const cookies = new Cookies();
    const tokenSession = cookies.get('tokenSession')
    const tokenUser = cookies.get('tokenUser')

    if (!tokenSession || !tokenUser){
        return <Navigate to="/"/>
    }

    return(
        <Outlet/>
    )
}

export default ProtectedRoutes