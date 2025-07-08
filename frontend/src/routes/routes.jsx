import React,{ lazy, Suspense }  from "react";
import { Routes, Route } from 'react-router-dom';


const Home = lazy(() => import('../pages/Landing'));


const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />


      </Routes>
    </Suspense>
  );
};

export default AppRoutes;