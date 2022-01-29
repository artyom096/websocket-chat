import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { RootState } from './store/store';
import Chat from './views/Chat';
import Enter from './views/Enter';
import ErrorPage from './views/ErrorPage';
import SomethingWentWrong from './views/SomethingWentWrong';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const history = useNavigate()

  React.useEffect(() => {
    if(!isAuth){
      history("/")
    }
  }, [])

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Enter />}/>
          <Route path="/chat/:id" element={<Chat />}/>
          <Route path="/wrong" element={<SomethingWentWrong />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
