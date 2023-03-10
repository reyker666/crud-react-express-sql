import './app.scss';
import SignUp from './Pages/Sign-Up/Sign-Up';
import SignIn from './Pages/Sign-In/Sign-In';
import { Routes, Route } from "react-router-dom";
import LostPassword from './Pages/Lost-Password/Lost-Password';
import ResetPassword from './Pages/Reset-Password/Reset-Password';
import ResetPasswordSuccess from './Pages/Reset-Password/Reset-Password-Success';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoutes from './Components/routes/ProtectedRoutes'

const App = () => {
    return(
		<Routes>
			<Route path='/' element={<SignIn/>}/>
			<Route path='/register' element={<SignUp/>}/>
			<Route path='/lostPassword' element={<LostPassword/>}/>
			<Route path='/resetPassword/:token' element={<ResetPassword/>}/>
			<Route path='/resetPassword/success' element={<ResetPasswordSuccess/>}/>
			<Route path='*' element={
				<div>
					<h2>404 Page not found</h2>
				</div>
				}
            />
			<Route element={<ProtectedRoutes/>}>
				<Route path='/dashboard/*' element={<Dashboard/>}/>
            </Route>
		</Routes>
    )
}

export default App