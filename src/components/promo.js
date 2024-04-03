import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../index.js";
import { useContext, useEffect } from "react";
import vk from '../img/vk.png';
import spotify from '../img/spotify.png';
import yandex from '../img/yandex.png';

function PromoComp(params) {
  
const {userStore} = useContext(Context);
const navigate = useNavigate();

// useEffect(() => {
//   if (userStore.user.role !== 'USER') navigate('/login')
// }, [])


  return(
    <div className='flex flex-col gap-3'>
      <h1 className='font-bold text-2xl'>Промо</h1>
      <h1 className='font-semibold text-xl'>Подавать на промо нужно как минимум за неделю до даты релиза</h1>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a href="https://yandex.ru/support/music/performers-and-copyright-holders/new-release.html" target="_blank">
          <div className="divWrap flex flex-col items-center justify-center flex-1">
            <img className="h-[80px]" src={yandex}></img>
            <span className="font-semibold">Yandex</span>
          </div>
        </a>
        <a href="https://vk.com/app5708398_-147845620" target="_blank">
          <div className="divWrap flex flex-col items-center justify-center flex-1">
            <img className="h-[80px]" src={vk}></img>
            <span className="font-semibold">VK</span>
          </div>
        </a>
        <a href="https://artists.spotify.com/ru/help/article/pitching-music-to-playlist-editors" target="_blank">
          <div className="divWrap flex flex-col items-center justify-center flex-1">
            <img className="h-[80px]" src={spotify}></img>
            <span className="font-semibold w-full text-center">Spotify</span>
          </div>
        </a>
      </div>
    </div>
  )
}
export default observer(PromoComp);