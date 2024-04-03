import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../index.js";
import { useContext, useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import UserService from "../services/UserService.js";


function FinancesComp(params) {

  const {userStore} = useContext(Context);
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false)
  const [INN, setINN] = useState('');
  const [BIK, setBIK] = useState('');
  const [FIO, setFIO] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [amount, setAmount] = useState(0);
  const [summ, setSumm] = useState(0);
  
  const [onPage,setOnPage] = useState(10);
  const [page,setPage] = useState(1);
  
  const clearVivodData = () => {
    setINN('');
    setBIK('');
    setBankAccount('');
    setAmount(0);
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
   setIsOpen(true)
  }

  // useEffect(() => {
  //   if (userStore.user.role !== 'USER') navigate('/login')
  // }, [])

  const [withdraws, setWithdraws] = useState(null);

  useEffect(() => {
    userStore.getWithdraws(userStore.user.id)
  },[])

  useEffect(() => {
    if(userStore.withdraws.length===0) {setWithdraws(null)}
    else{
    if(userStore.withdraws.length>0){
      let preData = [];
      let preSumm = 0;
      userStore.withdraws.forEach((element) => {
        if(element.status==='В обработке'){
          preSumm=preSumm+element.amount
        }
      })
      const lastIndex = page*onPage;
      const firstIndex = lastIndex - onPage;
      const current = userStore.withdraws.slice(firstIndex,lastIndex);
      for (let i = 0; i < onPage; i++) { 
        preData = [...preData, current[i]];
        if(!current[i+1]?.id) break;
      }
      if(preSumm!==0){
        setSumm(preSumm)
      }
      if(preData!=[]){
        setWithdraws(preData);
      }
    }
  }
  },[userStore.withdraws,onPage,page])





  const createWithdraw = async () => {
    let yourDate = new Date();
    yourDate = yourDate.toISOString().split('T')[0].split('-').reverse().join('/');
    if (parseInt(amount)>(parseInt(userStore.user.balance)-parseInt(summ)) || FIO.length<7){
      alert('Введите корректные данные')
    }
    else{
      await UserService.addWithdraw(yourDate,amount,INN,bankAccount,BIK,FIO,userStore.user.id)
      .then (UserService.getWithdraws(userStore.user.id)
      .finally(()=>{closeModal();clearVivodData()}));
    }
  }

  return(
    <div className='flex w-full flex-col gap-3 max-h-[90vh]'>
      <h1 className='font-bold text-2xl'>Финансы</h1>
      <div className="flex flex-col xl:flex-row gap-3">
        <div className="flex flex-col gap-3 sm:flex-row w-full">
          <div className="divWrap flex flex-row flex-1">
            <div className="flex flex-2 ml-2 mr-5 justify-center items-center scale-150">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
</svg>
            </div>
            <div className="flex flex-col">
              <span>Релизов</span>
              <span className="font-bold text-2xl">{userStore.releases.length}</span>
            </div>
          </div>

        </div>
        <div className="flex flex-col gap-3 sm:flex-row w-full">
          <div className="divWrap flex flex-row flex-1">
            <div className="flex flex-2 ml-2 mr-5 justify-center items-center scale-150">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>
            </div>
            <div className="flex flex-col flex-2">
              <span>Баланс</span>
              <span className="font-bold text-2xl">{userStore.user.balance}₽</span>
            </div>
          </div>
          <div onClick={openModal} className="divWrap flex flex-row h-[88px] sm:h-full hover:scale-105 cursor-pointer transition-all">
          <div className="flex flex-2 ml-2 mr-5 justify-center items-center scale-150 select-none">
          <svg onClick={openModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
</svg>
            </div>
            <div onClick={openModal} className="flex flex-col justify-center h-full select-none">
              <span>Вывести средства</span>
            </div>
          </div>
        </div>
      </div>
      <div className="divWrap pb-0 flex flex-col px-0 h-full overflow-y-scroll no-scrollbar">
        <div className="flex flex-col">
          <span className="font-bold text-xl px-4">История Выплат</span>
          <span className="divText text-base border-b border-gray-300 px-4 m-0 pb-4">Поступление денежных средств занимает от 1 до 14 рабочих дней!</span>
        </div>
        <div className="overflow-auto px-4 pt-2">
        <div className="flex flex-row gap-2 items-center">
              <span>Показывать</span>
              <select className='focus:outline-none h-10 rounded-xl px-3 border' onChange={e=>{setPage(1);setOnPage(parseInt(e.target.value))}}>
                <option value="10" key={10}>10</option>
                <option value="25" key={25}>25</option>
                <option value="50" key={50}>50</option>
                <option value="100" key={100}>100</option>
              </select>
              <span>записей</span>
            </div>
        <table className="table w-full table-auto border-separate border-spacing-y-[10px] border-black pb-[42px]">
          <thead>
            <tr>
              <th className="tableText">ID</th>
              <th className="tableText">Дата</th>
              <th className="tableText">ФИО</th>
              <th className="tableText">ИНН</th>
              <th className="tableText">БИК</th>
              <th className="tableText">Счёт</th>
              <th className="tableText">Сумма</th>
              <th className="tableText">Статус</th>
            </tr>
          </thead>
          {!withdraws?<></>:<>          
            <tbody className="max-h-full">
              {withdraws.map((item)=>{
                return (<tr key={item.id} className='bg-slate-50 select-none cursor-pointer hover:scale-[102%] transition-all' onClick={()=>{
                  if(item.status==='В обработке'){alert('На данный момент заявка находится в обработке.')}
                  if(item.status==='Выплачено'){
                    if(item.messageFromAdmin){
                      alert(`Заявка обработана, деньги выплачены. Комментарий администратора: ${item.messageFromAdmin}`)
                    } else{
                      alert(`Заявка обработана, деньги выплачены.`)
                    }
                  }
                  if(item.status==='Отклонено'){
                    if(item.messageFromAdmin){
                      alert(`Заявка на вывод средств отклонена. Комментарий администратора: ${item.messageFromAdmin}`)
                    } else{
                      alert(`Заявка на вывод средств отклонена.`)
                    }
                  }
                }}>
                    <td className="tableContentText border-t-stone-400 border-solid border-r rounded-l-xl">{item.id}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.date.split('T')[0].split('-').reverse().join('/')}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.fio}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.inn}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.bik}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.bankAccount}</td>
                    <td className="tableContentText border-t-stone-400 border-solid border-r">{item.amount}</td>
                    <td className="tableContentText border-t-stone-400 border-solid rounded-r-xl">{item.status}</td>
                  </tr>)
              })
              }
            </tbody></>}
        </table>
        {!withdraws?
          <div className="flex flex-col w-full items-center justify-center pt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 scale-110">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <p className='text-sm'>Данных нет</p>
          </div>:<></>}
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
          <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>{closeModal();clearVivodData()}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="divWrap w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Создание заявки на вывод средств
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-3">
                    <p className="text-base">
                      Вам доступно <span className="font-semibold">{userStore.user.balance-summ}</span> рублей для вывода.
                    </p>
                    <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <span className="">Сумма вывода:</span>
                        <input className='focus:outline-none w-full h-10 rounded-xl pl-3' onChange={e=>setAmount(e.target.value)}
                        value={amount} placeholder='10000'/>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="">ИНН:</span>
                        <input className='focus:outline-none w-full h-10 rounded-xl pl-3' onChange={e=>setINN(e.target.value)}
                        value={INN} placeholder='Пример: 7743001840'/>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="">Счет:</span>
                        <input className='focus:outline-none w-full h-10 rounded-xl pl-3' onChange={e=>setBankAccount(e.target.value)}
                        value={bankAccount} placeholder='Пример: 40817810099910004312'/>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="">БИК:</span>
                        <input className='focus:outline-none w-full h-10 rounded-xl pl-3' onChange={e=>setBIK(e.target.value)}
                        value={BIK} placeholder='Пример: 044525225'/>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="">Получатель:</span>
                        <input className='focus:outline-none w-full h-10 rounded-xl pl-3' onChange={e=>setFIO(e.target.value)}
                        value={FIO} placeholder={userStore.user.name}/>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2 justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all"
                      onClick={()=>{closeModal();clearVivodData()}}
                    >
                      Отмена
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  transition-all"
                      onClick={async ()=>{
                        await createWithdraw();
                        await userStore.getWithdraws(userStore.user.id);
                      }}
                    >
                      Отправить
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
        </div>
      </div>
    </div>
  )
}
export default observer(FinancesComp);