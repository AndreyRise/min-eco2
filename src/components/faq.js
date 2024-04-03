import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../index.js";
import { useContext, useEffect } from "react";
import { Disclosure } from '@headlessui/react'


function FaqComp(params) {
  
const {userStore} = useContext(Context);
const navigate = useNavigate();

// useEffect(() => {
//   if (userStore.user.role !== 'USER') navigate('/login')
// }, [])


  return(
    <div className='flex max-h-full flex-col w-full'>
      <h1 className='font-bold text-2xl mb-5'>FAQ:</h1>
      <div className="divWrap max-h-full flex flex-col gap-4 sm:flex-row overflow-auto sm:overflow-y-scroll">
      <div className="flex flex-col gap-4 w-full">
      <div className="bg-white rounded-xl">
        <Disclosure>
          <Disclosure.Button className="p-3 w-full text-left flex flex-row gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 min-h-[24px] min-w-[24px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Когда мне придут выплаты роялти? 
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 p-3">
            Баланс обновляется в личном кабинете ежеквартально, также вы можете получить отчетность в чате.
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className="bg-white rounded-xl">
        <Disclosure>
          <Disclosure.Button className="p-3 w-full text-left flex flex-row gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 min-h-[24px] min-w-[24px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            На какие площадки вы отгружаете?
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 p-3">
          На все возможные лидирующие площадки, а именно: Apple Music, Itunes, Spotify, VK Music, Yandex Music, SberZvuk, Odnoklassniki, Youtube/Youtube Music, Shazam, TikTok, Deezer, Facebook/Instagram, Amazon Music, Claro Música, Saavn, Junodownload, Mondia media, Napster, Playnetwork, Zvooq, 7Digital, Anghami, Thumbplay, Jqox, MillwardBrown, MusicMe, PhonoNet, Qobuz, Tidal, Beeline Music, AMI Entertainment Network, QQ Music (Tencent) и тд.
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className="bg-white rounded-xl">
        <Disclosure>
          <Disclosure.Button className="p-3 w-full text-left flex flex-row gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 min-h-[24px] min-w-[24px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Сколько процентов вы забираете?
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 p-3">
          20% мы забираем себе, 80% достаётся вам
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className="bg-white rounded-xl">
        <Disclosure>
          <Disclosure.Button className="p-3 w-full text-left flex flex-row gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 min-h-[24px] min-w-[24px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Какие требования к обложке и формату музыкального произведения?
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 p-3">
          Требования к обложке: размер 3000х3000 пикселей, формат .jpeg
          Требования к музыкальному произведению: формат WAV, FLAC 44.1кГц, 16bit - 24bit
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className="bg-white rounded-xl">
        <Disclosure>
          <Disclosure.Button className="p-3 w-full text-left flex flex-row gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 min-h-[24px] min-w-[24px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Могу ли я выбрать только один стриминг-сервис для распространения?
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 p-3">
          Нет. Мы хотим, чтобы ваше творчество было доступно большинству слушателей во всем мире, мы дистрибьютируем музыку на все ведущие цифровые платформы
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className="bg-white rounded-xl">
        <Disclosure>
          <Disclosure.Button className="p-3 w-full text-left flex flex-row gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 min-h-[24px] min-w-[24px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Могу ли я выбрать только один стриминг-сервис для распространения?
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 p-3">
          Нет. Мы хотим, чтобы ваше творчество было доступно большинству слушателей во всем мире, мы дистрибьютируем музыку на все ведущие цифровые платформы
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className="bg-white rounded-xl">
        <Disclosure>
          <Disclosure.Button className="p-3 w-full text-left flex flex-row gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 min-h-[24px] min-w-[24px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Как получить промо на площадках?
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 p-3">
            Мы сами отправляем заявки площадкам на каждое музыкальное произведение, но релиз должен быть предоставлен нам минимум за две недели до даты релизы, также подаем на WorldWide promo(Подробнее в чате)
          </Disclosure.Panel>
        </Disclosure>
      </div>
      <div className="bg-white rounded-xl">
        <Disclosure>
          <Disclosure.Button className="p-3 w-full text-left flex flex-row gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 min-h-[24px] min-w-[24px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            Могу ли я распространять записи кавер-версий/ремиксы через MIN.ECO?
          </Disclosure.Button>
          <Disclosure.Panel className="text-gray-500 p-3">
          Да, но важно соблюдать несколько условий. Перед распространением кавер-контента/ремикса необходимо предоставить лицензию на цифровое распространение от правообладателей оригинальной версии композиции - это позволит избежать претензий от авторов оригинального произведения и удаления вашего альбома с цифровых платформ.
          </Disclosure.Panel>
        </Disclosure>
        </div>
        <div className="">
          <p className='font-bold'>
            Не нашли ответ на свой вопрос? Задайте его нам в чат или на почту <span className='font-medium text-blue-400'>support@min.eco</span>
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}
export default observer(FaqComp);