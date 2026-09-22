/* =========================================================
   Scott Allen Memorial — start list flight filter
   ========================================================= */
(function () {
  "use strict";

  var filters = document.getElementById("slFilters");
  var flightList = document.getElementById("flightList");
  if (!filters || !flightList) { return; }

  var buttons = Array.prototype.slice.call(filters.querySelectorAll(".sl-filter"));
  var blocks = Array.prototype.slice.call(flightList.querySelectorAll(".fl-block"));

  function show(flight) {
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-flight") === flight ? "true" : "false");
    });
    blocks.forEach(function (block) {
      block.hidden = flight !== "all" && block.getAttribute("data-flight") !== flight;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { show(b.getAttribute("data-flight")); });
  });
})();
