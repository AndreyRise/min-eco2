import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext, useEffect } from 'react'
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import $api from '../http/index.js';

function AdminAddLink(props) {  
  const {userStore} = useContext(Context);
  const [open, setOpen] = useState(props.isOpen);
  const [releaseName, setReleaseName] = useState('');
  const [link, setLink] = useState('');
  const [nick, setNick] = useState('');

  useEffect(() => {
  }, [])

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={()=>{setOpen(false);props.closeModal();}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="divWrap relative w-full md:min-w-[500px] max-h-[90vh] overflow-y-scroll flex flex-col gap-2 max-w-md transform overflow-hidden rounded-2xl bg-white px-4 py-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    <div className='flex flex-row justify-between items-center'>
                      Создание линка
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                          onClick={()=>{setOpen(!open); props.closeModal();}}
                        >
                          Закрыть
                        </button>
                      </div>
                    </div>
                  </Dialog.Title>
                  <div className='rounded-2xl p-4 min-w-[216px] bg-white flex flex-col w-full shadow-md gap-2'>
                    <div className='flex flex-col md:flex-row w-full gap-2'>
                      <div className='flex flex-col gap-2 w-full'>
                        <span className='font-base'>Название релиза:</span>
                        <input type="text" className='focus:outline-none h-10 rounded-xl px-3 border w-full' onChange={e=>{setReleaseName(e.target.value)}} value={releaseName} placeholder={'ОПГ сити'}/>   
                      </div>
                      <div className='flex flex-col gap-2 w-full'>
                        <span className='font-base'>Никнейм:</span>
                        <input type="text" className='focus:outline-none h-10 rounded-xl px-3 border w-full' onChange={e=>{setNick(e.target.value)}} value={nick} placeholder={'OG Buda'}/>   
                      </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                      <span className='font-base'>Линк:</span>
                      <input type="text" className='focus:outline-none h-10 rounded-xl px-3 border w-full' onChange={e=>{setLink(e.target.value)}} value={link} placeholder={'https://.....'}/>   
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                    onClick={async ()=>{
                      setOpen(!open); 
                      props.closeModal();
                      await userStore.addLink(releaseName,nick,link); 
                      await userStore.getAllLinks();}}
                  >
                    Добавить
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default observer(AdminAddLink);