import { jsx } from "react/jsx-runtime";
import * as React from "react";
import { lazy, Suspense } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
const Router = lazy(
  () => import("./assets/index-NIjWtxuI.js").then((n) => n.i).then((module) => ({ default: module.Router }))
);
function render({ path, isMobile }) {
  console.log("path is", path);
  console.log("isMobile from back", isMobile);
  const html = ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: path, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(Router, { isMobile }) }) }) })
  );
  return { html };
}
export {
  render
};
