import { NavLink } from 'react-router-dom';
import '../styles/Login.css';
import LoginComp from '../components/LoginComp';
import RegComp from '../components/RegComp';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../index.js';
import { useNavigate } from "react-router-dom";


function LoginPage() {

  const {userStore} = useContext(Context);
  const navigate = useNavigate();
  const [login,setLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('Token')){
      userStore.checkAuth().then(() => {
        if(userStore.isAuth === true && userStore.user.role === 'USER'){
          navigate('/dashboard/main');
        }
        if(userStore.isAuth === true && userStore.user.role === 'ADMIN'){
          navigate('/adminPanel/allReleases');
        }
      })
    }
  },[login])

  const [rega,setRega] = useState(false);
  const handlerRegaChange = (TFRega) => {
    setRega(TFRega);
  };

  const  handlerLoginChange = () => {
    setLogin(!login);
  };

  return (
    <div className='LoginPage'>
      <main className="w-min">
        <NavLink to='/' className='fontBilya text-center text-4xl text-white drop-shadow-md'>
        <h1>MIN.ECO</h1>
        </NavLink>

        {!rega ? <LoginComp onChangeRega={handlerRegaChange} onChangeLogined={handlerLoginChange}/>:
         <RegComp onChangeRega={handlerRegaChange} onChangeLogined={handlerLoginChange}/>}
        
      </main>
    </div>
  );
}

export default LoginPage;


