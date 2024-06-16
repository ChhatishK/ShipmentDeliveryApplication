import React from 'react'
import Spinner from '../UI/Spinner'

const ShipmentList = (props) => {
    const shipmentAttributes = ['senderName','receiverName','packageWeight','deliveryAddress', 'shipmentDate', 'DeliveryDate']
    console.log(props.userData);

    const shipmentDetails = document.getElementById("shipmentDetails");
    if (props.userData == null || props.userData.length === 0) {
        <Spinner />
    } else {
            shipmentDetails.innerHTML = "";
            props.userData.reverse();
            var DeliveryDate;
            for (const objs of props.userData) {
            const li = document.createElement("li");
            for (const key of shipmentAttributes) {
                const span = document.createElement("span");
                const value = objs[key];
                DeliveryDate = objs['DeliveryDate']
                span.innerHTML = value
                li.appendChild(span);

            }

            const deliveryStatus = document.createElement("span")
            if (currentDate() === DeliveryDate) {
                deliveryStatus.innerHTML = "Item Delivered!"
                deliveryStatus.style.color = 'lightgreen'
            } else {
                deliveryStatus.innerHTML = "On the way..."
                deliveryStatus.style.color = 'orange'
            }
            li.appendChild(deliveryStatus)

            li.style.color = 'white';
            li.style.width = 'full';
            li.style.display = 'grid'
            li.style.gridTemplateColumns = 'repeat(7, 1fr)'
            li.style.justifyItems = 'center'

            li.style.marginTop = '4 px';

            shipmentDetails.appendChild(li);
        }
    }


    function currentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        return `${year}-${month}-${day}`
    }

    

  return (
    <div className='w-full h-full flex p-4 justify-evenly'>
        <div className='w-[95%]'>
            <h1 className=' text-3xl text-white w-full mb-5'>Your Shipment List!</h1>
            <ul className='w-full h-full border-2 rounded-sm'>
                <li id='details' className='text-white w-full grid grid-cols-7 justify-items-center border-b-2 mt-2 pb-2'>
                    <span>Sender Name</span>
                    <span>Receiver Name</span>
                    <span>Package Weight</span>
                    <span>delivery Address</span>
                    <span>Shipment Date</span>
                    <span>Expected Delivery Date</span>
                    <span>Delivery Status</span>
                </li>

                {/* User's data field */}
                <ul id='shipmentDetails'>Your Cart is Empty</ul>
            </ul>
        </div>
    </div>
  )
}

export default ShipmentList