import * as React from "react";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import MobileDetect from "mobile-detect";

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile() !== null;

console.log("isMobile from navigator", isMobile);

import "./index.css";

const Router = lazy(() =>
  import("./router").then((module) => ({ default: module.Router }))
);

ReactDOM.hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Router isMobile={isMobile} />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
