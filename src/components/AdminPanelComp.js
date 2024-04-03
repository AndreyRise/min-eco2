import { observer } from "mobx-react-lite";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Context } from "../index.js";
import { useContext, useEffect, useState } from "react";
import svg from "../img/svgs.js";
import logo from '../img/logo.PNG';
import AllReleases from "./AllReleases.js";
import Settings from "../components/settings.js";
import AllUsers from "./AllUsers.js";
import AllWithdrawals from "./AllWithdrawals.js";
import AllLinks from "./AllLinks.js";




function AdminPanelComp(params) {

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
    if (userStore.user?.role === 'USER') navigate('/dashboard/main');
    if (userStore.user?.role === 'ADMIN') navigate('/adminPanel/allReleases');
  },[])

  function NavBarComp (pos) {
    return (<>
      <div className="flex flex-col overflow-auto justify-between">
        <div className="flex justify-center flex-1">
          <img className='max-h-[7.5rem]  ' src={logo} alt='logo'/>
        </div>
        <ul className="px-4 flex flex-2 flex-col justify-self-center">
          <li className="navBarBtn" onClick={()=>{setLoading(true);setActionDetect(!actionDetect); navigate('/adminPanel/allReleases')}}>{svg.allReleases}Релизы</li>
          <li className="navBarBtn" onClick={()=>{setLoading(true);setActionDetect(!actionDetect); navigate('/adminPanel/allUsers')}}>{svg.allUsers}Пользователи</li>
          <li className="navBarBtn" onClick={()=>{setLoading(true);setActionDetect(!actionDetect); navigate('/adminPanel/allWithdrawals')}}>{svg.withdrawals}Заявки на вывод</li>
          <li className="navBarBtn" onClick={()=>{setLoading(true);setActionDetect(!actionDetect); navigate('/adminPanel/links')}}>{svg.links}Линки</li>
          <li className="navBarBtn" onClick={()=>{setLoading(true);setActionDetect(!actionDetect); navigate('/adminPanel/settigns')}}>{svg.gear}Настройки</li>
          <li className="navBarBtn" onClick={()=>{userStore.logout().then(()=>{navigate("/login")})}}>{svg.exit}Выйти</li>
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
    </>:<>

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
          <Route index path="/allReleases" element={<AllReleases />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/allWithdrawals" element={<AllWithdrawals />} />
          <Route path="/links" element={<AllLinks />} />
          <Route path="/settigns" element={<Settings />} />
        </Routes>
      </div>
      </>}
    </div>
  )
}
export default observer(AdminPanelComp);