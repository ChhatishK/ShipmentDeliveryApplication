import { signOut } from 'firebase/auth';
import React from 'react'
import {Link} from 'react-router-dom'
import { database } from '../../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function NavigationBar(props) {
    const history = useNavigate();

    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

    const clickHandler= () => {
        signOut(database).then(val=>{
            console.log(val)
            history("/")
        })
    }

  return (
    <div className='flex w-full justify-around p-4 items-center'>
        
        <h1 className='text-2xl uppercase text-slate-200'>Shipment Delivery Application</h1>
        <ul className='flex flex-row w-[30%] justify-between items-center text-slate-200'>
            <li className='underline'>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/'>About us</Link>
            </li>
            <li>
                <Link to='/'>Contact us</Link>
            </li>
            
            <div className='w-[170px] flex justify-between relative'>

                {!isLoggedIn &&
                    <Link to='/login'>
                        <li className='p-2 w-[80px] bg-blue-400 text-sm text-center rounded-lg'>Login</li>
                    </Link>
                }
                { !isLoggedIn &&
                    <Link to='/register'>
                        <li className='p-2 w-[80px] bg-blue-400 text-center text-sm rounded-lg'>Register</li>
                    </Link>
                    
                }
                { isLoggedIn &&
                    <Link to='/'>
                        <button onClick={() => setIsLoggedIn(false)} className='p-2 w-[80px] bg-blue-400 text-center text-sm rounded-lg'>Log out</button>
                    </Link>
                }
                { isLoggedIn &&
                    <Link to='/dashboard'>
                        <button className='p-2 w-[80px] bg-blue-400 text-center text-sm rounded-lg'>Dashboard</button>
                    </Link>
                }
            </div>
        </ul>
    </div>
  )
}

export default NavigationBar