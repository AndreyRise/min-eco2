import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext, useEffect } from 'react'
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import UserService from '../services/UserService.js';


function AdminReleaseInfo(props) {
  const {userStore} = useContext(Context);
  const [open, setOpen] = useState(props.isOpen);
  const [user, setUser] = useState();
  
  const [releaseStatus, setReleaseStatus] = useState('Проверяется');
  const [UPC, setUPC] = useState('');
  const [msgToUser, setMsgToUser] = useState('');
  const coverName = props.popUpData.coverUri
  
  const getUser = async () => {
    const user = await UserService.findUser(props.popUpData.userId);
    setUser(user.data.user);
  }

  useEffect(() => {
    getUser()
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
                <Dialog.Panel className="divWrap relative w-full md:min-w-[500px] max-h-[90vh] overflow-y-scroll flex flex-col gap-2 max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    <div className='flex flex-row justify-between items-center'>
                      {props.popUpData.name} - {props.popUpData.nickname}
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                          onClick={async ()=>{setOpen(!open); props.closeModal();props.page(1);await userStore.deleteRelease(props.popUpData.id,coverName,userStore.songs);await userStore.getAllReleases(userStore.user.id)}}
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
                  <div className="flex w-full justify-center border-t border-gray-400 pt-2 ">
                    <img src={`https://min.eco/uploads/image/?${userStore.user.id}?${props.popUpData.coverUri}`} className='min-w-full rounded-xl'></img>
                  </div>
                  <span className='font-semibold text-lg'>Редактирование:</span>
                  <div className='flex flex-col rounded-2xl p-4 min-w-[216px] bg-white shadow-md gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                      <span className='font-base'>UPC:</span>
                      <input type="text" className='focus:outline-none h-10 rounded-xl px-3 border w-full' onChange={e=>{setUPC(e.target.value)}} value={UPC} placeholder={'прим. 123456789012'}/>   
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                      <span className='font-base'>Сообщение юзеру:</span>
                      <textarea type="text" className='focus:outline-none rounded-xl px-3 border w-full h-24' onChange={e=>{setMsgToUser(e.target.value)}} value={msgToUser} placeholder={'Релиз отклонен по причине...'}/>   
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                      <span className='font-base'>Статус:</span>
                      <select
                      className='focus:outline-none w-full h-10 rounded-xl px-3 border'
                      onChange={(e) => {setReleaseStatus(e.target.value)}}>
                        <option value="Проверяется" key={'check'}>Проверяется</option>
                        <option value="Одобрен" key={'approved'}>Одобрен</option>
                        <option value="Отклонен" key={'banned'}>Отклонен</option>
                      </select>  
                    </div>
                    <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                          onClick={async ()=>{setOpen(!open); props.closeModal();await userStore.updateReleaseInfo(props.popUpData.id,UPC,msgToUser,releaseStatus);await userStore.getAllReleases(userStore.user.id)}}
                        >
                          Сохранить
                        </button>
                  </div>
                  {props.popUpData.messageFromAdmin?<>
                    <div className='flex flex-col rounded-2xl p-4 min-w-[216px] bg-white shadow-md gap-2'>
                      <span className='font-semibold text-lg'>Сообщение от модерации:</span>
                      <p className='font-light'>{props.popUpData.messageFromAdmin}</p>
                    </div>
                    </>:<>
                    </>}
                  <div className='rounded-2xl p-4 min-w-[216px] bg-white flex flex-col w-full shadow-md pt-2 pb-2 gap-2'>
                    <div className='flex flex-1 flex-col gap-2 break-words'>
                      <p>Дата релиза: <span className='font-semibold'>{props.popUpData.releaseDate.split('T')[0].split('-').reverse().join('/')}</span></p>
                      <p>Жанр: <span className='font-semibold'>{props.popUpData.genre}</span></p>
                      <p>Тип: <span className='font-semibold'>{props.popUpData.type}</span></p>
                      <p>Социальные сети: <span className='font-semibold'>{props.popUpData.socLinks}</span></p>
                    </div>
                    <div className='flex flex-1 flex-col gap-2 break-words'>
                      <p>Всего треков: <span className='font-semibold'>{props.popUpData.totalSongs}</span></p>
                      <p>Права на биты: <span className='font-semibold'>{props.popUpData.proofUrl}</span></p>
                      <p>Статус: <span className='font-semibold'>{props.popUpData.status}</span></p>
                      <p>UPC: <span className='font-semibold'>{props.popUpData.upc?props.popUpData.upc:'Отсутствует'}</span></p>
                    </div>
                  </div>
                  {user?
                  <div className='rounded-2xl p-4 min-w-[216px] bg-white flex flex-col md:flex-row w-full shadow-md pt-2 pb-2 gap-2'>
                  <p>Email: <span className='font-semibold'>{user.email}</span></p>
              </div>:<></>
                }
                  
                  {props.popUpData.proofUrl?<>
                    <div className='flex flex-col rounded-2xl p-4 min-w-[216px] bg-white shadow-md gap-2 break-words'>
                      <span className='font-semibold text-lg'>Информация о битах:</span>
                      <a href={props.popUpData.proofUrl} target='_blank' className='font-light text-blue-400 break-words'>{props.popUpData.proofUrl}</a>
                    </div>
                    </>:<>
                    </>}
                  <div className='flex flex-col w-full gap-2'>
                    <span className='font-semibold text-lg'>Список треков:</span>
                    {userStore.songs?
                    userStore.songs.map((item)=>{
                      return <div key={item.id} className='flex flex-col rounded-2xl p-4 min-w-[216px] bg-white shadow-md gap-2'>
                        <span className='font-light'>{item.name} - {item.nickname}</span>
                        <audio src={`https://min.eco/uploads/song/?${userStore.user.id}?${item.fileUri}`} className='w-full' controls/>
                        <div className='flex flex-col w-full gap-2'>
                          <span className='font-semibold text-lg'>Текст:</span>
                          <p>
                            {item.lyrics}
                          </p>
                          <span className='font-semibold text-lg'>Момент для ТТ: {item.ttMoment}</span>
                          <span className='font-semibold text-lg'>ФИО битмейкера: {item.beatFio}</span>
                          <span className='font-semibold text-lg'>ФИО автора: {item.authorFio}</span>
                          <span className='font-semibold text-lg'>18+: {item.pg18}</span>
                        </div>
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
export default observer(AdminReleaseInfo);