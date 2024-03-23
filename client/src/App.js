import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { routers } from './router/router';
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
    </BrowserRouter>
  );
}

export default App;
