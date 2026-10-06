import "../variables.css";
import "../base.css";
import "../classes.css";
import initOverfade from "overfade";
import { mount } from "svelte";
import App from "./App.svelte";

initOverfade();
mount(App, { target: document.body });
