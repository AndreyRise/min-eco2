import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext, useEffect } from 'react'
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import $api from '../http/index.js';

function AdminLinkInfo(props) {  
  const {userStore} = useContext(Context);
  const [open, setOpen] = useState(props.isOpen);

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
                      Линк
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                          onClick={async ()=>{
                            setOpen(!open); 
                            props.closeModal();
                            await userStore.deleteLink(props.popUpData.id);
                            await userStore.getAllLinks();}}
                        >
                          Удалить
                        </button>
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
                  <div className='rounded-2xl p-4 min-w-[216px] bg-white flex flex-col w-full shadow-md pt-2 gap-2'>
                    <div className='flex flex-1 flex-col sm:flex-row gap-2'>
                      <p className='flex-1'>Название релиза: <span className='font-semibold'>{props.popUpData.releaseName}</span></p>
                      <p className='flex-1'>Никнейм: <span className='font-semibold'>{props.popUpData.nickname}</span></p>
                    </div>
                    <p>Линк: <span className='font-semibold'>{props.popUpData.link}</span></p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default observer(AdminLinkInfo);