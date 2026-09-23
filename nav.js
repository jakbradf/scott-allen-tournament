/* =========================================================
   Scott Allen Memorial — mobile hamburger menu
   Shared by index.html, about.html and start-list.html
   ========================================================= */
(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (!nav || !toggle || !links) { return; }

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-lock", open);
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setOpen(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setOpen(false); }
  });

  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !nav.contains(e.target)) { setOpen(false); }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 720) { setOpen(false); }
  });
})();
