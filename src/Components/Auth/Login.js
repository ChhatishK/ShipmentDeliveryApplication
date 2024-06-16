import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { db } from "../../Firebase/FirebaseConfig";

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const [showPassword, setShowPassword] = useState(false);

    async function submitHandler(event) {
        event.preventDefault();
        const Email = event.target.email.value;
        const Password = event.target.password.value;
        
        await signInWithEmailAndPassword(db, Email, Password, {
            persistence: browserSessionPersistence,
        })
        .then((userCredential) => {
                const user = userCredential.user;
                const userId = user.uid;

                setIsLoggedIn(true);
                toast.success("Login Successfull!")
                console.log(userId)
                navigate("/dashboard", { state: userId });
            })
            .catch(() => {
                toast.error("Wrong Credentials!");
                navigate("/login");
            });
    }

    

    return (
        <form
            onSubmit={submitHandler}
            className="flex flex-col w-full items-center justify-center gap-3"
        >
            <h2 className="text-3xl text-white mt-9 mb-4 underline">Customer Sign in</h2>
            <label className="flex flex-col gap-2">
                <p className="text-[18px]">
                    Email Address <sup className="text-red-700">*</sup>
                </p>

                <input
                    autoComplete="off"
                    type="email"
                    placeholder="Enter Email address"
                    required
                    value={formData.email}
                    onChange={changeHandler}
                    name="email"
                    className="px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none"
                />
            </label>

            <label className="flex flex-col gap-2 relative ">
                <p className="text-[18px]">
                    Password <sup className="text-red-700">*</sup>
                </p>

                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    required
                    value={formData.password}
                    onChange={changeHandler}
                    name="password"
                    className="px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none"
                />

                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-11 cursor-pointer"
                >
                    {showPassword ? (
                        <AiOutlineEyeInvisible />
                    ) : (
                        <AiOutlineEye />
                    )}
                </span>

                <Link to="#">
                    <p className="absolute right-2 bottom-[-15px] text-black-700 underline">
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button className="px-[12px] py-[8px] rounded-[8px] bg-yellow-600 text-[18px] mt-5 text-richblack-900 font-medium">
                Sign in
            </button>
        </form>
    );
};

export default Login;
