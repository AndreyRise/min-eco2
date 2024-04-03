import { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import {observer} from 'mobx-react-lite';
import logo from '../img/logo.PNG';
import "../styles/Dashboard.css";
import MainComp from "../components/MainComp.js";
import svg from "../img/svgs.js";
import Help from "../components/help.js";
import Upload from "../components/upload.js";
import Catalog from "../components/catalog.js"
import LinksComp from "../components/links.js"
import Finances from "../components/finances.js"
import Promo from "../components/promo.js"
import Faq from "../components/faq.js"
import Settings from "../components/settings.js"
import { NavLink } from 'react-router-dom';

function DashboardPage(params) {

  const [bgActive,setBgActive] = useState(false);

  const {userStore} = useContext(Context);
  const navigate = useNavigate();
  const [actionDetect,setActionDetect] = useState(false)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    userStore.checkAuth().then(()=>{
      if (userStore.isAuth !== true) navigate('/login');
      setLoading(false)
    })
    setBgActive(false);
  },[actionDetect])


  useEffect(() => {
    if (userStore.user.email && userStore.user.approved) {
      userStore.getChatToken(userStore.user.id,userStore.user.name,userStore.user.email).then(()=>{
        const token = localStorage.getItem('ChatToken');
        const name = userStore.user.name;
        const email = userStore.user.email;
        let script = document.createElement('script');
        script.async = true;
        script.innerHTML = 'function jivo_onLoadCallback(){jivo_api.setUserToken("'+token+'");jivo_api.setContactInfo({name: "'+name+'",email: "'+email+'",phone: "",description: ""});};';
        document.getElementsByTagName('head')[0].appendChild(script);
        script = document.createElement('script');
        script.async = true
        script.src = "//code.jivo.ru/widget/KcLFW6nMTw"
        document.getElementsByTagName('head')[0].appendChild(script);
      }).finally(()=>{
        if(userStore.user.addToChatCRM===false){
          userStore.addToChatCRM(userStore.user.id)
        }
      })
    };
  },[userStore.user])


  useEffect(() => {
    if (userStore.user?.role === 'USER') navigate('/dashboard/main');
    if (userStore.user?.role === 'ADMIN') navigate('/adminPanel/allReleases');
  },[])

  const  authHandler = () => {
    setActionDetect(!actionDetect);
  };

  function NavBarComp (pos) {
    return (<>
      <div className="flex flex-col overflow-auto justify-between">
        <div className="flex justify-center flex-1">
          <img className='max-h-[7.5rem]  ' src={logo} alt='logo'/>
        </div>
        <ul className="px-4 flex flex-2 flex-col justify-self-center">
          <li className="navBarBtn" onClick={()=>{
            setLoading(true);
            setActionDetect(!actionDetect); 
            navigate('/dashboard/main')}}>{svg.home}Главная</li>
          <li className="navBarBtn" onClick={()=>{
            setLoading(true);
            setActionDetect(!actionDetect); 
            navigate('/dashboard/upload')}}>{svg.upload}Загрузить релиз</li>
          <li className="navBarBtn" onClick={()=>{
            setLoading(true);
            setActionDetect(!actionDetect); 
            navigate('/dashboard/catalog')}}>{svg.catalog}Каталог</li>
          <li className="navBarBtn" onClick={()=>{
            setLoading(true);
            setActionDetect(!actionDetect); 
            navigate('/dashboard/links')}}>{svg.links}Линки</li>
          <li className="navBarBtn" onClick={()=>{
            setLoading(true);
            setActionDetect(!actionDetect); 
            navigate('/dashboard/finances')}}>{svg.finances}Финансы</li>
          <li className="navBarBtn" onClick={()=>{
            setLoading(true);
            setActionDetect(!actionDetect); 
            navigate('/dashboard/faq')}}>{svg.questionMark}FAQ</li>
          <li className="navBarBtn" onClick={()=>{
            setLoading(true);
            setActionDetect(!actionDetect); 
            navigate('/dashboard/settings')}}>{svg.gear}Настройки</li>
          <li className="w-full" onClick={()=>{userStore.logout()}}><a className="navBarBtn w-full" target="_self" href="https://min.eco/">{svg.exit}Выйти</a></li>
        </ul>
      </div>
    </>
    )
  }
  
  return(
    <div className='min-h-[100vh] h-min w-full flex justify-start lg:gap-x-8 px-2 sm:px-5 py-[5vh] lg:pr-[32px]'>
    {loading?<>
    <div className="w-full h-[full] flex items-center justify-center">
      <div className=" h-[100px] w-[100px]">
      {svg.loader}
      </div>
    </div>
    </>:
    <>{userStore.user.approved?<>
      <div className='block lg:hidden'>
        <button className="bg-white fixed z-10 top-5 right-4 scale-150 hover:scale-175 transition-all rounded-2xl" onClick={()=>setBgActive       (!bgActive)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}     stroke="black"      className="w-6 h-6 scale-75">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        {bgActive?<>
          <nav  className='dashboardNavbar flex fixed top-0 left-0 z-30 h-[100vh] bg-white w-[280px] rounded-3xl flex-col'>
            <NavBarComp/>
          </nav>
          <div className="fixed z-20 top-0 left-0 h-[100vh] w-full bg-black opacity-30" onClick={()=>setBgActive(!bgActive)}></div>
        </>:<></>}
      </div>
      <div className="dashboardNavbar hidden lg:inline">
        <nav  className='dashboardNavbar flex relative top-[0] z-20 h-[90vh] bg-white w-[280px] rounded-3xl flex-col'>
          <NavBarComp/>
        </nav>
      </div>
      <div className="dashboardNavbar flex min-h-[90vh] h-min w-full pt-10 lg:p-0 ">
        <Routes>
          <Route index path="/main" element={<MainComp />} />
          <Route path="/upload" element={<Upload 
          authHandler={authHandler}
          />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/links" element={<LinksComp />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </div></>:<>
      <div className="flex flex-col w-full justify-center items-center">
        <NavLink to='/' className='fontBilya text-center text-4xl text-white drop-shadow-md h-[70px]'>
          <h1>MIN.ECO</h1>
        </NavLink>
        <div className='divWrap w-full max-w-[440px] flex-col '>
          <h1 className='text-center font-bold text-xl mb-2'>Спасибо за регистрацию!</h1>
          <p className="mb-2">Пожалуйста, активируйте учетную запись. Мы выслали вам на почту письмо с ссылкой для активации учётной записи.</p>
          <button className="navBarBtn gap-1 w-full bg-white flex items-center justify-center m-0" onClick={()=>{userStore.logout().then(()=>{navigate("/login")})}}>{svg.exit}Выйти</button>
        </div>
      </div>
      </>}</>}
    </div>
  )
}
export default observer(DashboardPage);