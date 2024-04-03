import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext, useEffect } from 'react'
import { Context } from "../index.js";
import { observer } from "mobx-react-lite";
import $api from '../http/index.js';

function AdminWithdrawInfo(props) {  
  const {userStore} = useContext(Context);
  const [open, setOpen] = useState(props.isOpen);
  const [user, setUser] = useState();
  const [msgToUser, setMsgToUser] = useState('');

  const findUser = async () => {
    try {
      const user = await userStore.findUser(props.popUpData.userId)
      setUser(user)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    findUser();
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
                <Dialog.Panel className="divWrap relative w-full md:min-w-[500px] max-h-[90vh] overflow-y-scroll flex flex-col gap-2 max-w-md transform overflow-hidden rounded-2xl bg-white px-4 sm:px-6 py-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    <div className='flex flex-row justify-between items-center'>
                      Заявка на вывод
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                          onClick={async ()=>{setOpen(!open);
                             props.closeModal();
                            await userStore.deleteWithdraw(props.popUpData.id)
                            await userStore.getAllWithdraws()
                            }}
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
                  <p className='text-lg'>Фио: <span className='font-semibold'>{user?user.name:''}</span></p>
                  <p className='text-lg'>Текущий баланс: <span className='font-semibold'>{user?user.balance:''}</span></p>
                  <div className='rounded-2xl p-4 min-w-[216px] bg-white flex flex-col md:flex-row w-full shadow-md pt-2 gap-2'>
                    <div className='flex flex-1 flex-col gap-2'>
                      <p>Дата создания: <br className='hidden md:flex'/><span className='font-semibold'>{props.popUpData.date.split('T')[0].split('-').reverse().join('/')}</span></p>
                      <p>Номер счета: <br className='hidden md:flex'/><span className='font-semibold'>{props.popUpData.bankAccount}</span></p>
                      <p>Сумма: <span className='font-semibold'>{props.popUpData.amount}</span></p>
                    </div>
                    <div className='flex flex-1 flex-col gap-2'>
                      <p>Фио в заявке: <br className='hidden md:flex'/><span className='font-semibold'>{props.popUpData.fio}</span></p>
                      <p>ИНН: <span className='font-semibold'>{props.popUpData.inn}</span></p>
                      <p>БИК: <span className='font-semibold'>{props.popUpData.bik}</span></p>
                    </div>
                  </div>
                  {props.popUpData.messageFromAdmin?<>
                    <div className='flex flex-col rounded-2xl p-4 min-w-[216px] bg-white shadow-md gap-2'>
                      <span className='font-semibold text-lg'>Сообщение от модерации:</span>
                      <p className='font-light'>{props.popUpData.messageFromAdmin}</p>
                    </div>
                    </>:<>
                    </>}
                  {props.popUpData.status==='В обработке'?
                  <>                  <span className='font-semibold text-lg'>Редактирование:</span>
                  <div className='flex flex-col rounded-2xl p-4 min-w-[216px] bg-white shadow-md gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                    <span className='font-base'>Сообщение юзеру:</span>
                      <textarea type="text" className='focus:outline-none rounded-xl px-3 border w-full h-24' onChange={e=>{setMsgToUser(e.target.value)}} value={msgToUser} placeholder={'Заявка отклонена по причине...'}/>   
                    </div>
                  <div className='flex gap-2'>
                  <button
                    type="button"
                    className="inline-flex flex-1 justify-center rounded-md border border-transparent bg-red-200 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                    onClick={async ()=>{setOpen(!open); 
                      props.closeModal();
                      await userStore.updateWithdrawInfo(props.popUpData.userId,props.popUpData.id, msgToUser, 'Отклонено', props.popUpData.amount);
                      await userStore.getAllWithdraws()
                    }}
                    >
                    Отклонить
                  </button>
                  <button
                    type="button"
                    className="inline-flex flex-1 justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                    onClick={async ()=>{setOpen(!open); 
                      props.closeModal();
                      await userStore.updateWithdrawInfo(props.popUpData.userId,props.popUpData.id, msgToUser, 'Выплачено', props.popUpData.amount);
                      await userStore.getAllWithdraws()
                    }}
                    >
                    Выплатить
                  </button>
                </div>
                </div></>
                  :<></>
                }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default observer(AdminWithdrawInfo);