import { useForm } from "react-hook-form";
import Axios from 'axios';
import { useState } from "react";
import { FaInfoCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
	const navigate = useNavigate()
	const { register, handleSubmit, watch, formState: { errors, isDirty, isValid} } = useForm({
            mode: 'onChange'
        })

	const [emailExist, setEmailExist] = useState(null)

	const [ fieldsRequires, setFieldsRequire ] = useState({
		username: false,
		password: false,
		passconfirm: false,
		email:false
	})

	const password = watch("password")

	const onSubmit = async (data) => {

        await Axios.post('http://localhost:3001/v1/register/', data)
		.then(async response => {
			if(response.data.isRegistered) {
				await Axios.post('http://localhost:3001/v1/login', {
					email: data.email,
					password: data.password
				})
				.then((response=>{
					if(response.data?.auth) {
						navigate('/dashboard')
					}
					console.log(response.data)
				}))
			}
		})
		.catch(error => {
			setEmailExist(error.response.data.message)
		})
	};

    return(
    <section 
    className="section-content center page">
        <div 
        className="wrapper-content center">
            <div 
            className="wrapper-img"></div>
            <form 
            className="wrapper-form" 
            onSubmit={handleSubmit(onSubmit)}>
                <h1>REGISTER</h1>
				<div 
				className="form-control">
					<input 
					className={`global-inputs-style ${ errors.username && "border-danger" }`}
					placeholder="Username"         
					type="text"
						{...register("username", { required: "Username is required",
							pattern: {
								value: /^[A-Za-z0-9]*$/,
								message: 'Username must contain between 3 to 10 characters, only letters and numbers'
							},
							minLength: {value: 3, message: "Username must contain minimum 3 characters"},
							maxLength: {value: 10, message: "Username must contain maximum 10 characters"}
							
						})}
					/>
					{errors.username && 
						<FaInfoCircle 
						className="iconInfo"
						color="red" 
						size={"1.5em"}
						onMouseEnter={()=>setFieldsRequire({username: true})}
						onMouseLeave={()=>setFieldsRequire({username: false})}
						/>
					}
					{fieldsRequires.username && errors?.username &&
						<div className="danger">
							{errors?.username?.message}
						</div>
					}
				</div>
				<div 
				className="form-control">
					<input 
					className={`global-inputs-style ${ errors.password && "border-danger" }`}
					placeholder="Password"         
					type="password" 
					{...register("password", {required: "Password is required",
					// eslint-disable-next-line
						pattern: {
							value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.-_$@$!%*?&])([A-Za-z\d.-_$@$!%*?&]|[^ ]){8,15}$/,
							message: "Password must contain least: 1 number, 1 lowercase letter, 1 uppercase letter, without blank space and 1 special character"
						},
						minLength: {
							value: 8,
							message: "Password must contain minimum 8 characters"
						},
						maxLength: {
							value: 15,
							message: "Password must contain maximum 15 characters"
						}
					})}
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
				</div>
				<div 
				className="form-control">
					<input 
					className={`global-inputs-style ${ errors.passconfirm && "border-danger" }`}
					placeholder="Confirm password"         
					type="password" 
					onPaste={e=> e.preventDefault()}
					{...register("passconfirm", { required: "Confirm password is required", 
						validate: (value) =>
						value === password || "The password do not match"
                    })}
					/>
					{errors.passconfirm && <FaInfoCircle 
					className="iconInfo"
					color={errors?.passconfirm ? "red" : "black"} 
					size={"1.5em"}
					onMouseEnter={()=>setFieldsRequire({passconfirm: true})} 
					onMouseLeave={()=>setFieldsRequire({passconfirm: false})}
					/>}
					{fieldsRequires.passconfirm && errors?.passconfirm &&
						<div className="danger">
							{errors?.passconfirm?.message}
						</div>
					}
				</div>
				<div 
				className="form-control">
					<input 
					className={`global-inputs-style ${ errors.email && "border-danger" }`}
					placeholder="Email"         
					type="text" 
						{...register("email", { required: "Email is required",
							//eslint-disable-next-line
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
					{emailExist && <span className="text-danger">{emailExist}</span>}
				</div>
                <button
                    className={`form-button btn font-w ${(!isDirty || !isValid) && "disabled"}`}
                    type="submit"
					disabled={!isDirty || !isValid}>
						Sign Up
                </button>
                <label> You already register ? 
                    <Link to={"/"}> Sign in</Link>
                </label>
            </form>
        </div>
    </section>
    )
}

export default SignUp