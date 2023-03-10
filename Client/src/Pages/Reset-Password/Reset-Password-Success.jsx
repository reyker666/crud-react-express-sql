import { Link } from 'react-router-dom'

const ResetPasswordSuccess = ()=> {

    return(
    <section 
        className="section-content center page">
            <div 
            className="wrapper-content center">
                <div 
                className="wrapper-img"></div>
                <div className='wrapper-form'>
                    <h1>Reset Password</h1>
                    <span>Your password has been reset, now you can login. Click <Link to={"/"}>HERE</Link></span>
                </div>
            </div>
        </section>
    )
}

export default ResetPasswordSuccess