/* eslint-disable */
// required for client side js
export const defaultSlides = () => {

  const Zoom = require("reveal.js/plugin/zoom/zoom");
  const Notes = require("reveal.js/plugin/notes/notes");
  const Search = require("reveal.js/plugin/search/search");
  const Markdown = require("reveal.js/plugin/markdown/markdown");

  const Reveal = require('reveal.js/dist/reveal');
  new Reveal({
    plugins: [Zoom, Notes, Search, Markdown]
  }).initialize({hash: true})

}

/* eslint-enabled */
