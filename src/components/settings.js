import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../index.js";
import { useContext, useEffect, useState } from "react";


function SettingsComp(params) {
  
const {userStore} = useContext(Context);
const navigate = useNavigate();

const [oldPw, setOldPw] = useState('');
const [newPw, setNewPw] = useState('');
const [repeatNewPw, setRepeatNewPw] = useState('');

// useEffect(() => {
//   if (userStore.isAuth !== true) navigate('/login');
// }, [])

const changePW = async () => {
  if(newPw===repeatNewPw){
    await userStore.changePassword(userStore.user.email, oldPw,newPw).then(() => {
      alert('Пароль успешно изменён.');
      setOldPw('');
      setNewPw('');
      setRepeatNewPw('');
    });
  }
  else alert('Новые пароли не совпадают!')
}

  return(
    <div className='flex flex-col w-full'>
    <h1 className='font-bold text-2xl mb-5'>Настройки</h1>
      <div className="divWrap flex flex-col justify-center items-center gap-3 w-full bg-white p-5 rounded-3xl">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="flex flex-col items-center w-full">
              <label className="">Старый пароль</label>
              <input type="password" className='focus:outline-none h-10 rounded-xl px-3 border w-full' onChange={e=>{setOldPw(e.target.value)}} value={oldPw} placeholder={'••••••••••'}/>   
            </div>
            <div className="flex flex-col items-center w-full">
              <label className="">Новый пароль</label>
              <input type="password" className='focus:outline-none h-10 rounded-xl px-3 border w-full' onChange={e=>{setNewPw(e.target.value)}} value={newPw} placeholder={'••••••••••'}/>   
            </div>
            <div className="flex flex-col items-center w-full">
              <label className="">Подтвердите новый пароль</label>
              <input type="password" className='focus:outline-none h-10 rounded-xl px-3 border w-full' onChange={e=>{setRepeatNewPw(e.target.value)}} value={repeatNewPw} placeholder={'••••••••••'}/>   
            </div>
          </div>
          <button onClick={changePW} className="flex items-center justify-center rounded-full bg-sky-500 w-[150px] h-[40px] font-semibold relative transition-all hover:bg-sky-800 text-white">
            Сохранить
          </button>
      </div>
    </div>
  )
}
export default observer(SettingsComp);