import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './views/Chat';
import Enter from './views/Enter';
import ErrorPage from './views/ErrorPage';
import SomethingWentWrong from './views/SomethingWentWrong';

function App() {
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
