
import {  useEffect } from 'react'
import Routes from "./components/Routes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useDispatch} from 'react-redux';


import { currentUser } from './redux/authSlice';



function App() {

const dispatch=useDispatch()
  useEffect(() => {
    
   dispatch(currentUser())
  }, [dispatch]);

  return (

    <>
      
      <Routes />
    
      
      <ToastContainer position="top-left" />

    </>

  );
}

export default App;
