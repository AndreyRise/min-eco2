import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { useContext, useEffect, useState } from "react";
import ReleaseInfo from "./AdminReleaseInfo.js";


function AllReleasesComp(params) {
  
const {userStore} = useContext(Context);

const [isOpen, setIsOpen] = useState(false)
const [popUpData,setPopUpData] = useState(null);
const [releases,setReleases] = useState([]);
const [onPage,setOnPage] = useState(10);
const [page,setPage] = useState(1);
const [loading, setLoading] = useState(true);



function closeModal() {
  const setClose = () => setIsOpen(false);
  setTimeout(setClose,220);
}

function openModal() {
  setIsOpen(true)
}

useEffect(() => {
  userStore.getAllReleases(userStore.user.id)
  .then (setLoading(false))
},[])

useEffect(() => {
  if(userStore.releases.length===0) {setReleases(null)}
  else{
  if(userStore.releases.length>0){
    let preData = [];
    const lastIndex = page*onPage;
    const firstIndex = lastIndex - onPage;
    const current = userStore.releases.slice(firstIndex,lastIndex);
    for (let i = 0; i < onPage; i++) { 
      preData = [...preData, current[i]];
      if(!current[i+1]?.id) break;
    }
    if(preData!=[]){
      setReleases(preData);
    }
  }
}
},[userStore.releases,onPage,page])



  return(
    <div className='flex flex-col w-full gap-8 max-h-[90vh] h-[90vh]'>
    {loading?<></>:
    <>
      <h1 className='font-bold text-2xl'>Релизы</h1>
      <div className="divWrap flex flex-col overflow-y-auto h-full w-full">
        <div className="relative w-full">
          <div className="flex flex-col gap-2 sm:flex-row justify-between">
            <div className="flex flex-row gap-2 items-center">
              <span>Показывать</span>
              <select className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>{setPage(1);setOnPage(parseInt(e.target.value))}}>
                <option value="10" key={10}>10</option>
                <option value="25" key={25}>25</option>
                <option value="50" key={50}>50</option>
                <option value="100" key={100}>100</option>
              </select>
              <span>записей</span>
            </div>
          </div>
          <table className="table w-full table-auto border-separate border-spacing-y-[10px] border-black pb-[28px] pr-4 md:pr-0">
            <thead className="">
              <tr className="">
                <th className="tableText">ID</th>
                <th className="tableText">Название релиза</th>
                <th className="tableText">Никнейм</th>
                <th className="tableText">Дата релиза</th>
                <th className="tableText">UPC</th>
                <th className="tableText">Статус</th>
              </tr>
            </thead>
            {!releases?<></>:<>          
            <tbody className="max-h-full overflow-y-scroll">
              {releases.map((item)=>{
                return (<tr key={item.id} className='bg-slate-50 select-none cursor-pointer hover:scale-[102%] transition-all' onClick={()=>{userStore.getSongs(item.id);setPopUpData(item);openModal()}}>
                    <td className="tableContentText border-t-stone-400 border-solid border-r rounded-l-xl">{item.id}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.name}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.nickname}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.releaseDate?item.releaseDate.split('T')[0].split('-').reverse().join('/'):''}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.upc?item.upc:'Не присвоен'}</td>
                    <td className="tableContentText border-t-stone-400 border-solid rounded-r-xl">{item.status}</td>
                  </tr>)
              })
              }
            </tbody></>}
          </table>
          {isOpen?
            <ReleaseInfo isOpen={isOpen} closeModal={closeModal} openModal={openModal} popUpData={popUpData} page={setPage}/>:
            <></>
          }
          {!releases?<>
            <div className="flex flex-col w-full items-center justify-center ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-110">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <p className='text-sm'>Данных нет</p>
            </div>
          </>:''}
          <div className="border rounded-full flex justify-around bg-slate-50 fixed bottom-4 left-4 right-4 shadow-lg">
            <div className="flex-1 justify-center">
              <a onClick={()=>{
                if(page>1){setPage(page-1)}
              }}
              className="flex justify-center cursor-pointer hover:bg-blue-200 transition-all rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </a>
            </div>
            <div className="flex-1 text-center">
              <a onClick={()=>{
                if(userStore.releases.length>page*onPage){setPage(page+1)}
              }} className="flex justify-center cursor-pointer hover:bg-blue-200 transition-all rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      </>}
    </div>
  )
}
export default observer(AllReleasesComp);