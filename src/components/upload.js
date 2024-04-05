import { observer } from "mobx-react-lite";
import { Context } from "../index.js";
import { useNavigate } from "react-router-dom";
import { useContext,  useState, Fragment, useEffect, useCallback } from "react";
import { Listbox, Transition, Dialog } from '@headlessui/react';
import uploadImg from '../img/HelloPage/upload.png';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import api from '../http/index.js';
import UserService from "../services/UserService.js";
import svg from "../img/svgs.js";



function UploadComp(props) {  

  const {userStore} = useContext(Context);

  const navigate = useNavigate();

  const people = [
    { text: 'Выберите вариант', unavailable: true  },
    { text: 'Инструментал был куплен у битмейкера', unavailable: false  },
    { text: 'Инструментал был написан мной', unavailable: false  }
  ]
  const genres = [
    'Hip-Hop/Rap','Pop','Phonk','R&B','Dance','Alternative','Rock','Blues','African','Arabic','Asian','Brazilian','Children Music','Classical','Country','Easy Listening','Electronic','Folk','Indian','Jazz','Latin','Metal','Reggae','World Music / Regional Folklore','Другое'
  ];  
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(people[0]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {setChecked(!checked);}


  // for release info

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const [proofUrl, setProofUrl] = useState('');
  const [songList, setSongList] = useState([]);
  const [releaseName, setReleaseName] = useState('');
  const [nickname, setNickname] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [soc1,setSoc1] = useState('');
  const [releaseGenre, setReleaseGenre] = useState('Hip-Hop/Rap');
  const [releaseType,setReleaseType] = useState('Сингл');
  const [totalSongs, setTotalSongs] = useState('');
  const [soc2,setSoc2] = useState('');
  const [releaseCover, setReleaseCover] = useState(null);
  const [coverDataURL, setCoverDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file){
      return;
    }
    if (!file.type.match(imageMimeType)) {
      console.log(file)
      alert("Выбран неподходящий файл.");
      return;
    }
    setReleaseCover(file);
  }

  useEffect(() => {
    let fileReader, isCancel = false;
    if (releaseCover) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setCoverDataURL(result)
        }
      }
      fileReader.readAsDataURL(releaseCover);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [releaseCover])

  // for tracks

  const songMimeType = /audio\/(wav)/i;

  const [songName, setSongName] = useState('');
  const [artistNick, setArtistNick] = useState('');
  const [fioBeat, setFioBeat] = useState('');
  const [fioSinger, setFioSinger] = useState('');
  const [songTxt, setSontTxt] = useState('');
  const [ttTiming, setTtTiming] = useState('');
  const [pg18, setPg18] = useState('Да');
  const [songFile, setSongFile] = useState(null);


  const musicChangeHandler = (e) => {
    if(e===null){
      setSongFile(null);
      return;
    }
    const file = e.target.files[0];
    if (!file){
      return;
    }
    if (!file.type.match(songMimeType)) {
      alert("Выбран неподходящий файл.");
      return;
    }
    setSongFile(file);
  }

  // other func's

  const songToArray = () => {
    let id=1;
    if(songList.length>0) {id=songList[songList.length-1].id+1};
    if(songName.length<1 || artistNick.length<1 || fioBeat.length<6 || fioSinger.length<6 || songTxt.length<5 || ttTiming.length<4 || !pg18 || !songFile){
      alert('Заполните всю информацию о треке!')
    } else {
      setSongList([...songList, {
        id:id,
        songName: songName,
        artistNick: artistNick,
        fioBeat: fioBeat,
        fioSinger: fioSinger,
        songTxt: songTxt,
        ttTiming: ttTiming,
        pg18: pg18,
        songFile: songFile
      }]);
      setIsOpen(false);
      clearSongInfo()
    }
  }

  const clearReleaseInfo = () => {
    setProofUrl('');
    setSongList([]);
    setReleaseName('');
    setNickname('');
    setStartDate(new Date());
    setSoc1('');
    setSoc2('');
    setTotalSongs('');
    setReleaseCover(null);
    setCoverDataURL(null);
  }

  const clearSongInfo = () => {
    setSongFile(null);
    setTtTiming('');
    setSontTxt('');
    setFioSinger('');
    setFioBeat('');
    setArtistNick('');
    setSongName('');
  }

  const deleteSong = (id) => {
    const index = songList.findIndex(song => song.id == id);
    let updSongList = songList;
    updSongList.splice(index,1);
    setSongList([...updSongList]);
  }

  const songStack = (napr, index) => {
    if (napr == 'vverh') {
      if(index==0) return
      let updSongList = [...songList];
      const changing = updSongList[index];
      updSongList[index] = updSongList[index-1];
      updSongList[index-1] = changing;
      setSongList(updSongList);
    }
    if (napr == 'vniz') {
      if(index==(songList.length-1)) return
      let updSongList = [...songList];
      const changing = updSongList[index];
      updSongList[index] = updSongList[index+1];
      updSongList[index+1] = changing;
      setSongList(updSongList);
    }
  }

  const uploadCover = useCallback(async() => {
    if(releaseCover){
      try {
        const data = new FormData();
        data.append('cover', releaseCover);
        const path = await api.post('/upload/cover', data, {headers:{'content-type': 'mulpipart/form-data'}});
        return path.data.filename;
      } catch (e) {
        console.log(e.response.data)
      }
    }
  }, [releaseCover])

  async function uploadSong(item,releaseId, userId) {
    try {
      const data = new FormData();
      data.append('song', item.songFile);
      const resp = await api.post('/upload/song', data, {headers:{'content-type': 'mulpipart/form-data'}});
      await UserService.addSong(userId,item.songName,item.artistNick,item.fioSinger,item.fioBeat,item.songTxt,item.ttTiming,item.pg18,resp.data.filename,releaseId)
    } catch (e) {
      console.log(e.response.data)
    }
  }

  async function sendRelease(){
    if(!(soc1==='' || soc2==='' || totalSongs==='' || nickname==='' || releaseName==='' || releaseCover === null)){
      if (+totalSongs>28 || +totalSongs<1){
        alert('В релизе должно быть от 1 до 28 треков!')
        return;
      }
      if (songList.length===0) {
        alert('Добавьте минимум 1 трек.');
        return;
      };
      if (proofUrl==='') {
        alert('Внесите информацию об инструменталах.');
        return;
      };
      if (checked===false) {
        alert('Подтвердите, что все инструменталы принадлежат вам.');
        return;
      };
      if(releaseType==='Сингл' && parseInt(totalSongs)>1){
        alert('Если вы выкладываете Сингл, то кол-во треков не должно превышать 1.')
        return;
      }
      if((songList.length) !== parseInt(totalSongs)){
        alert('Указанное количество треков не соответствует количеству добавленных.')
        return;
      }
      try {
        const uplCoverUri = await uploadCover();
        const uplReleaseInfo= await UserService.addRelease(uplCoverUri,releaseName,nickname,startDate,`${soc1}, ${soc2}`,releaseGenre,releaseType,totalSongs,proofUrl,userStore.user.id) 
        songList.map(async (item)=>{
          await uploadSong(item, uplReleaseInfo.data.id, userStore.user.id)
        })
        clearReleaseInfo();
        setLoading(false);
      } catch (e) {
        console.log(e)
        setLoading(false);
        props.authHandler()
      }
    } else {
      alert('Введите всю нужную информацию о релизе!');
      setLoading(false);
      return;
    }
  }

  function BeatsChoose() {

    return (
      <div className="w-full flex flex-col gap-3">
      <div className="w-240 sm:w-[300px]  h-10 rounded-xl">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate">{selected.text}</span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20">
                {people.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                      }`
                    }
                    value={person}
                    disabled={person.unavailable}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.text}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
      {selected.text==="Инструментал был куплен у битмейкера"?
        <div className="flex flex-col gap-1">
        <p className="text-neutral-600 text-sm sm:text-base">Ссылка на папку с договором, чеком об оплате, видео из проекта с дорожками вокала (желательно и дорожки бита)</p>
        <input type='proofUrl' className='focus:outline-none w-full sm:w-[350px] h-10 rounded-xl pl-3 border' onChange={e=>setProofUrl(e.target.value)} value={proofUrl} placeholder='https://disk.yandex.ru/i/O-_4UkY_gHgjGA'/>
        </div>:<></>}
        {selected.text==="Инструментал был написан мной"?
        <div className="flex flex-col gap-1">
        <p className="text-neutral-600 text-sm sm:text-base">Ссылка на видео из проекта (дорожки бита + вокал)</p>
        <input type='proofUrl' className='focus:outline-none w-full sm:w-[350px] h-10 rounded-xl pl-3 border' onChange={e=>setProofUrl(e.target.value)} value={proofUrl} placeholder='https://disk.yandex.ru/i/O-_4UkY_gHgjGA'/>
        </div>:<></>}
      </div>
    )
  }

  return(
    <div className='flex flex-col w-full gap-3'>
    <h1 className='font-bold text-2xl'>Загрузить релиз</h1>
      {!loading?
      <>
      {/* release info */}
      <div className="divWrap flex flex-col gap-5 sm:flex-row">
        <div className="flex items-center justify-center self-center sm:flex-1 h-[250px] w-[250px]">
          <label className="flex items-center justify-center self-center hover:scale-105 transition-all" >
            <input type="file" className="hidden" onChange={changeHandler}/>
            <img className="rounded-2xl max-w-full max-h-[250px] cursor-pointer" src={coverDataURL||uploadImg}></img>
          </label>
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <h2 className="divText mb-0">Название релиза</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setReleaseName(e.target.value)} value={releaseName} placeholder='Название'/>
          <h2 className="divText mb-0">Никнейм</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setNickname(e.target.value)} value={nickname} placeholder='nick, nick / nick feat. nick'/>
          <h2 className="divText mb-0">Дата релиза</h2>
          <div className='focus:outline-none w-full h-10 rounded-xl border bg-white flex items-center select-none'>
          <DatePicker
            className='focus:outline-none w-full h-9 rounded-xl px-3 cursor-pointer'
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => {setStartDate(date);}}
            excludeDateIntervals={[
              { start: subDays(new Date(), 10000), end: subDays(new Date(), 1) },
            ]}
            placeholderText="Select a date other than today or yesterday"
          />
          </div>
          <h2 className="divText mb-0">Ссылка на активную соц.сеть артиста</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setSoc1(e.target.value)} value={soc1} placeholder='Пример: vk'/>
        </div>
        <div className="flex flex-col flex-1 gap-1">
          <h2 className="divText mb-0">Жанр</h2>
          <select 
          className='focus:outline-none w-full h-10 rounded-xl px-3 border'
          onChange={(e) => {setReleaseGenre(e.target.value)}}
          >
            {
              genres.map((item)=>{
                return <option value={item} key={item}>{item}</option>
              })
            }
          </select>
          <h2 className="divText mb-0">Тип</h2>
          <select 
          className='focus:outline-none w-full h-10 rounded-xl px-3 border'
          onChange={(e) => {setReleaseType(e.target.value)}}>
            <option value="Сингл" key={'single'}>Сингл</option>
            <option value="ЕР" key={'EP'}>ЕР</option>
            <option value="Альбом" key={'Album'}>Альбом</option>
          </select>
          <h2 className="divText mb-0">Кол. аудио в релизе</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setTotalSongs(e.target.value)} value={totalSongs} placeholder='Максимум 28'/>
          <h2 className="divText mb-0">Ссылка на карточку музыканта</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setSoc2(e.target.value)} value={soc2} placeholder='Карточка музыканта'/>
        </div>
      </div>
      <div className="divWrap overflow-auto flex flex-col gap-2">
        <table className="table table-bordernone w-full ">
          <thead className="border-b-2 border-gray-300">
            <tr className="">
              <th className="tableText"></th>
              <th className="tableText"></th>
              <th className="tableText">Название трека</th>
              <th className="tableText">Никнейм</th>
              <th className="tableText">ФИО битмейкера</th>
              <th className="tableText">ФИО автора</th>
              <th className="tableText">Отрывок для TikTok</th>
              <th className="tableText">18+</th>
              <th className="tableText pr-[10px]">Удалить</th>
            </tr>
          </thead>
          <tbody className="">
          {songList.map((song,index) => {
            return <tr key={song.id} className=''>
              <td className="py-2"><div onClick={(e) => {songStack('vverh',index)}} className="flex items-center justify-center w-full rounded-full bg-white cursor-pointer hover:scale-110 shadow-md transition-all "><div className='scale-75'>{svg.vverh}</div></div></td>
              <td className="py-2"><div onClick={(e) => {songStack('vniz',index)}} className="flex items-center justify-center w-full rounded-full bg-white cursor-pointer hover:scale-110 transition-all shadow-md"><div className='scale-75'>{svg.vniz}</div></div></td>
              <td className="py-2"><div className="flex items-center justify-center w-full">{song.songName}</div></td>
              <td className="py-2"><div className="flex items-center justify-center w-full">{song.artistNick}</div></td>
              <td className="py-2"><div className="flex items-center justify-center w-full">{song.fioBeat}</div></td>
              <td className="py-2"><div className="flex items-center justify-center w-full">{song.fioSinger}</div></td>
              <td className="py-2"><div className="flex items-center justify-center w-full">{song.ttTiming}</div></td>
              <td className="py-2"><div className="flex items-center justify-center w-full">{song.pg18}</div></td>
              <td className="py-2 flex items-center justify-center w-full "><button onClick={(e) => deleteSong(e.target.id)} className="flex hover:scale-110 shadow-md items-center justify-center rounded-full bg-sky-500 w-[30px] h-[30px] relative transition-all hover:bg-sky-800 text-white"><div id={song.id} className="w-full h-full absolute z-20 opacity-0"></div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
</button></td>
              </tr>
          })}
          </tbody>
        </table>
        <div className="flex flex-col w-full items-start justify-center ">
          <button className='shadow-md text-sm rounded-full bg-sky-500  py-2 px-4 text-center font-semibold text-white transition-all hover:bg-sky-800' onClick={() => setIsOpen(true)}>Добавить трек</button>
        </div>
      </div>
      {/* copy rights for beat */}
      <div className="divWrap flex flex-col gap-3">
        <BeatsChoose/>
        <div className="flex gap-2">
          <input type="checkbox" onChange={handleClick} checked={checked} className='scale-110'></input>
          <p className="text-sm sm:text-base">Я являюсь правообладателем инструментала(-ов), все права на песню(-и) принадлежат мне</p>
        </div>
      </div>
      <button className='text-md rounded-full bg-sky-500 w-[160px] self-center py-2 px-4 text-center font-semibold text-white transition-all hover:bg-sky-800' onClick={async () => {
        setLoading(true)
        try {
          await sendRelease();
        } catch (e) {
          alert('Ошибка при отправке релиза')
        }
        }}>
          Отправить
      </button>
      {/* add song pop up */}
  <Transition
  show={isOpen}
  enter="transition duration-100 ease-out"
  enterFrom="transform scale-95 opacity-0"
  enterTo="transform scale-100 opacity-100"
  leave="transition duration-75 ease-out"
  leaveFrom="transform scale-100 opacity-100"
  leaveTo="transform scale-95 opacity-0"
  as={Fragment}
  >
  <Dialog onClose={() => setIsOpen(false)} className="divWrap overflow-scroll absolute z-20 top-0 border-0 h-[100%] w-[100%] flex items-center justify-center rounded-none">
    <Dialog.Panel className="max-h-[100%] w-max min-w-[300px] sm:min-w-[500px] rounded-lg">
      <Dialog.Title><div className="flex flex-row items-center justify-between pb-4 border-b-2 mb-2"><span className="font-bold text-xl">Добавить новый трек</span><div className="flex bg-white min-w-[40px] min-h-[40px] lg:min-w-[30px] lg:min-h-[30px] hover:scale-125 transition-all justify-center items-center rounded-full cursor-pointer select-none" onClick={() => {setIsOpen(false);clearSongInfo()}}><p>X</p></div></div></Dialog.Title>
      <div className="flex flex-col gap-3">
        <div>
          <h2 className="popUpText">Название трека</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setSongName(e.target.value)} value={songName} placeholder='Название'/>
        </div>
        <div>
          <h2 className="popUpText">Никнейм</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setArtistNick(e.target.value)} value={artistNick} placeholder='артист1, артист2'/>
        </div>
        <div>
          <h2 className="popUpText">ФИО битмейкера</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setFioBeat(e.target.value)} value={fioBeat} placeholder='Иванов Иван Иванович'/>
        </div>
        <div>
          <h2 className="popUpText">ФИО автора</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setFioSinger(e.target.value)} value={fioSinger} placeholder='Иванов Иван Иванович'/>
        </div>
        <div>
          <h2 className="popUpText">Текст песни</h2>
          <textarea name="lyrics" rows={4} cols={40} type='proofUrl' className='focus:outline-none w-full rounded-xl p-3 border bg-slate-100 placeholder:text-slate-400 text-black' onChange={e=>setSontTxt(e.target.value)} value={songTxt} placeholder='Запрещено указывать в тексте: Intro, Куплет, Припев, Никнеймы, x2, знаки препинания и тд. Если в песне ЕСТЬ текст, а вы его не указали - песню отклонят. Если в песне НЕТ текста, то напишите «текст отсутствует»'/>
        </div>
        <div>
          <h2 className="popUpText">Отрывок для TikTok</h2>
          <input type='proofUrl' className='focus:outline-none w-full h-10 rounded-xl px-3 border' onChange={e=>setTtTiming(e.target.value)} value={ttTiming} placeholder='00:41 - 01:41'/>
        </div>
        <div>
          <h2 className="popUpText">Нецензурная лексика</h2>
          <select 
          className='focus:outline-none w-full h-10 rounded-xl px-3 border'
          onChange={e=>setPg18(e.target.value)}>
            <option value="Да" key={'yes18'}>Да</option>
            <option value="Нет" key={'no18'}>Нет</option>
          </select>
        </div>
        <label className="flex items-center relative w-full justify-center self-center hover:scale-105 transition-all border-dashed border-black border-2 rounded-xl py-4">
          <input type="file" className="hidden" onChange={musicChangeHandler}/>
          <div className="w-full h-full bg-sky-200 absolute z-10 opacity-50 rounded-xl"></div>
          <div className="z-20 flex flex-col items-center justify-center w-[254px]">
            {!songFile?<>
            <span className="text-center">Нажмите, чтобы<br/> загрузить.</span>
            <span className="text-center">Загрузите аудиофайл</span>
            <span className="text-center">(файл должен быть формата 44100кгц, .wav, 16-24 бит)</span>
            </>:<>
            <span className="text-center">{songFile.name}</span>
            </>}
          </div>
        </label>
        <button className='text-sm rounded-full bg-gray-800 py-2 px-4 text-center font-semibold text-white transition-all hover:bg-gray-950 w-[160px]' onClick={(e) => {musicChangeHandler(null)}}>Удалить файл</button>
        <div className="flex flex-row gap-3 justify-center sm:justify-end mb-5">
          <button className='text-sm rounded-full bg-red-500 py-2 px-4 text-center font-semibold text-white transition-all hover:bg-red-800 w-[110px]' onClick={(e) => {setIsOpen(false);clearSongInfo()}}>Закрыть</button>
          <button className='text-sm rounded-full bg-sky-500 py-2 px-4 text-center font-semibold text-white transition-all hover:bg-sky-800 w-[130px]' onClick={(e) => {songToArray();}}>Сохранить</button>
        </div>
      </div>
    </Dialog.Panel>
  </Dialog>
  </Transition>
      </>:
      <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-[100px] w-[100px]">
          {svg.loader}
        </div>
      </div>

      </>
    } 
    </div>
  )
}
export default observer(UploadComp);