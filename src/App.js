import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
      <AuthWrapper>
              <Routes>
                  <Route path='/' element={
                      <PrivateRoute>
                          <Dashboard></Dashboard>
                      </PrivateRoute>} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='*' element={<Error/>} />
              </Routes>
      </AuthWrapper>

  );
}

export default App;
