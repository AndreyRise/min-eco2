import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext, useEffect } from 'react'
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";


function ReleaseInfo(props) {  
  const {userStore} = useContext(Context);
  const [open, setOpen] = useState(props.isOpen);

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
                <Dialog.Panel className="divWrap relative w-full md:min-w-[500px] max-h-[90vh] overflow-y-scroll flex flex-col gap-2 max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    <div className='flex justify-between items-center'>
                      {props.popUpData.name} - {props.popUpData.nickname}
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
                  <div className="flex w-full justify-center border-t border-gray-400 pt-2 ">
                    <img src={`https://min.eco/uploads/image/?${userStore.user.id}?${props.popUpData.coverUri}`} className='min-w-full rounded-xl'></img>
                  </div>
                  {props.popUpData.messageFromAdmin?<>
                    <div className='flex flex-col rounded-2xl p-4 min-w-[216px] bg-white shadow-md gap-2'>
                      <span className='font-semibold text-lg'>Сообщение от модерации:</span>
                      <p className='font-light'>{props.popUpData.messageFromAdmin}</p>
                    </div>
                    </>:<>
                    </>}
                  <div className='rounded-2xl p-4 min-w-[216px] bg-white flex flex-col md:flex-row w-full shadow-md pt-2 gap-2'>
                    <div className='flex flex-1 flex-col gap-2'>
                      <p>Дата релиза: <span className='font-semibold'>{props.popUpData.releaseDate.split('T')[0].split('-').reverse().join('/')}</span></p>
                      <p>Жанр: <span className='font-semibold'>{props.popUpData.genre}</span></p>
                      <p>Тип: <span className='font-semibold'>{props.popUpData.type}</span></p>
                      <p>Социальные сети: <span className='font-semibold'>{props.popUpData.socLinks}</span></p>
                    </div>
                    <div className='flex flex-1 flex-col gap-2'>
                      <p>Всего треков: <span className='font-semibold'>{props.popUpData.totalSongs}</span></p>
                      <p>Права на биты: <span className='font-semibold'>{props.popUpData.proofUrl}</span></p>
                      <p>Статус: <span className='font-semibold'>{props.popUpData.status}</span></p>
                      <p>UPC: <span className='font-semibold'>{props.popUpData.upc?props.popUpData.upc:'Отсутствует'}</span></p>
                    </div>
                  </div>
                  <div className='flex flex-col w-full gap-2'>
                    <span className='font-semibold text-lg'>Список треков:</span>
                    {userStore.songs?
                    userStore.songs.map((item)=>{
                      return <div key={item.id} className='flex flex-col rounded-2xl p-4 min-w-[216px] bg-white shadow-md gap-2'>
                        <span className='font-light'>{item.name} - {item.nickname}</span>
                        <audio src={`https://min.eco/uploads/song/?${userStore.user.id}?${item.fileUri}`} className='w-full' controls/>
                      </div>
                    }):
                    <></>}
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
export default observer(ReleaseInfo);