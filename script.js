document.addEventListener("DOMContentLoaded", () => {

/* ================================================= */
/* ================= GLOBAL SETUP ================== */
/* ================================================= */

const desktop = document.getElementById("desktop");
const windows = document.querySelectorAll(".window");
const songs = document.querySelectorAll(".song");
const pages = document.querySelectorAll(".book-page");
const scenes = document.querySelectorAll(".scene");
const scrollRoot = document.querySelector(".cinematic");

let topZ = 3000;
let currentPage = 0;

/* ================================================= */
/* ================= PARTICLES ===================== */
/* ================================================= */

if (desktop) {
  for (let i = 0; i < 25; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.bottom = "-10px";
    p.style.animationDuration = 10 + Math.random() * 10 + "s";
    p.style.animationDelay = Math.random() * 10 + "s";
    desktop.appendChild(p);
  }
}

/* ================================================= */
/* ================= WINDOW SYSTEM ================= */
/* ================================================= */

function centerWindow(win) {
  const rect = win.getBoundingClientRect();
  win.style.left = (window.innerWidth - rect.width) / 2 + "px";
  win.style.top = (window.innerHeight - rect.height) / 2 + "px";
}

document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.open;
    const win = document.getElementById(id);
    if (!win) return;

    windows.forEach(w => w.classList.remove("active"));

    if (!win.dataset.positioned) {
      centerWindow(win);
      win.dataset.positioned = "true";
    }

    win.classList.add("show", "active");
    win.style.zIndex = ++topZ;

    if (id === "soFarWindow") resetCinematic();
    if (id === "letterWindow") setTimeout(() => triggerTyping(0), 600);
  });
});

document.querySelectorAll(".close-dot").forEach(dot => {
  dot.addEventListener("click", e => {
    e.stopPropagation();
    dot.closest(".window")?.classList.remove("show", "active");
  });
});

/* ================================================= */
/* ================= DRAG WINDOWS ================== */
/* ================================================= */

windows.forEach(win => {
  const header = win.querySelector(".window-header");
  if (!header) return;

  let drag = false, sx, sy, sl, st;

  win.addEventListener("mousedown", () => {
    windows.forEach(w => w.classList.remove("active"));
    win.classList.add("active");
    win.style.zIndex = ++topZ;
  });

  header.addEventListener("mousedown", e => {
    drag = true;
    sx = e.clientX;
    sy = e.clientY;
    const r = win.getBoundingClientRect();
    sl = r.left;
    st = r.top;

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  });

  function move(e) {
    if (!drag) return;
    let newLeft = sl + (e.clientX - sx);
    let newTop = st + (e.clientY - sy);

    const maxLeft = window.innerWidth - win.offsetWidth;
    const maxTop = window.innerHeight - win.offsetHeight;

    win.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + "px";
    win.style.top = Math.max(0, Math.min(newTop, maxTop)) + "px";
  }

  function up() {
    drag = false;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  }
});

/* ================================================= */
/* ================= PLAYLIST ====================== */
/* ================================================= */

songs.forEach(song => {
  song.addEventListener("click", () => {
    songs.forEach(s => s.classList.remove("active"));
    song.classList.add("active");

    const embed = document.getElementById("spotifyEmbed");
    if (embed)
      embed.src = `https://open.spotify.com/embed/track/${song.dataset.id}`;
  });
});

/* ================================================= */
/* ================= BOOK SYSTEM =================== */
/* ================================================= */

function updateStack() {
  pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
  });
}
updateStack();

const nextBtn = document.getElementById("nextPage");
const prevBtn = document.getElementById("prevPage");

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentPage >= pages.length) return;

    const pageToFlip = pages[currentPage];
    pageToFlip.classList.add("flipped");

    pageToFlip.ontransitionend = e => {
      if (e.propertyName === "transform") {
        pageToFlip.ontransitionend = null;
        triggerTyping(currentPage);
      }
    };

    currentPage++;
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentPage <= 0) return;
    currentPage--;
    pages[currentPage].classList.remove("flipped");
  });
}

/* ================================================= */
/* ================= TYPING ======================== */
/* ================================================= */

function typeWriter(element, text, speed = 35) {
  element.textContent = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  }
  type();
}

function triggerTyping(pageIndex) {
  const page = pages[pageIndex];
  if (!page) return;

  const paragraph = page.querySelector(".type-target");
  if (paragraph) typeWriter(paragraph, paragraph.dataset.text, 50);
}

/* ================================================= */
/* ================= CINEMATIC ===================== */
/* ================================================= */

if (scrollRoot) {

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      const scene = entry.target;

      if (entry.isIntersecting) {

        scene.classList.remove("active","pull","show-text","show-studies");
        void scene.offsetWidth;
        scene.classList.add("active");

// SCENE RESTARTS
if (scene.classList.contains("scene-1")) restartScene1(scene);
if (scene.classList.contains("scene-2")) restartScene2(scene);

if (scene.classList.contains("scene-3")) {
  setTimeout(() => scene.classList.add("show-studies"), 2000);
}

if (scene.classList.contains("scene-5")) restartScene5(scene);
if (scene.classList.contains("scene-6")) restartScene6(scene);
if (scene.classList.contains("scene-7")) restartScene7(scene);

if (scene.classList.contains("scene-8")) {
  restartScene8(scene);
  scrollRoot.classList.add("scene8-dark");
}

if (scene.classList.contains("scene-9")) restartScene9(scene);
if (scene.classList.contains("scene-12")) restartScene12(scene);
if (scene.classList.contains("scene-13")) restartScene13(scene);
if (scene.classList.contains("scene-16")) restartScene16(scene);
if (scene.classList.contains("scene-15")) restartScene15(scene);
if (scene.classList.contains("scene-17")) restartScene17(scene);




} else {

        scene.classList.remove("active","pull","show-text","show-studies");

        // 🔥 IMPORTANT: remove dark when ANY scene except 8 becomes active
        if (!scene.classList.contains("scene-8")) {
          scrollRoot.classList.remove("scene8-dark");
        }

      }

    });

  }, { root: scrollRoot, threshold: 0.3 });

  scenes.forEach(scene => observer.observe(scene));
}


/* ================================================= */
/* ================= RESET ========================= */
/* ================================================= */

function resetCinematic() {
  if (!scrollRoot) return;

  scrollRoot.scrollTop = 0;
  scenes.forEach(scene =>
    scene.classList.remove("active","pull","show-text","show-studies")
  );

  const scene5 = scrollRoot.querySelector(".scene-5");
  if (scene5) restartScene5(scene5);

  const firstScene = scrollRoot.querySelector(".scene-1");
  if (firstScene) {
    firstScene.classList.add("active");
    restartScene1(firstScene);
  }
}

/* ================================================= */
/* ================= SCENE LOGIC =================== */
/* ================================================= */

function restartScene1(scene) {
  const lines = scene.querySelectorAll(".type-line");
  lines.forEach((line, index) => {
    line.textContent = "";
    setTimeout(() => typeWriter(line, line.dataset.text, 35), index * 1200);
  });
}

function restartScene2(scene) {
  const globe = scene.querySelector(".globe");
  if (!globe) return;

  // Reset instantly
  globe.style.transition = "none";
  globe.style.bottom = "-480px";
  globe.style.transform = "translateX(-50%) rotate(0deg)";

  scene.classList.remove("pull", "show-text");

  // Force reflow
  void globe.offsetWidth;

  // Replay animation
  setTimeout(() => {
    globe.style.transition =
      "bottom 4s cubic-bezier(.22,1,.36,1), transform 4s cubic-bezier(.22,1,.36,1)";
    globe.style.bottom = "0";
    globe.style.transform = "translateX(-50%) rotate(720deg)";

    // After globe finishes
    setTimeout(() => {
      scene.classList.add("pull");

      setTimeout(() => {
        scene.classList.add("show-text");
      }, 2000);

    }, 4000);

  }, 50);
}


/* ================================================= */
/* ================= SCENE 5 ======================= */
/* ================================================= */

let scene5Timeouts = [];

function restartScene5(scene){

  scene5Timeouts.forEach(t => clearTimeout(t));
  scene5Timeouts = [];

  const card = scene.querySelector("#swipeCard");
  const phoneText = scene.querySelector("#phoneText");
  const sideText = scene.querySelector("#sideText");

  if(!card || !phoneText || !sideText) return;

  card.style.transition = "none";
  card.style.transform = "translate(0,0)";
  card.style.opacity = "1";

  phoneText.className = "phone-text";
  phoneText.textContent = "";

  sideText.textContent = "";
  sideText.classList.remove("show");

  scene5Timeouts.push(
    setTimeout(()=>{
      typeSide("It started with something simple.");
    },600)
  );
}

const card = document.getElementById("swipeCard");
const phoneText = document.getElementById("phoneText");
const sideText = document.getElementById("sideText");
const phone = document.querySelector(".phone");

if (card) {

  let startX = 0, startY = 0, currentX = 0, currentY = 0, dragging = false;

  function typeSide(text, speed = 35){
    sideText.textContent = "";
    sideText.classList.add("show");

    let i = 0;
    function type(){
      if(i < text.length){
        sideText.textContent += text.charAt(i++);
        setTimeout(type, speed);
      }
    }
    type();
  }

  card.addEventListener("pointerdown", e => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    card.style.transition = "none";
  });

  window.addEventListener("pointermove", e => {
    if (!dragging) return;

    currentX = e.clientX - startX;
    currentY = e.clientY - startY;

    card.style.transform =
      `translate(${currentX}px, ${currentY}px) rotate(${currentX * 0.08}deg)`;
  });

  window.addEventListener("pointerup", () => {
    if (!dragging) return;
    dragging = false;
    card.style.transition = "transform .4s ease, opacity .4s ease";

    if (currentX > 120) swipeRight();
    else if (currentY < -120) swipeUp();
    else resetCard();
  });

  function swipeRight(){
    card.style.transform = "translate(400px,0) rotate(20deg)";
    card.style.opacity = "0";

    typeSide("No… this isn’t right. I need to do something better.");

    scene5Timeouts.push(setTimeout(resetCard, 1800));
  }

  function swipeUp(){

    card.style.transform = "translate(0,-450px)";
    card.style.opacity = "0";

    scene5Timeouts.push(setTimeout(()=>{
      typeSide("It took me lots of courage… but it was worth it.");
    },400));

    scene5Timeouts.push(setTimeout(()=>{
      phoneText.className = "phone-text super pop";
      phoneText.textContent = "Superswipe";
    },1000));

    scene5Timeouts.push(setTimeout(()=>{
      phoneText.className = "phone-text";
      phoneText.textContent = "";
    },3000));

    scene5Timeouts.push(setTimeout(()=>{
      phoneText.className = "phone-text match pop";
      phoneText.textContent = "Matched";

      const flash = document.createElement("div");
      flash.className = "match-flash";
      phone.appendChild(flash);
      setTimeout(()=> flash.remove(),1000);

    },6000));
  }

  function resetCard(){
    currentX = 0;
    currentY = 0;
    card.style.transform = "translate(0,0)";
    card.style.opacity = "1";
  }
}

/* ================================================= */
/* ================= SCENE 6 ======================= */
/* ================================================= */

let scene6Timeouts = [];
let scene6Started = false;

function restartScene6(scene){

  // Clear timeouts
  scene6Timeouts.forEach(t => clearTimeout(t));
  scene6Timeouts = [];
  scene6Started = false;

  const notif = scene.querySelector("#scene6Notif");
  const chat = scene.querySelector("#scene6Chat");
  const firstMsg = scene.querySelector("#scene6HeinoFirst");
  const input = scene.querySelector("#scene6Input");
  const side = scene.querySelector("#scene6Side");

  if(!notif || !chat || !firstMsg || !input || !side) return;

  /* ===== FULL RESET ===== */

  // Reset notification
  notif.classList.remove("show");
  notif.classList.remove("hidden");

  // Clear entire chat area
  chat.innerHTML = "";

  // Re-append the first message in hidden state
  firstMsg.classList.remove("show");
  firstMsg.classList.add("hidden");
  chat.appendChild(firstMsg);

  // Hide input
  input.classList.add("hidden");

  // Reset side text
  side.textContent = "";
  side.classList.remove("show");

  /* ===== INTRO ===== */

  scene6Timeouts.push(setTimeout(()=>{
    notif.classList.add("show");
    typeScene6("This notification got me on chokehold…", side);
  },1000));

  /* ===== NOTIFICATION CLICK ===== */

  notif.onclick = () => {

    if(scene6Started) return;
    scene6Started = true;

    notif.classList.remove("show");

    scene6Timeouts.push(setTimeout(()=>{
      firstMsg.classList.remove("hidden");
      firstMsg.classList.add("show");
      input.classList.remove("hidden");
    },400));
  };

  /* ===== USER REPLY CLICK ===== */

  input.onclick = () => {

    input.classList.add("hidden");

    const yourMsg = document.createElement("div");
    yourMsg.className = "chat-bubble you show";
    yourMsg.textContent = "Hello!! hala nahihiya ako sayooo";
    chat.appendChild(yourMsg);

    typeScene6("I was really shaking when you sent me that message.", side);

    scene6Timeouts.push(setTimeout(()=>{

      const typing = document.createElement("div");
      typing.className = "chat-bubble heino show";
      typing.textContent = "Typing...";
      chat.appendChild(typing);

      scene6Timeouts.push(setTimeout(()=>{

        typing.textContent = "Bat ba nahihiya ka sakin!! HAHA";

        scene6Timeouts.push(setTimeout(()=>{
          typeScene6("And then we started to talk…", side);
        },2000));

      },3000));

    },2000));
  };
}

/* ===== Typing helper ===== */

function typeScene6(text, element, speed = 35){
  element.textContent = "";
  element.classList.add("show");

  let i = 0;
  function type(){
    if(i < text.length){
      element.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  }
  type();
}



/* ================================================= */
/* ================= SCENE 7 ======================= */
/* ================================================= */

let scene7Interval = null;
let scene7Positions = [];

function restartScene7(scene){

  const chatArea = scene.querySelector("#scene7Chat");
  const moon = scene.querySelector("#scene7Moon");
  const side = scene.querySelector("#scene7Side");

  if(!chatArea || !moon || !side) return;

  // RESET
  chatArea.innerHTML = "";
  scene7Positions = [];

  moon.style.opacity = ".3";
  side.textContent = "";
  side.classList.remove("show");

  if(scene7Interval){
    clearInterval(scene7Interval);
    scene7Interval = null;
  }

  setTimeout(()=>{
    typeScene7("We just kept talking… and somehow, time disappeared.", side);
  },1200);

  setTimeout(()=>{
    startBatch(chatArea, moon);
  },2500);
}


/* ================= BATCH ================= */

function startBatch(chatArea, moon){

  const messages = [
    "Ano ginagawa mo ngayon?",
    "Bat gising ka paaa",
    "Ang random mo HAHAHA",
    "ang cute 😭",
    "Tunasan",
    "Sm muntinlupa",
    "MCL Ka din??",
    "Slowburn gusto koo",
    "HAHAHAHAHA",
    "SKZ",
    "Xdinary Heroes",
    "Ariana Grandeee",
    "Hindi ko napansin 1AM na",
    "Internet Friendsss",
    "Talk to you laterrr",
    "Bikeeeee",
    "Wait kwento mo ulit",
    "HAHAHAHA grabe ka",
    "Work",
    "Bat parang ang bilis ng gabi",
    "Ang burgis",
    "Ang cute mo kaya",
    "Seryoso ka ba dyan HAHAHA",
    "Ang galing mooo",
    "Ang saya ng gabi no?",
    "Grb b",
    "I HATE YOUUU",
    "Kwento mo ulit yung kanina",
    "Wait natatawa ako HAHAHA",
    "Hala gising ka pa pala"
  ];

  let index = 0;
  let moonLevel = 0.3;

  scene7Interval = setInterval(() => {

    if(index >= 12){  // 12 per batch

      clearInterval(scene7Interval);

      const bubbles = chatArea.querySelectorAll(".float-bubble");
      bubbles.forEach(b => b.classList.add("fade"));

      setTimeout(()=>{
        chatArea.innerHTML = "";
        scene7Positions = [];
        moon.style.opacity = ".3";
        startBatch(chatArea, moon);
      },5000);

      return;
    }

    createBubble(
      messages[Math.floor(Math.random()*messages.length)],
      chatArea
    );

    moonLevel += 0.05;
    moon.style.opacity = moonLevel;

    index++;

  }, 2500); // slower & dramatic
}


/* ================= SMART SPAWN ================= */

function createBubble(text, container){

  const bubble = document.createElement("div");
  bubble.className = "float-bubble";
  bubble.classList.add(Math.random() > 0.5 ? "you" : "heino");
  bubble.textContent = text;

  container.appendChild(bubble);

  const rect = container.getBoundingClientRect();
  const bubbleRect = bubble.getBoundingClientRect();

  const padding = 80;

  // Dead zones
  const topDeadZone = rect.height * 0.18;      // avoid title area
  const centerTop = rect.height * 0.40;
  const centerBottom = rect.height * 0.60;     // avoid center text
  const bottomDeadZone = rect.height * 0.85;   // avoid bottom cut

  let attempts = 0;
  let x, y;
  let safe = false;

  while(!safe && attempts < 60){

    const spawnLeft = Math.random() > 0.5;

    if(spawnLeft){
      x = padding + Math.random() * (rect.width * 0.35);
    } else {
      x = rect.width * 0.65 + Math.random() * (rect.width * 0.30 - padding);
    }

    // Choose top or bottom zone ONLY
    if(Math.random() > 0.5){
      y = topDeadZone +
          Math.random() * (centerTop - topDeadZone);
    } else {
      y = centerBottom +
          Math.random() * (bottomDeadZone - centerBottom);
    }

    // Avoid overlapping previous bubbles
    const tooClose = scene7Positions.some(pos =>
      Math.abs(pos.x - x) < 160 &&
      Math.abs(pos.y - y) < 90
    );

    if(!tooClose){
      safe = true;
      scene7Positions.push({x,y});
    }

    attempts++;
  }

  bubble.style.left = x + "px";
  bubble.style.top  = y + "px";

  // Slight float variation
  const floatAmount = 60 + Math.random()*60;
  bubble.style.animation = `floatUp ${10 + Math.random()*4}s ease-in-out forwards`;

  requestAnimationFrame(()=>{
    bubble.classList.add("show");
  });
}


/* ================= TYPING ================= */

function typeScene7(text, element, speed = 40){
  element.textContent = "";
  element.classList.add("show");

  let i = 0;
  function type(){
    if(i < text.length){
      element.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  }
  type();
}

/* ================= SCENE 8 CLEAN ================= */

let scene8Timeouts = [];
let scene8StatusInterval = null;

function restartScene8(scene){

  /* ===== CLEAN PREVIOUS ===== */

  scene8Timeouts.forEach(t => clearTimeout(t));
  scene8Timeouts = [];

  if(scene8StatusInterval){
    clearInterval(scene8StatusInterval);
    scene8StatusInterval = null;
  }

  const scrollRoot = document.querySelector(".cinematic");
  const title = scene.querySelector("#scene8Title");
  const line1 = scene.querySelector("#scene8Line1");
  const line2 = scene.querySelector("#scene8Line2");
  const line3 = scene.querySelector("#scene8Line3");
  const timer = scene.querySelector("#scene8Timer");
  const statusLayer = scene.querySelector("#scene8Status");

  if(!title || !timer || !statusLayer) return;

  /* ===== DARK OVERLAY ===== */

  if(scrollRoot) scrollRoot.classList.add("scene8-dark");

  /* ===== RESET TEXT ===== */

  [title,line1,line2,line3,timer].forEach(el=>{
    if(el){
      el.style.opacity = 0;
      el.style.transform = "translateY(20px)";
    }
  });

  timer.textContent = "Day 1";

  /* ===== TEXT SEQUENCE ===== */

  scene8Timeouts.push(setTimeout(()=>{
    title.style.opacity = 1;
    title.style.transform = "translateY(0)";
  },1500));

  scene8Timeouts.push(setTimeout(()=>{
    line1.style.opacity = 1;
    line1.style.transform = "translateY(0)";
  },3500));

  scene8Timeouts.push(setTimeout(()=>{
    line2.style.opacity = 1;
    line2.style.transform = "translateY(0)";
  },5500));

  scene8Timeouts.push(setTimeout(()=>{
    line3.style.opacity = 1;
    line3.style.transform = "translateY(0)";
  },7500));

  scene8Timeouts.push(setTimeout(()=>{
    timer.style.opacity = 1;
    timer.style.transform = "scale(1)";
  },9000));

  /* ===== AGGRESSIVE TIME JUMP ===== */

  scene8Timeouts.push(setTimeout(()=>{
    timer.textContent = "Day 3";
  },12000));

  scene8Timeouts.push(setTimeout(()=>{
    timer.textContent = "1 Week";
  },15000));

  scene8Timeouts.push(setTimeout(()=>{
    timer.textContent = "1 Month";
  },18000));

  /* ===== START FALLING STATUS ===== */

  startScene8Status(statusLayer);
}


/* ================= FALLING STATUS LOOP ================= */

function startScene8Status(layer){

  layer.innerHTML = "";

  const statuses = [
    "Seen 10:47 PM",
    "Nabikmchi posted a new story",
    "Nabikmchi posted a new post",
    "Seen",
    "Delivered",
    "Last seen yesterday",
    "Active now",
    "Seen 1:12 AM",
    "Active 3 hours ago",
    "Nabikmchi liked your story"
  ];

  scene8StatusInterval = setInterval(()=>{

    const bubble = document.createElement("div");
    bubble.className = "scene8-status";
    bubble.textContent = statuses[Math.floor(Math.random()*statuses.length)];

    const rect = layer.getBoundingClientRect();

    /* Avoid center (where emotional text sits) */
    const centerStart = rect.width * 0.35;
    const centerEnd = rect.width * 0.65;

    let x;

    if(Math.random() > 0.5){
      x = Math.random() * centerStart;
    } else {
      x = centerEnd + Math.random() * (rect.width - centerEnd);
    }

    bubble.style.left = x + "px";

    layer.appendChild(bubble);

    /* Auto remove after animation */
    setTimeout(()=>{
      bubble.remove();
    },10000);

  },1800);
}

/* ================= SCENE 9 SIMPLE ================= */

const scene9 = document.querySelector(".scene-9");
const scene9Emoji = document.getElementById("scene9Emoji");

if(scene9Emoji){

  scene9Emoji.addEventListener("click", () => {

    scene9.classList.add("bright");

  });

}

/* ================= SCENE 9 – RAY OF HOPE ================= */

function restartScene9(scene){

  const emoji = scene.querySelector(".scene9-emoji");

  if(!emoji) return;

  // FULL RESET
  scene.classList.remove("bright");

  // Remove old click listeners by cloning
  const newEmoji = emoji.cloneNode(true);
  emoji.parentNode.replaceChild(newEmoji, emoji);

  // Add fresh click listener
  newEmoji.addEventListener("click", () => {
    scene.classList.add("bright");
  });

}

/* ================= SCENE 13 ================= */

function restartScene13(scene){

  const message = scene.querySelector("#scene13Message");
  const sendBtn = scene.querySelector("#scene13Send");
  const finalLine = scene.querySelector("#scene13Final");

  if(!message) return;

  scene.classList.remove("sent");
  finalLine.classList.remove("show");
  sendBtn.classList.add("hidden");

  message.textContent = "Since you were so blunt kahapon...";

  let clicked = false;

  message.onclick = () => {

    if(clicked) return;
    clicked = true;

    const text = "I had a huge crush on you before HAHAHA.";
    message.textContent = "";

    let i = 0;

    function type(){
      if(i < text.length){
        message.textContent += text.charAt(i++);
        setTimeout(type, 50);
      } else {
        sendBtn.classList.remove("hidden");
      }
    }

    type();
  };

  sendBtn.onclick = () => {

    scene.classList.add("sent");
    sendBtn.classList.add("hidden");

    setTimeout(()=>{
      finalLine.classList.add("show");
    },1500);
  };
}

/* ================= SCENE 15 ================= */

function restartScene15(scene){

  const title = scene.querySelector(".scene15-title");
  const lines = scene.querySelectorAll(".scene15-line");

  if(!title) return;

  title.style.opacity = 0;
  title.style.transform = "translateY(30px)";

  lines.forEach(line=>{
    line.style.opacity = 0;
    line.style.transform = "translateY(20px)";
  });

  setTimeout(()=>{
    title.style.opacity = 1;
    title.style.transform = "translateY(0)";
  },400);

  lines.forEach((line,index)=>{
    setTimeout(()=>{
      line.style.opacity = 1;
      line.style.transform = "translateY(0)";
    },800 + index*600);
  });
}

/* ================= SCENE 16 ORB SYSTEM ================= */

const orbs = document.querySelectorAll(".memory-orb");
const modal = document.getElementById("memoryModal");
const mediaContainer = document.getElementById("memoryMedia");
const title = document.getElementById("memoryTitle");
const text = document.getElementById("memoryText");

orbs.forEach(orb => {
  orb.addEventListener("click", () => {

    const type = orb.dataset.type;
    const src = orb.dataset.src;

    title.textContent = orb.dataset.title;
    text.textContent = orb.dataset.text;

    mediaContainer.innerHTML = "";

    if(type === "video"){
      const video = document.createElement("video");
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      mediaContainer.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = src;
      mediaContainer.appendChild(img);
    }

    modal.classList.add("show");
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    mediaContainer.innerHTML = "";
  }
});


function restartScene17(scene){

  const introLines = scene.querySelectorAll(".scene17-intro p");
  const introWrap = scene.querySelector(".scene17-intro");
  const tilesWrap = scene.querySelector(".scene17-promises");
  const tiles = scene.querySelectorAll(".promise-tile");
  const proposal = scene.querySelector(".scene17-proposal");
  const yesBtn = scene.querySelector(".scene17-yes");
  const vowsContainer = scene.querySelector(".scene17-vows");

  if(!proposal || !yesBtn || !vowsContainer) return;

  // RESET
  vowsContainer.innerHTML = "";
  proposal.classList.remove("show");
  introWrap.classList.remove("scene17-fade");
  tilesWrap.classList.remove("scene17-fade");

  introLines.forEach(line=> line.classList.remove("show"));
  tiles.forEach(tile=>{
    tile.classList.remove("expanded");
    tile.innerHTML = tile.textContent;
  });

  // Intro animation
  introLines.forEach((line,index)=>{
    setTimeout(()=>{
      line.classList.add("show");
    }, index * 900);
  });

  let clickedCount = 0;

  tiles.forEach(tile=>{

    tile.onclick = null;

    tile.onclick = () => {

      if(tile.classList.contains("expanded")) return;

      tile.classList.add("expanded");

      const extra = document.createElement("div");
      extra.className = "promise-extra";
      extra.textContent = tile.dataset.text;
      tile.appendChild(extra);

      setTimeout(()=> extra.classList.add("show"), 50);

      clickedCount++;

      if(clickedCount === tiles.length){

        setTimeout(()=>{
          introWrap.classList.add("scene17-fade");
          tilesWrap.classList.add("scene17-fade");
        },600);

        setTimeout(()=>{
          proposal.classList.add("show");
        },1400);
      }
    };
  });

  yesBtn.onclick = null;

yesBtn.onclick = () => {

  proposal.classList.remove("show");

  const ending = scene.querySelector(".scene17-ending");

  const vows = [
    "I choose you.",
    "On the easy days.",
    "On the heavy ones.",
    "",
    "I promise to protect your peace.",
    "I promise to grow beside you.",
    "I promise to keep choosing you.",
    "",
    "Every single day."
  ];

  let index = 0;

  function showNext(){

    if(index >= vows.length){

      // Fade vows out
      setTimeout(()=>{
        vowsContainer.style.opacity = "0";
      },1500);

      // Show final ending
      setTimeout(()=>{
        ending.classList.add("show");
      },3500);

      return;
    }

    const p = document.createElement("p");
    p.textContent = vows[index];
    vowsContainer.appendChild(p);

    setTimeout(()=> p.classList.add("show"),100);

    index++;
    setTimeout(showNext, 1100);
  }

  showNext();
};

}



/* ================= SCENE 12 SIMPLE OBSERVER ================= */

(function(){

  const scene = document.querySelector(".scene-12");
  if(!scene) return;

  const lines = scene.querySelectorAll(".scene12-line");
  let timeouts = [];

  function playScene12(){

    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];

    lines.forEach(l => l.classList.remove("show"));

    lines.forEach((line,index)=>{
      timeouts.push(
        setTimeout(()=>{
          line.classList.add("show");
        }, index * 1600)
      );
    });
  }

  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        playScene12();
      }
    });
  },{ threshold:0.6 });

  observer.observe(scene);


/* ===== FAVORITES SYSTEM ===== */

const favCards = document.querySelectorAll(".fav-card");
const favModal = document.getElementById("favoritesModal");
const favImg = document.getElementById("favoritesImage");
const favDesc = document.getElementById("favoritesDesc");
const favClose = document.getElementById("favoritesClose");

favCards.forEach(card => {
  card.addEventListener("click", () => {
    favImg.src = card.getAttribute("data-img");
    favDesc.textContent = card.getAttribute("data-desc");
    favModal.classList.add("show");
  });
});

if(favClose){
  favClose.addEventListener("click", () => {
    favModal.classList.remove("show");
    favImg.src = "";
  });
}

if(favModal){
  favModal.addEventListener("click", (e) => {
    if(e.target === favModal){
      favModal.classList.remove("show");
      favImg.src = "";
    }
  });
}



})();



});

/* ================= LOVE QUIZ SYSTEM ================= */

const quizData = [
  {
    question: "My Favorite Color",
    options: ["Red", "Cyan", "Green", "Pink"],
    answer: 1
  },
  {
    question: "Who did not greet me on my birthday",
    options: ["Heino", "Friends", "Family", "No one"],
    answer: 0
  },
  {
    question: "Kailan mo ko minahal",
    options: ["April", "June", "August", "March"],
    answer: 3
  },
  {
    question: "Your missing candy",
    options: ["Ice cream", "Flat tops", "Wonka Pixy", "Dodo"],
    answer: 2
  },
  {
    question: "I ??? You",
    options: ["Wuv", "Wolf", "Word", "luv"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;

const quizArea = document.getElementById("quizArea");
const quizNext = document.getElementById("quizNext");
const quizResult = document.getElementById("quizResult");

function loadQuestion(){
  quizNext.classList.add("hidden");
  const q = quizData[currentQuestion];

  quizArea.innerHTML = `
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options">
      ${q.options.map((opt, index) =>
        `<div class="quiz-option" data-index="${index}">${opt}</div>`
      ).join("")}
    </div>
  `;

  document.querySelectorAll(".quiz-option").forEach(option => {
    option.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e){
  const selected = parseInt(e.target.dataset.index);
  const correct = quizData[currentQuestion].answer;

  document.querySelectorAll(".quiz-option").forEach((opt, index)=>{
    opt.style.pointerEvents = "none";
    if(index === correct){
      opt.classList.add("correct");
    }
    if(index === selected && selected !== correct){
      opt.classList.add("wrong");
    }
  });

  if(selected === correct){
    score++;
  }

  quizNext.classList.remove("hidden");
}

quizNext.addEventListener("click", ()=>{
  currentQuestion++;
  if(currentQuestion < quizData.length){
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult(){
  quizArea.innerHTML = "";
  quizNext.classList.add("hidden");

  let message = "";

  if(score === quizData.length){
    message = "Perfect score. You really are my person. 💖";
  } else if(score >= 3){
    message = "You passed. But I still love you even if you fail. 💘";
  } else {
    message = "It's okay. I'll still choose you every time. ❤️";
  }

  quizResult.classList.remove("hidden");
  quizResult.innerHTML = `
    You got ${score}/${quizData.length}! <br><br>
    ${message}
  `;
}

/* Optional restart when window reopens */
function restartLoveQuiz(){
  currentQuestion = 0;
  score = 0;
  quizResult.classList.add("hidden");
  loadQuestion();
}

/* Load first question immediately */
if(quizArea){
  loadQuestion();
}

/* ================= THEME SYSTEM ================= */

const desktop = document.getElementById("desktop");
const themeCards = document.querySelectorAll(".theme-card");
const resetThemeBtn = document.querySelector(".reset-theme");

themeCards.forEach(card => {
  card.addEventListener("click", () => {

    // Remove all theme classes safely
    desktop.classList.remove(
      "theme-default",
      "theme-sunset",
      "theme-night",
      "theme-lavender"
    );

    // Add selected theme
    desktop.classList.add(card.dataset.theme);
  });
});

resetThemeBtn.addEventListener("click", () => {
  desktop.classList.remove(
    "theme-sunset",
    "theme-night",
    "theme-lavender"
  );

  desktop.classList.add("theme-default");

  /* ================= CAMERA SYSTEM ================= */

const cameraWindow = document.getElementById("cameraWindow");
const video = document.getElementById("cameraPreview");
const canvas = document.getElementById("photoCanvas");
const captureBtn = document.getElementById("captureBtn");
const retakeBtn = document.getElementById("retakeBtn");

let cameraStream = null;

async function startCamera(){
  try{
    cameraStream = await navigator.mediaDevices.getUserMedia({ video:true });
    video.srcObject = cameraStream;
  }catch(err){
    alert("Camera access denied or not supported.");
  }
}

function stopCamera(){
  if(cameraStream){
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
}

if(cameraWindow){
  // Start camera when window opens
  document.querySelectorAll('[data-open="cameraWindow"]').forEach(btn=>{
    btn.addEventListener("click", ()=>{
      setTimeout(startCamera,300);
    });
  });

  // Stop camera when window closes
  cameraWindow.querySelector(".close-dot").addEventListener("click", ()=>{
    stopCamera();
  });
}

if(captureBtn){
  captureBtn.addEventListener("click", ()=>{
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video,0,0);

    canvas.classList.remove("hidden");
    video.classList.add("hidden");

    captureBtn.classList.add("hidden");
    retakeBtn.classList.remove("hidden");
  });
}

if(retakeBtn){
  retakeBtn.addEventListener("click", ()=>{
    canvas.classList.add("hidden");
    video.classList.remove("hidden");

    captureBtn.classList.remove("hidden");
    retakeBtn.classList.add("hidden");
  });
}

});


