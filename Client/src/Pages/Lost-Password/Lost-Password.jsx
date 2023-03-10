import { useForm } from "react-hook-form";
import Axios from 'axios';
import { useState } from "react";
import { FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const LostPassword = () => {
	// eslint-disable-next-line
	const { register, handleSubmit, watch, formState: { errors, isDirty, isValid } } = useForm({
		mode: 'onChange'
	})

	const [ emailField, setEmailField ] = useState(false)
	const [ showMsjEmail, setShowMsjEmail ] = useState({
		auth: true,
		message: ""
	})
	const [ displayAuth, setDisplayAuth ] = useState(false)

	const onSubmit = async (data) => {
		await Axios.post('http://localhost:3001/v1/lostResetPassword/', data)
		.then(res=> {
			if(res.data.auth) {
				setDisplayAuth(true)
			}
		})
		.catch(error=> 
			setShowMsjEmail({
				auth: error.response.data.auth,
				message: error.response.data.message
			})
		)
	};

	const email = watch('email')

    return(
	//eslint-disable-next-line
        <section 
   		className="section-content center page">
        <div 
        className="wrapper-content center">
            <div 
            className="wrapper-img"></div>
            {!displayAuth && 
				<form 
				className="wrapper-form" 
				onSubmit={handleSubmit(onSubmit)}>
					<h1>Recovery Password</h1>							
					<div 
					className="form-control">
						<input 
						className={`global-inputs-style ${ errors.email && "border-danger" }`}
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
							onMouseEnter={()=>setEmailField(true)}
							onMouseLeave={()=>setEmailField(false)}
							/>
						}
						{emailField && errors?.email &&
							<div className="danger">
								{errors?.email?.message}
							</div>
						}
						{!showMsjEmail.auth &&
							<span className="text-danger">{showMsjEmail.message}</span>
						}
					</div>
					<button
						className={`form-button btn font-w ${(!isDirty || !isValid) && "disabled"}`}
						type="submit"
						disabled={!isDirty || !isValid}>
							Submit
					</button>
					<label> You already register ? 
						<Link to={"/"}>Login</Link>
					</label>
				</form>
			}
			{displayAuth && <span className='wrapper-form'>
				<h1>Password Reset</h1>
				<p className="margin_par">An email with a password reset link has been sent to your email: <b>{email}</b></p>
				<p className="margin_par">Check your email and click on the link to proceed</p>
				<Link to={"/"}>Go to Login</Link>
				</span>}
        </div>
    </section>
    )
}

export default LostPassword