import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../Firebase/FirebaseConfig";

const ShipmentForm = () => {
    const navigate = useNavigate()
    const location  = useLocation();
    const userId = location.state;
    

    const [formData, setFormData] = useState({
        senderName: "",
        receiverName: "",
        packageWeight: "",
        deliveryAddress: "",
    });

    let name, value;
    const changeHandler = (e) => {
        name = e.target.name;
        value = e.target.value;

        setFormData({...formData, [name]: value});
    };

    async function submitHandler(e) {
        e.preventDefault();

        const shipmentTime = shipmentDate();
        const deliveryTime = DeliveryDate();

        try {

            const docRef = await addDoc(collection(database, userId), {
                senderName: formData.senderName,
                receiverName: formData.receiverName,
                packageWeight: formData.packageWeight,
                deliveryAddress: formData.deliveryAddress,
                shipmentDate: shipmentTime,
                DeliveryDate: deliveryTime,
                status: "Item Shipped/Delivered",
            });

            console.log("Document written with ID: ", docRef.id);
            alert("Shipment Confirmed!")
            navigate("/dashboard", {state : userId})
        } catch(e) {
            alert("Some error occured!")
            console.log("Error Shipping Package: ", e);
        }
            
    }

    function shipmentDate() {
        const date = new Date();
        const year = date.getFullYear()
        const month = date.getMonth();
        const day = date.getDate();

        return `${year}-${month+1}-${day}`
    }

    function DeliveryDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const randomNumber = Math.floor(Math.random() * 10);
        if (day + 3 > 30) {
            return `${year}-${month+2}-${(day+randomNumber+3)%30}`
        } else if (month + 2 > 12) {
            return `${year+1}-${(month+2)%12}}-${(day+randomNumber+3)%30}`
        } else {
            return `${year}-${month+1}-${day+randomNumber+3}`
        }
    }

    return (
        <form className="w-full flex justify-center flex-col items-center">
            <h2 className="text-3xl mt-9 text-white underline">Add new Shipment Form</h2>
            <div className="flex flex-col h-full w-[40%] items-center gap-3 p-4">

                <label className="w-[80%]">
                    <p className="text-[18px] text text-left">
                        Sender Name: <sup className="text-red-700">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="senderName"
                        value={FormData.senderName}
                        onChange={changeHandler}
                        placeholder="Enter Sender Name"
                        className="px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25  bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none w-full"
                    />
                </label>

                <label className="w-[80%]">
                    <p className="text-[18px]">
                        Receiver Name: <sup className="text-red-700">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="receiverName"
                        value={FormData.receiverName}
                        onChange={changeHandler}
                        placeholder="Enter Receiver Name"
                        className="px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none w-full"
                    />
                </label>

                <label className="w-[80%]">
                    <p className="text-[18px]">
                        Package weight (kg):{" "}
                        <sup className="text-red-700">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="packageWeight"
                        value={FormData.packageWeight}
                        onChange={changeHandler}
                        placeholder="Enter Package weight"
                        className="px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none w-full"
                    />
                </label>
                <label className="w-[80%]">
                    <p className="text-[18px]">
                        Delivery Address: <sup className="text-red-700">*</sup>{" "}
                        <small>( Give in suggested sequences... )</small>
                    </p>
                    <input
                        required
                        type="text"
                        name="deliveryAddress"
                        value={FormData.deliveryAddress}
                        onChange={changeHandler}
                        placeholder="building name, city name, state name, pin-code"
                        className="px-[12px] py-[4px] rounded-[8px] text-[18px] text-richblack-25   bg-richblack-700 border-none shadow-sm shadow-richblack-100 outline-none w-full"
                    />
                </label>

            </div>
                <button onClick={submitHandler} className="p-2 bg-orange-400 w-[100px] rounded-[12px] mt-4 hover:bg-orange-600 transition-all duration-200 font-sans font-semibold">Add</button>
        </form>
    );
};

export default ShipmentForm;
