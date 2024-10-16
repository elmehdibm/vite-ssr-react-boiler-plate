import * as React from "react";
import { lazy, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

const Router = lazy(() =>
  import("./router").then((module) => ({ default: module.Router }))
);

interface IRenderProps {
  path: string;
  isMobile: boolean;
}

export function render({ path, isMobile }: IRenderProps) {
  console.log("path is", path);
  console.log("isMobile from back", isMobile);
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={path}>
        <Suspense fallback={<div>Loading...</div>}>
          <Router isMobile={isMobile} />
        </Suspense>
      </StaticRouter>
    </React.StrictMode>
  );
  return { html };
}
