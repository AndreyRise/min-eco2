import '../styles/Home.css';
import logo from '../img/logoSmW.PNG';
import yeat from '../img/HelloPage/chel.PNG';
import emojiForYeat from '../img/HelloPage/emojiForChel.png';
import { NavLink } from 'react-router-dom';

function HelloPage() {

  return (
    <div className='HelloPage'>
      <header className='fixed top-0 z-20 w-full backdrop-blur transition-colors'>
        <div className='flex items-center px-6 py-6 xl:px-24 w-full'>
          <NavLink to='/' className='shrink-0'>
            <img className='transition duration-150 hover:ease-in-out h-[50px] hover:scale-110 drop-shadow-md shadow-black max-h-[6.25rem]' src={logo} alt='logo'/>
          </NavLink>
          <nav className='navbar w-full'>
            <ul className='flex gap-6 justify-end text-slate-50'>
              <li className='group hover:text-cyan-800'>
                <a href="https://vk.com/public214751870" className="flex items-center justify-between py-3.5 font-bold transition-all drop-shadow-md shadow-black scale-110" target="_blank" rel='noopener noreferrer'>VK</a>
              </li>
              <li className='group hover:text-cyan-800'>
                <NavLink to='/login' className="flex items-center justify-between py-3.5 font-bold transition-all drop-shadow-md shadow-black scale-110">
                LOGIN
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section className='relative pb-10 pt-20 md:pt-32 lg:h-[88vh]'>
          <div className='container lg:max-w-[1200px] h-full px-7'>
            <div className='grid h-full items-center gap-4 md:grid-cols-12'>
              <div className='col-span-6 flex h-full flex-col items-center justify-center pt-5 pb-5 md:items-start md:pt-20'>
                <h1 className='mb-6 text-center text-4xl md:text-left lg:text-5xl xl:text-6xl text-neutral-800'>
                <span className='fontBilya text-white drop-shadow-md shadow-black'>ECOSYSTEM</span><br/> <span className='fontBilya text-white drop-shadow-md shadow-black'>MIN.ECO</span>
                </h1>
                <p className="mb-3 text-center text-lg md:text-left text-gray-600 font-semibold">
                Удобная система для независимых артистов и лейблов:
                </p>
                <ul className='mb-8 text-center text-lg md:text-left text-gray-600 font-semibold'>
                    <li className='list-disc list-inside'>Быстро доставляем контент на все площадки без посредников</li>
                    <li className='list-disc list-inside'>80% дохода - ваши, никаких комиссий или скрытых плат</li>
                    <li className='list-disc list-inside'>Промо-поддержка на витрины площадок</li>
                  </ul>
                <div className="flex space-x-4">
                  <NavLink to='/login' className="w-36 rounded-full bg-sky-500 py-3 px-8 text-center font-semibold text-white  transition-all hover:bg-sky-800">
                  Войти
                  </NavLink>
                </div>
              </div>
              <div className='col-span-6 flex justify-center lg:justify-end'>
                <img className='absolute md:top-[30%] lg:top-[17%] rotate-6 z-20 max-h-[200px] max-w-[200px] md:max-h-[23rem] xl:top-[20%] 2xl:top-[25%] md:max-w-[23rem] lg:max-h-[32rem] lg:max-w-[32rem]  emojiEdit' src={emojiForYeat} alt='emojiForYeat'/>
                <img className='max-h-[200px] max-w-[200px] md:max-h-[23rem] md:max-w-[23rem] lg:max-h-[32rem] lg:max-w-[32rem]' src={yeat} alt='yeat'/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HelloPage;
