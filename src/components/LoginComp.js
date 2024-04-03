
import { useState, useContext } from "react";
import { Context } from "../index.js";
import {observer} from 'mobx-react-lite';

function LoginComp(props) {

  const [email,setEmail] = useState('');
  const [password,setPw] = useState('');

  const [forgetPW, setForgetPW] = useState(false);

  const {userStore} = useContext(Context);

  return (
    <>
    <div className="LoginForm rounded-xl pb-3">
      {
        !forgetPW ?
        <>
      <div className=' flex flex-col gap-3 p-3 mt-9 items-center justify-center '>
        <input className='focus:outline-none w-[290px] h-10 rounded-xl pl-3' onChange={e=>setEmail(e.target.value)}
        value={email} placeholder='Email'/>
        <input type='password' className='focus:outline-none w-[290px] h-10 rounded-xl pl-3' onChange={e=>setPw(e.target.value)}
        value={password} placeholder='Пароль'/>
        <button className="w-36 rounded-full bg-sky-500  py-3 px-8 text-center font-semibold text-white  transition-all hover:bg-sky-800" onClick={() => {
          userStore.login(email,password).then((e) => props.onChangeLogined())}}>Войти</button>
      </div>
      <p onClick={() => {setForgetPW(true)}} className="text-sky-600 font-bold cursor-pointer w-full text-center">Забыли пароль?</p>
      </>:
        <>
        <div className=' flex flex-col gap-3 p-3 mt-9 items-center justify-center '>
          <input className='focus:outline-none w-[290px] h-10 rounded-xl pl-3' onChange={e=>setEmail(e.target.value)}
          value={email}  placeholder='Email'/>
          <button className=" rounded-full bg-sky-500  py-3 px-8 text-center font-semibold text-white  transition-all hover:bg-sky-800" onClick={() => {
          if(email.includes('@')) {userStore.forgetPw(email)} else {alert('Введите Email')}}}>Сбросить пароль</button>
        </div>
        <p onClick={() => {setForgetPW(false)}} className="text-sky-600 font-bold cursor-pointer w-full text-center">Авторизация</p>
        </>
      }
    </div>
    <p className="text-center mt-2">
    У вас нет учётной записи? <span onClick={(e) => {props.onChangeRega(true)}} className="text-sky-600 font-bold cursor-pointer">Зарегистрируйтесь</span>
  </p>
  </>
  );
}

export default observer(LoginComp);


