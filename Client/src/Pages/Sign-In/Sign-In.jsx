import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios';
import { FaInfoCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

Axios.defaults.withCredentials = true;

const SignIn = () => {
    // eslint-disable-next-line

	const cookies = new Cookies();
	const navigate = useNavigate()
	const cookieSession = cookies.get('tokenSession')
	const cookieToken = cookies.get('tokenUser')
    
	const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
        mode: 'onChange'
    })

    const [ fieldsRequires, setFieldsRequire ] = useState({
		email: false,
		password: false
	})

	const [ msjAuthentication, setMsjAuthentication ] = useState({
		auth: true,
		message: ""
	})

	useEffect(() => {
		const userConnected = () => {
			if(cookieSession && cookieToken) {
				navigate('/dashboard')
			}
		}
	
		userConnected()
	})

	const onSubmit = (data) => {
		setMsjAuthentication({auth: true})
		Axios.post('http://localhost:3001/v1/login/', data)
        .then((response=>{
			if(response.data?.auth) {
				navigate('/dashboard')
			}
            console.log(response.data)
        }))
		.catch(error=> setMsjAuthentication({auth: error.response.data.auth, message: error.response.data.message}))
	};

    return(
    <section className="section-content center page">
        <div className="wrapper-content center">
        <div className="wrapper-img"></div>
            <form className="wrapper-form" autoComplete="none" onSubmit={handleSubmit(onSubmit)}>
                <h1>LOGIN</h1>
                <div 
				className="form-control">
					<input 
					className={`global-inputs-style`}
					placeholder="Email"         
					type="text" 
						{...register("email", { required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
                                message: "Please input a valid email"
                            }
						})}
					/>
					{errors.email &&
						<FaInfoCircle
						className="iconInfo"
						color={errors?.email ? "red" : "black"}
						size={"1.5em"}
						onMouseEnter={()=>setFieldsRequire({email: true})}
						onMouseLeave={()=>setFieldsRequire({email: false})}
						/>
					}
					{fieldsRequires.email && errors?.email &&
						<div className="danger">
							{errors?.email?.message}
						</div>
					}
				</div>
                <div 
				className="form-control">
					<input 
					className={`global-inputs-style`}
					placeholder="Password"         
					type="password" 
					{...register("password", {required: "Password is required"})}
					/>
					{errors.password && 
						<FaInfoCircle 
						className="iconInfo"
						color={errors?.password ? "red" : "black"} 
						size={"1.5em"}
						onMouseEnter={()=>setFieldsRequire({password: true})} 
						onMouseLeave={()=>setFieldsRequire({password: false})}
						/>
					}
					{fieldsRequires.password && errors?.password &&
						<div className="danger">
							{errors?.password?.message}
						</div>
					}
					{!msjAuthentication.auth && <span className="text-danger">{msjAuthentication.message}</span>}
				</div>
                <button
                    className={`form-button btn font-w ${(!isDirty || !isValid) && "disabled"}`}
                    type="submit"
					disabled={!isDirty || !isValid}>
						Sign up
                </button>
                <div className="info-links">
                    <label> Don't have an account ? <Link to="/register">Sign up</Link></label>
                    <label> You lost your password ? <Link to="/lostPassword">Click Here</Link></label>
                </div>
            </form>
        </div>
    </section>
    )
}

export default SignIn