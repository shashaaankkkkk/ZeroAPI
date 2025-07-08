import React,{ lazy, Suspense }  from "react";
import { Routes, Route } from 'react-router-dom';


const Home = lazy(() => import('../pages/Landing'));


const Login = lazy(() => import('../pages/Login'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </Suspense>
  );
};

export default AppRoutes;