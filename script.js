/* =========================================================
   Scott Allen Memorial — hole-by-hole films, registration state, Formspree AJAX
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Hole-by-hole flyover films (Drøbak Golfklubb) ----------
     Video IDs and hole data from the club's Hullvideoer page. */
  var HOLES = [
    { par: 4, idx: 17, m: 277, v: "LUblHs-nm18" },
    { par: 4, idx: 5,  m: 352, v: "cNENrV9YUSw" },
    { par: 5, idx: 3,  m: 439, v: "qY4EFaFD6as" },
    { par: 3, idx: 13, m: 137, v: "n4noQcQP_FQ" },
    { par: 4, idx: 7,  m: 251, v: "UgoNaF5_0qg" },
    { par: 3, idx: 9,  m: 179, v: "ld23emKqlXE" },
    { par: 4, idx: 1,  m: 335, v: "_oJbMNfAKA8" },
    { par: 5, idx: 15, m: 443, v: "L7Uy-tV1Tnk" },
    { par: 4, idx: 11, m: 341, v: "S_tZcw4BM7U" },
    { par: 4, idx: 6,  m: 313, v: "cTGlnZw5wjE" },
    { par: 4, idx: 18, m: 277, v: "nLLUMWmQ1bs" },
    { par: 4, idx: 10, m: 240, v: "JUVTUHkyOFk" },
    { par: 4, idx: 2,  m: 354, v: "8Ol8yajWhdA" },
    { par: 4, idx: 16, m: 270, v: "Kb0n0K2nVhs" },
    { par: 3, idx: 14, m: 142, v: "wYqqNajQPaI" },
    { par: 4, idx: 8,  m: 317, v: "pdXLoMH0mOk" },
    { par: 3, idx: 12, m: 121, v: "9P6aYknT-iY" },
    { par: 4, idx: 4,  m: 350, v: "mNm0F66eimA" }
  ];

  var hgSelector = document.getElementById("holeSelector");
  if (hgSelector) {
    var hgStill = document.getElementById("holeStill");
    var hgFilm = document.getElementById("holeFilm");
    var hgWatch = document.getElementById("holeWatch");
    var hgNumber = document.getElementById("holeNumber");
    var hgPar = document.getElementById("holePar");
    var hgIndex = document.getElementById("holeIndex");
    var hgMetres = document.getElementById("holeMetres");
    var current = 0;
    var squares = [];

    HOLES.forEach(function (h, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "hg-sq";
      b.textContent = String(i + 1);
      b.setAttribute("aria-label", "Hole " + (i + 1));
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () { go(i); });
      hgSelector.appendChild(b);
      squares.push(b);
    });

    function pad2(n) { return (n < 10 ? "0" : "") + n; }

    function go(i) {
      current = (i + HOLES.length) % HOLES.length;
      var h = HOLES[current];
      var watch = "https://www.youtube.com/watch?v=" + h.v;
      hgStill.onerror = function () {
        this.onerror = null;
        this.src = "https://img.youtube.com/vi/" + h.v + "/hqdefault.jpg";
      };
      hgStill.src = "https://img.youtube.com/vi/" + h.v + "/maxresdefault.jpg";
      hgStill.alt = "Flyover still, hole " + (current + 1);
      hgFilm.href = watch;
      hgWatch.href = watch;
      hgNumber.textContent = pad2(current + 1);
      hgPar.textContent = h.par;
      hgIndex.textContent = h.idx;
      hgMetres.textContent = h.m;
      squares.forEach(function (b, bi) {
        b.setAttribute("aria-pressed", bi === current ? "true" : "false");
      });
    }

    document.getElementById("holePrev").addEventListener("click", function () { go(current - 1); });
    document.getElementById("holeNext").addEventListener("click", function () { go(current + 1); });

    hgSelector.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(current - 1); }
      else if (e.key === "ArrowRight") { go(current + 1); }
      else { return; }
      squares[current].focus();
    });

    go(0);
  }

  /* ---------- Registration open / closed ----------
     Flip to false to swap the register panel for the "entries closed" state. */
  var REGISTRATION_OPEN = true;

  var regOpenPanel = document.getElementById("regOpenPanel");
  var regClosedPanel = document.getElementById("regClosedPanel");
  if (regOpenPanel && regClosedPanel && !REGISTRATION_OPEN) {
    regOpenPanel.hidden = true;
    regClosedPanel.hidden = false;
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
            statusEl.textContent = "";
            form.classList.add("sent");
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
