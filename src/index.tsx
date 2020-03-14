import React from "react";
import { render } from "react-dom";
import { App } from "./components/App";

const element = document.createElement("div");

document.body.append(element);

render(<App />, element);
