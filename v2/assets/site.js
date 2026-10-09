document.getElementById("yr").textContent = new Date().getFullYear();

  // Theme. Respects the OS until the viewer chooses, then remembers the choice.
  (function () {
    var root = document.documentElement, btn = document.getElementById("tt");
    try { var saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
    btn.addEventListener("click", function () {
      var dark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = dark ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    });
  })();

  // Greeting and the local clock — small, but they say someone is actually here.
  (function () {
    var hr = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "numeric", hour12: false }).format(new Date()));
    document.getElementById("greet").textContent =
      hr < 5 ? "Still up" : hr < 12 ? "Good morning" : hr < 17 ? "Good afternoon" : "Good evening";
    var clock = document.getElementById("clock"),
        mkt = document.getElementById("mkt"), pip = document.getElementById("pip");

    // NSE trades 09:15–15:30 IST, Monday to Friday.
    var tick = function () {
      var now = new Date(),
          f = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Kolkata", weekday: "short", hour: "2-digit",
            minute: "2-digit", hour12: false
          }).formatToParts(now),
          get = function (t) { return (f.find(function (x) { return x.type === t; }) || {}).value; },
          hh = Number(get("hour")), mm = Number(get("minute")), day = get("weekday");

      clock.textContent = "Bengaluru, IN · IST " + get("hour") + ":" + get("minute");

      var weekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].indexOf(day) > -1,
          mins = hh * 60 + mm, open = 555, close = 930,
          live = weekday && mins >= open && mins < close;

      pip.classList.toggle("live", live);
      mkt.textContent = live
        ? "NSE open · " + Math.floor((close - mins) / 60) + "h " + ((close - mins) % 60) + "m to close"
        : "NSE closed";
    };
    tick(); setInterval(tick, 30000);
  })();

  // Portrait: tilt toward the cursor, and move the gloss with it.
  (function () {
    var box = document.getElementById("portrait");
    if (!box || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var tilt = box.querySelector(".tilt"), frame = null;

    box.addEventListener("pointermove", function (e) {
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = null;
        var r = box.getBoundingClientRect(),
            x = (e.clientX - r.left) / r.width,
            y = (e.clientY - r.top) / r.height;
        tilt.style.transform =
          "rotateY(" + ((x - .5) * 14).toFixed(2) + "deg) rotateX(" + ((.5 - y) * 14).toFixed(2) + "deg)";
        box.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
        box.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      });
    });
    box.addEventListener("pointerleave", function () { tilt.style.transform = ""; });
  })();

  // Work: one control, two readings.
  (function () {
    var seg = document.querySelector(".seg");
    var views = { manager: document.getElementById("v-manager"), ic: document.getElementById("v-ic") };
    function show(v) {
      views.manager.hidden = v !== "manager";
      views.ic.hidden = v !== "ic";
      seg.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.view === v));
      });
    }
    seg.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (b) show(b.dataset.view);
    });
    seg.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      var bs = [].slice.call(seg.querySelectorAll("button"));
      var i = bs.indexOf(document.activeElement); if (i === -1) return;
      e.preventDefault();
      var n = bs[(i + (e.key === "ArrowRight" ? 1 : -1) + bs.length) % bs.length];
      n.focus(); show(n.dataset.view);
    });
  })();

  // The bottom dock: names the section in view, and opens the list on tap.
  (function () {
    var btn = document.getElementById("dock"), sheet = document.getElementById("sheet"),
        label = document.getElementById("dock-label");
    if (!btn) return;

    function close() { sheet.hidden = true; btn.setAttribute("aria-expanded", "false"); }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = sheet.hidden;
      sheet.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", close);
    sheet.addEventListener("click", close);
    addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    var names = { about: "About", work: "Work", lab: "Lab", writing: "Writing", contact: "Contact" };
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        label.textContent = names[id] || "Work";
        sheet.querySelectorAll("a").forEach(function (a) {
          if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    Object.keys(names).forEach(function (id) {
      var el = document.getElementById(id); if (el) spy.observe(el);
    });
  })();

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .1 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
