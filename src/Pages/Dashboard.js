import React, { useState, useEffect } from "react";
import ShipmentList from "../Components/Shipments/ShipmentList";
import { useNavigate, useLocation } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { database, db } from "../Firebase/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";


const Dashboard = ({ isLoggedIn }) => {
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const userId = location.state;

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(db, (user) => {
            const getUserData = async () => {
              
                if (user) {
                    console.log("User is logged in:", user);
                    const userId = user.uid;
                    try {
                        const collectionRef = collection(database, userId);
                        const querySnapshot = await getDocs(collectionRef);

                        const documents = [];
                        querySnapshot.forEach((doc) => {
                            documents.push(doc.data());
                        });

                        setUserData(documents);
                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                } else {
                    console.log("User is not logged in");
                    navigate("/");
                }
                
            };
          getUserData();
        });

    }, []);

    return (
        <div className="flex w-full h-full justify-between p-10">
            <ShipmentList isLoggedIn={isLoggedIn} userData={userData} />
            <button
                className="p-2 w-[180px] h-[50px] mt-10 text-white bg-green-800 rounded-[20px] hover:bg-green-900 transition-all duration-200"
                onClick={() => {
                    navigate("/add-new-shipment-form", {state : userId});
                }}
            >
                Add new Shipment
            </button>
        </div>
    );
};

export default Dashboard;
