import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
 
const Home = lazy(() => import("../views/Home"));
const View1 = lazy(() => import("../views/View1"));

export const Router = ({ isMobile }: any) => {
  if (isMobile) {
    return <div>Mobile</div>;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view1" element={<View1 />} />
      </Routes>
    </Suspense>
  );
};
