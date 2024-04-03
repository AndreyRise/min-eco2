import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Context } from "../index.js";
import { useContext, useEffect } from "react";


function HelpComp(params) {
  
const {userStore} = useContext(Context);
const navigate = useNavigate();

// useEffect(() => {
//   if (userStore.user.role !== 'USER') navigate('/login')
// }, [])


  return(
    <div className='container '>
      Help
    </div>
  )
}
export default observer(HelpComp);