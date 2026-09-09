/* =========================================================
   Scott Allen Memorial — hole carousel + Formspree AJAX
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Hole-by-hole data (Drøbak Golfklubb scorecard) ---------- */
  var HOLES = [
    { n: 1,  par: 4, si: 17, m: 277, note: "A gentle short par 4 to open with — a chance to settle the nerves before the round bites." },
    { n: 2,  par: 4, si: 5,  m: 352, note: "Played across a small lake. The tournament’s first real test of nerve off the tee." },
    { n: 3,  par: 5, si: 3,  m: 439, note: "A reachable par 5 — get on in two and a birdie here is worth four Stableford points." },
    { n: 4,  par: 3, si: 13, m: 137, note: "Short iron, all carry. Miss the green and par gets hard quickly." },
    { n: 5,  par: 4, si: 7,  m: 251, note: "A driveable par 4 to a heavily bunkered green sitting beneath the power lines." },
    { n: 6,  par: 3, si: 9,  m: 179, note: "The longest of the front-nine par 3s — a proper mid-iron." },
    { n: 7,  par: 4, si: 1,  m: 335, note: "Stroke index 1. The hardest hole on the card — a par here is a small victory." },
    { n: 8,  par: 5, si: 15, m: 443, note: "The last par 5 you’ll see all day. Take whatever points are on offer." },
    { n: 9,  par: 4, si: 11, m: 341, note: "Back toward the clubhouse to close the front nine." },
    { n: 10, par: 4, si: 6,  m: 313, note: "The back nine begins — and there isn’t a single par 5 from here to the house." },
    { n: 11, par: 4, si: 18, m: 277, note: "The easiest hole on the card on paper. Points expected here." },
    { n: 12, par: 4, si: 10, m: 240, note: "Short, but rarely as simple as the yardage suggests." },
    { n: 13, par: 4, si: 2,  m: 354, note: "Second hardest on the course. Keep it in play and move on." },
    { n: 14, par: 4, si: 16, m: 270, note: "A shorter two-shotter — a chance to claw points back." },
    { n: 15, par: 3, si: 14, m: 142, note: "Mid-iron par 3 with trouble long." },
    { n: 16, par: 4, si: 8,  m: 317, note: "Doglegs left between two par 3s, the fairway narrowing to a ditch down the left." },
    { n: 17, par: 3, si: 12, m: 121, note: "The shortest hole on the course — a flick with a wedge, but the card says three." },
    { n: 18, par: 4, si: 4,  m: 350, note: "A strong closing par 4 back to the clubhouse — and the banquet." }
  ];

  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  var track = document.getElementById("carTrack");
  var dotsWrap = document.getElementById("carDots");
  var carousel = document.getElementById("holeCarousel");
  var countEl = document.getElementById("carCount");

  if (track && dotsWrap && carousel) {
    var index = 0;

    HOLES.forEach(function (h, i) {
      var slide = document.createElement("div");
      slide.className = "car-slide";
      slide.setAttribute("role", "group");
      slide.setAttribute("aria-roledescription", "slide");
      slide.setAttribute("aria-label", "Hole " + h.n + " of 18");
      slide.innerHTML =
        '<div class="cs-top">' +
          '<span class="cs-kicker">' + (h.n <= 9 ? "Front nine" : "Back nine") + "</span>" +
          '<span class="cs-num">' + pad2(h.n) + "</span>" +
        "</div>" +
        '<div class="cs-stats">' +
          stat("Par", h.par) +
          stat("Index", h.si) +
          stat("Metres", h.m.toLocaleString("en")) +
        "</div>" +
        '<p class="cs-note">' + h.note + "</p>";
      track.appendChild(slide);

      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to hole " + h.n);
      dot.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(dot);
    });

    var dots = Array.prototype.slice.call(dotsWrap.children);

    function stat(lbl, val) {
      return '<div class="cs-stat"><span class="cs-l">' + lbl + '</span><span class="cs-v">' + val + "</span></div>";
    }
    function go(i) {
      index = (i + HOLES.length) % HOLES.length;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      if (countEl) { countEl.textContent = "Hole " + pad2(HOLES[index].n) + " / 18"; }
      dots.forEach(function (d, di) {
        if (di === index) { d.setAttribute("aria-current", "true"); }
        else { d.removeAttribute("aria-current"); }
      });
    }

    carousel.querySelector(".car-prev").addEventListener("click", function () { go(index - 1); });
    carousel.querySelector(".car-next").addEventListener("click", function () { go(index + 1); });

    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(index - 1); }
      if (e.key === "ArrowRight") { go(index + 1); }
    });

    var startX = null;
    carousel.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener("touchend", function (e) {
      if (startX === null) { return; }
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { go(dx < 0 ? index + 1 : index - 1); }
      startX = null;
    }, { passive: true });

    go(0);
  }

  /* ---------- Formspree AJAX submission ---------- */
  var form = document.getElementById("regForm");
  var statusEl = document.getElementById("formStatus");

  if (form && statusEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.className = "form-status";
      statusEl.textContent = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.classList.add("sent");
            statusEl.className = "form-status ok";
            statusEl.textContent = "You’re in — registration received. We’ll be in touch with pairings, tee times and the banquet address.";
            form.reset();
          } else {
            return res.json().then(function (body) {
              var msg = body && body.errors
                ? body.errors.map(function (x) { return x.message; }).join(", ")
                : "Something went wrong. Please try again.";
              throw new Error(msg);
            });
          }
        })
        .catch(function (err) {
          statusEl.className = "form-status err";
          statusEl.textContent = err.message + " — or email jakob@ndcconferences.com directly.";
        });
    });
  }
})();
