import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../index.js";

function RegComp(props) {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPw] = useState('');
  const [sPw,setSPw] = useState('');
  const [checked,setChecked] = useState(false);

  
  const {userStore} = useContext(Context);

  return (
    <>
    <div  className="LoginForm rounded-xl">
<div className=' flex flex-col gap-3 p-3 mt-9 items-center justify-center '>
  <input className='focus:outline-none w-[290px] h-10 rounded-xl pl-3'   onChange={e=>setName(e.target.value)}
  value={name}  placeholder='ФИО'/>
  <input type="email" className='focus:outline-none w-[290px] h-10 rounded-xl pl-3'  onChange={e=>setEmail(e.target.value)}
  value={email}   placeholder='Email'/>
  <input type="password" className='focus:outline-none w-[290px] h-10 rounded-xl pl-3'  onChange={e=>setPw(e.target.value)}
  value={password}  placeholder='Пароль'/>
  <input type='password' className='focus:outline-none w-[290px] h-10 rounded-xl pl-3'  onChange={e=>{setSPw(e.target.value)}}
  value={sPw}  placeholder='Повторите пароль'/>
  <div className="flex gap-3 justify-start w-full pl-3 select-none">
    <input className="scale-[150%]" onChange={e=>setChecked(!checked)}
  checked={checked} type="checkbox"/>
    
    <p>Согласен с </p>
    <NavLink to='/terms' target="_blank" className='text-sky-600 font-bold cursor-pointer'>Условиями сайта</NavLink>
  </div>
  <button className="rounded-full bg-sky-500  py-3 px-8 text-center font-semibold text-white  transition-all hover:bg-sky-800" onClick={()=>{
    if (checked && password===sPw) {
      userStore.registration(name, email,password).then((e) => props.onChangeLogined(true))
    } else {
      alert('Заполните все поля и примите пользовательское соглашение.')
    }
  }}>Зарегистрироваться</button>
</div>
</div>
<p className="text-center mt-2">
  Уже есть аккаунт? <span onClick={(e) => {props.onChangeRega(false)}} className="text-sky-600 font-bold cursor-pointer">Войти</span>
</p>
</>
  );
}

export default RegComp;
