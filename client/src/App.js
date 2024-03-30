import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { routers } from './router/router';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          routers.publicRouter.map((route , index)=>{
             const Page = route.component
            return <Route key={index} path={route.path} element={<Page/>}/>
          })
        }
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
