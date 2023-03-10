import { Link, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import MyTasks from '../Tasks/Tasks'
import Cookies from 'universal-cookie'


const Dashboard = () => {
    let cookies = new Cookies()

    const logoutUser = () => {
        cookies.remove('tokenUser')
        cookies.remove('tokenSession')
    }

    return(
            <div className='page dashboard'>
                <div className='navbar'>
                    <div className='navbar-menu'>
                        <Link className='menu-item' to='home'>Home</Link>
                        <Link className='menu-item' to='tasks'>Mis tareas</Link>
                        <Link className='menu-item' to='/' onClick={logoutUser}>Logout</Link>
                    </div>
                    <img className='navbar-img' src="https://i.imgur.com/6Z4qqHz.png" alt="profile img"/>
                </div>
                <section className='content'>
                    <Routes>
                        <Route path='/home' element={<Home/>}/>
                        <Route path='/tasks' element={<MyTasks/>}/>
                        <Route element={
                            <div>
                                <h2>404 Page not found etc</h2>
                            </div>
                            }
                        />
                    </Routes>
                </section>
            </div>
    )
}

export default Dashboard