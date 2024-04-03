import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { useContext, useEffect, useState } from "react";
import ReleaseInfo from "./ReleaseInfo.js";


function MainComp(params) {
  
  const {userStore} = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const [popUpData,setPopUpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [releases,setReleases] = useState([]);

  useEffect(() => {
    userStore.getReleases(userStore.user.id)
    .then (setLoading(false))
  },[])

  useEffect(() => {
    if(userStore.releases.length===0) {setReleases(null)}
    else{
    if(userStore.releases.length>0){
      let preData = [];
      for (let i = 0; i < 5; i++) { 
        preData = [...preData, userStore.releases[i]]
        if(!userStore?.releases[i+1]?.id) break;
      }
      if(preData!=[]){
        setReleases(preData);
      }
    }
  }
  },[userStore.releases])

  function closeModal() {
    const setClose = () => setIsOpen(false);
    setTimeout(setClose,220);
  }
  
  function openModal() {
    setIsOpen(true)
  }

  return(
    <div className='flex flex-col w-full gap-3'>
    {loading?<></>:
    <>
      <h1 className='font-bold text-2xl'>Главная</h1>
      <div className="flex gap-3 flex-wrap">
        <div className="divWrap flex-1">
          <div>
            <p className="divText">Релизов</p>
            <p className="font-bold text-xl">{userStore.releases.length}</p>
          </div>
        </div>
        <div className="divWrap flex-1">
          <div>
            <p className="divText">Баланс</p>
            <p className="font-bold text-xl">{userStore.user.balance}₽</p>
          </div>
        </div>
      </div>
      <div className="divWrap overflow-auto">
        <table className="table w-full table-auto border-separate border-spacing-y-[10px] border-black ">
          <thead>
            <tr>
              <th className="text-2xl text-left w-[45%]">Последние Релизы</th>
              <th className="tableText">Дата</th>
              <th className="tableText">ID</th>
              <th className="tableText">Статус</th>
              <th className="tableText">UPC</th>
            </tr>
          </thead>
          {!releases?<></>:<>          
          <tbody className="max-h-full overflow-y-scroll">
            {releases.map((item)=>{
              return (<tr key={item.id} className='bg-slate-50 select-none cursor-pointer hover:scale-[102%] transition-all' onClick={()=>{userStore.getSongs(item.id);setPopUpData(item);openModal()}}>
                  <td className="tableContentText border-t-stone-400 border-solid border-r rounded-l-xl">{item.name} - {item.nickname}</td>
                  <td className="tableContentText border-t-stone-400 border-solid border-r">{item.releaseDate?item.releaseDate.split('T')[0].split('-').reverse().join('/'):''}</td>
                  <td className="tableContentText border-t-stone-400 border-solid border-r">{item.id}</td>
                  <td className="tableContentText border-t-stone-400 border-solid border-r">{item.status}</td>
                  <td className="tableContentText border-t-stone-400 border-solid rounded-r-xl">{item.upc?item.upc:'Не присвоен'}</td>
                </tr>)
            })
            }
          </tbody></>}
        </table>
        {!releases?<div className="flex flex-col w-full items-center justify-center pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <p className='text-sm'>Данных нет</p>
          </div>:<></>}
        {isOpen?
          <ReleaseInfo isOpen={isOpen} closeModal={closeModal} openModal={openModal} popUpData={popUpData}/>:
          <></>
        }
      </div>
      </>}
    </div>
  )
}
export default observer(MainComp);