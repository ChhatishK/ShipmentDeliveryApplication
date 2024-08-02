import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { db, database } from '../../Firebase/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, getAuth } from 'firebase/auth'

function CustomerRegister() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        {
            firstName:"",
            lastName:"",
            email:"",
            residenceAddress:"",
            password:"",
            confirmPassword:""
        }
    )

    let name, value;

    function changeHandler(e) {
        name = e.target.name;
        value = e.target.value;

        setFormData({...formData, [name]: value});

    }

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);


    async function submitHandler(event) {
        
        event.preventDefault();
        if (event.target.password.value !== event.target.confirmPassword.value) {
            alert("Password is unmached!")
            toast.error("Password do not match.")
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailId = document.getElementById("emailId");
        if (formData.email.trim() !== '' && !emailPattern.test(formData.email)) {
            emailId.style.border = "1px solid red"
            alert("Email pattern doesn't matched!")
            return;
        }

        toast.success("Congratulations! You have signed in");
        let Email = event.target.email.value
        let Password = event.target.password.value;
        

        createUserWithEmailAndPassword(db, Email, Password).then((userCredential) => {

            const user = userCredential.user;
            const userId = user.uid;
            try {
                const loginInfo = addDoc(collection(database, "UserData"), {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    residenceAddress: formData.residenceAddress,
                    password: formData.password
                })

                addDoc(collection(database, userId));
    
                console.log(loginInfo)
                console.log(userCredential)
            } catch(e) {
                alert("Registration failed. Try again!")
                console.log("Error occured!")
            }
            navigate('/login', {state : userId})

        }).catch(() => {
            alert("User Already Exists!")
            window.location.reload();
            navigate("/register");
        })
    
    }   

  return (
    <form method='POST' onSubmit={submitHandler} className='w-full flex flex-col justify-center items-center'>
            <h2 className='text-3xl mb-4 mt-9 text-white underline'>Customer Registration Form</h2>
        <div className='flex flex-col gap-6'>
            
            <div className='flex gap-3'>
                <label className=''>
                <p className='text-[18px]'>First Name :  <sup className='text-red-700'>*</sup></p>
                    <input
                        required
                        type='text'
                        name='firstName'
                        value={FormData.firstName}
                        onChange={changeHandler}
                        placeholder='Enter First Name'
                        className='px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none'
                    />
                </label>
                <label>
                <p className='text-[18px]'>Last Name : <sup className='text-red-700'>*</sup></p>
                    <input
                        required
                        type='text'
                        name='lastName'
                        value={FormData.lastName}
                        onChange={changeHandler}
                        placeholder='Enter Last Name'
                        className='px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none'
                    />
                </label>
            </div>

            {/* Email Address */}

            <label className='flex flex-col gap-1 w-[470px]'>
            <p className='text-[18px]'>Email Address : <sup className='text-red-700'>*</sup></p>

                <input 
                    id='emailId'
                    autoComplete='off'
                    type='email' 
                    placeholder='enter email address' 
                    required
                    value={formData.email}
                    onChange={changeHandler}
                    name='email'
                    className='px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none'
                />
                    
            </label>

            {/* Current Living Address */}
            <label className='flex flex-col gap-1 w-[470px]'>
            <p className='text-[18px]'>Residence Address : <sup className='text-red-700'>*</sup></p>

                <input 
                    autoComplete='off'
                    type='text' 
                    placeholder='enter residence address' 
                    required
                    value={formData.residenceAddress}
                    onChange={changeHandler}
                    name='residenceAddress'
                    className='px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none'
                />
                    
            </label>

            {/* password and confirm password */}
            <div className='flex gap-3'>
                <label className='relative'>
                <p className='text-[18px]'>Create Password :<sup className='text-red-700'>*</sup></p>

                    <input 
                        type={showPassword1 ? ("text") : ("password")} 
                        placeholder='enter password' 
                        required
                        value={formData.password}
                        onChange={changeHandler}
                        name='password'
                        className='px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none'
                    />

                    <span onClick={() => setShowPassword1((prev) => !prev)}
                    className='absolute right-2 top-9 cursor-pointer'
                    
                    >
                        {showPassword1?(<AiOutlineEyeInvisible />):(<AiOutlineEye />)}
                    </span>

                </label>

                <label className='relative '>
                <p className='text-[18px]'>Confirm Password : <sup className='text-red-700'>*</sup></p>

                    <input 
                        type={showPassword2 ? ("text") : ("password")} 
                        placeholder='confirm password' 
                        required
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        name='confirmPassword'
                        className='px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none'
                    />

                    <span onClick={() => setShowPassword2((prev) => !prev)}
                    className='absolute right-2 bottom-2 cursor-pointer'
                    
                    >
                        {showPassword2?(<AiOutlineEyeInvisible />):(<AiOutlineEye />)}
                    </span>

                </label>

            </div>

            <button className='px-[12px] py-[8px] rounded-[8px] bg-yellow-600 text-[18px] mt-5 text-richblack-900 font-medium'>Create Account</button>
            <div className='w-full h-[1px] bg-white'></div>
            <button className='px-[12px] py-[8px] rounded-[8px] bg-[#1d77aa] border border-slate-300 text-[18px] text-richblack-900 font-medium' onClick={(e) => {
                e.preventDefault();
                alert("Not working!")
            }}>Sign up with Google</button>
        </div>

    </form>
  )
}

export default CustomerRegister
