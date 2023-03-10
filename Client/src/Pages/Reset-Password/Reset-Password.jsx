import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState, useEffect } from "react";
import { FaInfoCircle } from 'react-icons/fa';
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
	const { register, handleSubmit, watch, formState: { errors, isDirty, isValid} } = useForm({
            mode: 'onChange'
        })

	const [ fieldsRequires, setFieldsRequire ] = useState({
		password: false,
		passconfirm:false
	})

	const url = "http://localhost:3001"
	const password = watch("password")
	const { token } = useParams()
	const [ showForm, setShowForm ] = useState(false)
	let navigate = useNavigate()

	const onSubmit = async (data) => {
		await axios.put(`${url}/v1/lostResetPassword/${token}`, data)
		.then(response => {
			if(response.data.passChanged) {
				navigate(`/resetPassword/success`)
			}
		})
		.catch(err => console.log(err))
	};

	useEffect(()=> {
		const test = async () => {
			await axios.get(`${url}/v1/lostResetPassword/${token}`)
			.then(response => {
				if(response.data.auth) {
					setShowForm(response.data.auth)
				}
			})
			.catch(err => console.log(err.response.data.message))
		}

		test()
	},[token])

    return(
    <section 
    className="section-content center page">
        <div 
        className="wrapper-content center">
            <div 
            className="wrapper-img"></div>
            {showForm && 
				<form 
				className="wrapper-form"
				onSubmit={handleSubmit(onSubmit)}>
					<h1>New Password</h1>
					<div 
					className="form-control">
						<input 
						className={`global-inputs-style ${ errors.password && "border-danger" }`}
						placeholder="New Password"         
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
					<button
						className={`form-button btn font-w ${(!isDirty || !isValid) && "disabled"}`}
						type="submit"
						disabled={!isDirty || !isValid}>
							Submit
					</button>
				</form>
			}
			{!showForm && 
				<div className="wrapper-form">
						<h1>Reset Password</h1>
						<span>This link have an error or expired</span>
				</div>
			}
        </div>
    </section>
    )
}

export default ResetPassword