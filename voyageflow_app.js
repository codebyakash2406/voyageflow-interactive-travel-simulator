/* ============ voyageflow_app.js (CLEAN & OPTIMIZED) ============ */
/* Option 1 — Clean & readable version with same features as before */

/* ---------- tiny helpers ---------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const fmt = n => '₹' + (n || 0).toLocaleString();

/* ---------- elements (guarded) ---------- */
const page1 = $('#page1'), page2 = $('#page2'), page3 = $('#page3'), page4 = $('#page4');
const heroBg = $('#heroBg'), destContainer = $('#destContainer'), cityNav = $('#cityNav');
const priceSection = $('#priceSection'), totalEl = $('#total'), promoInput = $('#promo');
const modalBG = $('#modalBG'), modalContent = $('#modalContent'), modalClose = $('#modalClose');
const themeToggle = $('#themeToggle'), themeIcon = $('#themeIcon');
const submitBtn = $('#submitBtn'), toCalcBtn = $('#toCalcBtn'), confirmBtn = $('#confirmBtn');
const printBtn = $('#printTicketBtn'), startOverBtn = $('#startOverBtn'), selectorWrap = $('#selectorWrap');
const particleCanvas = $('#particleCanvas');

/* ---------- state ---------- */
let selectedCity = 'paris';
let bookingCounter = Date.now();

/* ---------- city data ---------- */
const cityData = {
  tokyo: {
    key: 'tokyo',
    name: 'Tokyo',
    bg: 'images/tokyo.jpg',
    weather: 'Clear 21°C',
    rating: 4.8,

    luxury_total: 1450000,
    luxury_label: 'Tokyo — Ultimate Luxury Package',

    flights: [
        { id: 't-lux', cls: 'Luxury All-inclusive (Tokyo)', price: 1450000, time: '12h' },
        { id: 't-biz', cls: 'Business Class', price: 450000, time: '12:30' },
        { id: 't-econ', cls: 'Premium Economy', price: 320000, time: '13:50' }
    ],

    /* 🍣 FOOD — Added 4 Luxury Options */
    food: [
        { id: 'tf1', name: 'Sushi Premium (Omakase)', price: 35000 },
        { id: 'tf2', name: 'Chef Tasting Experience', price: 22000 },
        { id: 'tf3', name: 'Tokyo Ramen Tour', price: 12000 },
        { id: 'tf4', name: 'Sky-View Dinner (Shibuya Tower)', price: 45000 }
    ],

    /* 🎎 ACTIVITIES — Added Samurai, Anime, Tech, Nightlife */
    activities: [
        { id: 'ta1', name: 'Private Tokyo Tour + Guide', price: 50000 },
        { id: 'ta2', name: 'Samurai Training Experience', price: 30000 },
        { id: 'ta3', name: 'Anime Studio Visit (VIP)', price: 45000 },
        { id: 'ta4', name: 'Mount Fuji Day Trip', price: 70000 },
        { id: 'ta5', name: 'Tokyo Nightlife VIP Access', price: 55000 }
    ],

    /* 🏨 HOTELS — Added 7★ Royal + Boutique */
    hotels: [
        { id: 'th1', name: '7★ Suite (10 nights)', price: 600000 },
        { id: 'th2', name: '5★ Luxury Tokyo Bay', price: 250000 },
        { id: 'th3', name: 'Zen Garden Royal Suite', price: 380000 }
    ],

    /* ➕ ADD-ONS — Tech + Transport + Photography */
    addons: [
        { id: 'taa1', name: 'Chauffeur + Limo', price: 45000 },
        { id: 'taa2', name: 'Private Bullet Train Upgrade', price: 70000 },
        { id: 'taa3', name: 'Drone Photoshoot Tokyo', price: 35000 },
        { id: 'taa4', name: 'Kimono Dressing + Photoshoot', price: 20000 }
    ]
},

paris: {
    key: 'paris',
    name: 'Paris',
    bg: 'images/paris.jpg',
    weather: 'Cloudy 18°C',
    rating: 4.7,

    luxury_total: 1280000,
    luxury_label: 'Paris — Grand Luxury Package',

    flights: [
        { id: 'p-lux', cls: 'Luxury All-inclusive (Paris)', price: 1280000, time: '08:00' },
        { id: 'p-biz', cls: 'Business Class', price: 420000, time: '07:45' },
        { id: 'p-econ', cls: 'Premium Economy', price: 290000, time: '08:30' }
    ],

    /* ------------------------------------------------------ */
    /* 🥖 FOOD (ADDED MORE LUXE OPTIONS) */
    /* ------------------------------------------------------ */
    food: [
        { id: 'pf1', name: 'Private Wine Tasting + Cheese Pairing', price: 28000 },
        { id: 'pf2', name: 'Michelin-Star Dinner (Le Jules Verne)', price: 55000 },
        { id: 'pf3', name: 'Paris Chocolate & Pastry Tour', price: 18000 },
        { id: 'pf4', name: 'Luxury Seine Dinner Cruise', price: 42000 }
    ],

    /* ------------------------------------------------------ */
    /* 🎭 ACTIVITIES (ADDED 4 MORE ELITE OPTIONS) */
    /* ------------------------------------------------------ */
    activities: [
        { id: 'pa1', name: 'Private Museum Tour (Louvre)', price: 40000 },
        { id: 'pa2', name: 'Eiffel Tower VIP Summit Access', price: 30000 },
        { id: 'pa3', name: 'Versailles Royal Day Tour', price: 60000 },
        { id: 'pa4', name: 'Romantic Seine Photoshoot', price: 25000 },
        { id: 'pa5', name: 'Paris Night Limousine Experience', price: 70000 }
    ],

    /* ------------------------------------------------------ */
    /* 🏨 HOTELS (KEEP SAME OR ADD MORE IF NEEDED) */
    /* ------------------------------------------------------ */
    hotels: [
        { id: 'ph1', name: '5★ Presidential Suite', price: 480000 },
        { id: 'ph2', name: 'Luxury Boutique', price: 220000 },
        { id: 'ph3', name: 'River View Royal Suite', price: 350000 }
    ],

    /* ------------------------------------------------------ */
    /* ➕ ADD-ONS (ADDED 3 LUXE ITEMS) */
    /* ------------------------------------------------------ */
    addons: [
        { id: 'pa2', name: 'Helicopter Tour Over Paris', price: 60000 },
        { id: 'pa3', name: 'Personal Chauffeur (Full Day)', price: 45000 },
        { id: 'pa4', name: 'VIP Shopping Assistant (Champs-Élysées)', price: 30000 },
        { id: 'pa5', name: 'Drone Photography Package', price: 35000 }
    ]
},

  rome: {
    key:'rome', name:'Rome', bg:'images/rome.jpg', weather:'Sunny 24°C', rating:4.6,
    luxury_total:1190000, luxury_label:'Rome — Historic Luxury Package',
    flights:[{id:'r-lux',cls:'Luxury All-inclusive (Rome)',price:1190000,time:'06:30'},{id:'r-biz',cls:'Business Class',price:360000,time:'05:50'}],
    food:[
      {id:'rf1',name:'Gourmet Tasting',price:18000},
      {id:'rf2',name:'Authentic Roman Pasta Experience',price:22000},
      {id:'rf3',name:'Luxury 5-Course Italian Dinner',price:35000},
      {id:'rf4',name:'Wood-Fired Artisan Pizza Tour',price:15000},
      {id:'rf5',name:'Premium Gelato Masterclass',price:12000}
    ],
    activities:[
      {id:'ra1',name:'Private Colosseum Visit',price:30000},
      {id:'ra2',name:'Vatican City VIP Guided Tour',price:40000},
      {id:'ra3',name:'Trevi Fountain Night Walk + Photoshoot',price:18000},
      {id:'ra4',name:'Ancient Rome Exploration Tour',price:26000},
      {id:'ra5',name:'Luxury Wine Tasting (Tuscany Day Trip)',price:55000}
    ],
    hotels:[
      {id:'rh1',name:'Historic 5★ Suite',price:420000},
      {id:'rh2',name:'Rome Royal Palace — Luxury Stay',price:520000},
      {id:'rh3',name:'Colosseum View Elite Rooms',price:470000},
      {id:'rh4',name:'Vatican Premium Residency',price:380000}
    ],
    addons:[
      {id:'ra2',name:'Personal Historian Guide',price:25000},
      {id:'ra3',name:'Luxury Chauffeur (Full Day)',price:30000},
      {id:'ra4',name:'Drone Photography Package',price:28000}
    ]
  },
  bali: {
    key:'bali', name:'Bali', bg:'images/bali.jpg', weather:'Tropical 30°C', rating:4.9,
    luxury_total:1040000, luxury_label:'Bali — Private Island Package',
    flights:[{id:'b-lux',cls:'Luxury All-inclusive (Bali)',price:1040000,time:'09:40'},{id:'b-biz',cls:'Business Class',price:420000,time:'08:50'}],
    food:[
      {id:'bf1',name:'Private Beach Dinner',price:16000},
      {id:'bf2',name:'Floating Breakfast in Infinity Pool',price:14000},
      {id:'bf3',name:'Traditional Balinese Royal Feast',price:20000},
      {id:'bf4',name:'5★ Oceanfront Seafood Platter',price:25000}
    ],
    activities:[
      {id:'ba1',name:'Private Yacht',price:120000},
      {id:'ba2',name:'Ubud Jungle Swing + Photoshoot',price:18000},
      {id:'ba3',name:'Luxury Spa Retreat (Couple)',price:30000},
      {id:'ba4',name:'Scuba Diving + Underwater Photos',price:35000},
      {id:'ba5',name:'Bali Volcano Sunrise Trek',price:26000}
    ],
    hotels:[
      {id:'bh1',name:'Private Villa (10 nights)',price:480000},
      {id:'bh2',name:'Overwater Bungalow Suite',price:520000},
      {id:'bh3',name:'Ocean Cliff Panoramic Villa',price:460000},
      {id:'bh4',name:'Forest View Luxury Treehouse',price:300000}
    ],
    addons:[
      {id:'ba21',name:'Spa & Wellness',price:22000},
      {id:'ba22',name:'Personal Photographer (Full day)',price:18000},
      {id:'ba23',name:'Luxury Airport Pickup',price:12000},
      {id:'ba24',name:'Private Candlelight Setup',price:15000}
    ]
  },
  ny: {
    key:'ny', name:'New York', bg:'images/ny.jpg', weather:'Breezy 19°C', rating:4.5,
    luxury_total:1500000, luxury_label:'New York — Executive Luxury Package',
    flights:[{id:'n-lux',cls:'Luxury All-inclusive (NY)',price:1500000,time:'09:40'},{id:'n-biz',cls:'Business Class',price:520000,time:'09:40'}],
    food:[{id:'nf1',name:'Rooftop Private Dinner',price:40000}],
    activities:[{id:'na1',name:'Broadway + Backstage',price:65000}],
    hotels:[{id:'nh1',name:'Central 5★ Presidential',price:650000}],
    addons:[{id:'na2',name:'VIP City Pass',price:35000}]
  }
};

/* ---------- theme ---------- */
function setTheme(mode){
  if(!document.body) return;
  document.body.classList.remove('theme-dark','theme-light');
  document.body.classList.add(mode === 'light' ? 'theme-light' : 'theme-dark');
  if(themeIcon) themeIcon.textContent = mode === 'light' ? '☀️' : '🌙';
  try{ localStorage.setItem('vf_theme', mode); } catch(e){}
}
if(themeToggle) themeToggle.addEventListener('click', ()=> {
  const cur = document.body.classList.contains('theme-light') ? 'light' : 'dark';
  setTheme(cur === 'light' ? 'dark' : 'light');
});
setTheme(localStorage.getItem('vf_theme') || 'dark');

/* ---------- particles (very light, skip if no canvas) ---------- */
let particles = [];
function initParticles(){
  if(!particleCanvas) return;
  const c = particleCanvas, ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  resize();
  particles = [];
  for(let i=0;i<10;i++) particles.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.6+0.6,vx:(Math.random()-0.5)*0.18,vy:(Math.random()-0.5)*0.18,alpha:Math.random()*0.45+0.05});
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0) p.x = c.width; if(p.x > c.width) p.x = 0;
      if(p.y < 0) p.y = c.height; if(p.y > c.height) p.y = 0;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', resize);
}

/* ---------- hero ---------- */
function setHero(url){
  if(!heroBg) return;
  heroBg.style.backgroundImage = url ? `url("${url}")` : 'none';
  heroBg.style.transform = 'scale(1.05)';
  setTimeout(()=> { if(heroBg) heroBg.style.transform = 'scale(1.03)'; }, 480);
}

/* ---------- render nav & cards ---------- */
function renderCityNavAndCards(){
  if(cityNav) {
    cityNav.innerHTML = Object.values(cityData).map(c=>`<a class="nav-link" data-city="${c.key}">${c.name}</a>`).join('');
    // attach handlers
    $$('.nav-link').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      const city = a.dataset.city;
      activateNav(city);
      chooseCity(city);
    }));
  }

  if(destContainer){
    destContainer.innerHTML = Object.values(cityData).map(c => `
      <div class="dest" id="dest-${c.key}">
        <img loading="lazy" src="${c.bg}" class="dest-img" alt="${c.name}" />
        <div>
          <h3 class="dest-title">${c.name} <span style="font-weight:600;font-size:0.85rem;color:var(--muted)">· ${c.rating} ★</span></h3>
          <p class="dest-text">Weather: ${c.weather} · Luxury: ${Math.round(c.luxury_total/100000)}L approx</p>
          <p class="dest-text">${c.luxury_label}</p>
          <div style="margin-top:8px"><button class="small-btn select-city" data-city="${c.key}">Choose ${c.name}</button></div>
        </div>
      </div>`).join('');
    $$('.select-city').forEach(b => b.addEventListener('click', () => {
      chooseCity(b.dataset.city); activateNav(b.dataset.city);
    }));
  }
}

/* ---------- nav helpers ---------- */
function activateNav(key){
  $$('.nav-link').forEach(a => a.classList.toggle('active', a.dataset.city === key));
}

/* ---------- load pricing UI ---------- */
function loadPricingForCity(key){
  const c = cityData[key];
  if(!c || !priceSection) return;
  let out = '';

  // luxury package (single radio)
  out += `<div class="card"><div class="card-title">Luxury Package <span class="lux-badge">All-inclusive</span></div>`;
  out += `<label><input type="radio" name="flight" class="price-opt" data-id="lux-${c.key}" value="${c.luxury_total}"> ${c.luxury_label} — <strong>${fmt(c.luxury_total)}</strong></label><br>`;
  out += `<small style="color:var(--muted)">Prebuilt ultra-luxury bundle for instant high-end totals.</small></div>`;

  // flights
  out += `<div class="card"><div class="card-title">Flights</div>`;
  c.flights.forEach(f => out += `<label><input type="radio" name="flight" class="price-opt" data-id="${f.id}" value="${f.price}"> ${f.cls} — <strong>${fmt(f.price)}</strong> <span class="price-label">(Time: ${f.time})</span></label><br>`);
  out += `</div>`;

  // hotels
  out += `<div class="card"><div class="card-title">Hotels</div>`;
  c.hotels.forEach(h => out += `<label><input type="radio" name="hotel" class="price-opt" data-id="${h.id}" value="${h.price}"> ${h.name} — <strong>${fmt(h.price)}</strong></label><br>`);
  out += `</div>`;

  // food
  out += `<div class="card"><div class="card-title">Food & Dining</div>`;
  c.food.forEach(f => out += `<label><input type="checkbox" class="price-opt" data-id="${f.id}" value="${f.price}"> ${f.name} — <strong>${fmt(f.price)}</strong></label><br>`);
  out += `</div>`;

  // activities
  out += `<div class="card"><div class="card-title">Activities</div>`;
  c.activities.forEach(a => out += `<label><input type="checkbox" class="price-opt" data-id="${a.id}" value="${a.price}"> ${a.name} — <strong>${fmt(a.price)}</strong></label><br>`);
  out += `</div>`;

  // addons
  if(c.addons && c.addons.length){
    out += `<div class="card"><div class="card-title">Add-ons</div>`;
    c.addons.forEach(a => out += `<label><input type="checkbox" class="price-opt" data-id="${a.id}" value="${a.price}"> ${a.name} — <strong>${fmt(a.price)}</strong></label><br>`);
    out += `</div>`;
  }

  priceSection.innerHTML = out;
  $$('.price-opt').forEach(el => el.addEventListener('change', calculateTotal));
  calculateTotal();
}

/* ---------- promos & animation ---------- */
function applyPromo(total){
  const code = (promoInput && promoInput.value || '').trim().toUpperCase();
  if(!code) return { total, discount:0, applied:false };
  if(code === 'SAVE10' && total > 50000){ const d = Math.round(total * .10); return { total: total - d, discount: d, applied:true }; }
  if(code === 'FLAT500' && total > 80000){ const d = 5000; return { total: total - d, discount: d, applied:true }; }
  return { total, discount:0, applied:false };
}
function animateNumber(from,to,ms,cb){
  const start = performance.now();
  function step(now){
    const t = Math.min(1,(now-start)/ms);
    const eased = t<.5 ? 2*t*t : -1 + (4-2*t)*t;
    cb(Math.round(from + (to-from)*eased));
    if(t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- calculate total ---------- */
function calculateTotal(){
  if(!totalEl) return 0;
  const checked = Array.from(document.querySelectorAll('.price-opt:checked'));
  const raw = checked.reduce((s,c)=> s + Number(c.value || 0), 0);
  const { total } = applyPromo(raw);
  const cur = parseInt((totalEl.textContent||'0').replace(/[₹,]/g,'')) || 0;
  animateNumber(cur, total, 350, v => totalEl.textContent = fmt(v));
  return total;
}

/* ---------- form flow ---------- */
if(submitBtn){
  submitBtn.addEventListener('click', ()=>{
    const fullName = ($('#fullName') && $('#fullName').value.trim()) || '';
    const phone = ($('#phone') && $('#phone').value.trim()) || '';
    const email = ($('#email') && $('#email').value.trim()) || '';
    let ok = true;
    if(fullName.length < 2){ if($('#errName')) $('#errName').textContent = 'Please enter full name'; ok = false; } else if($('#errName')) $('#errName').textContent = '';
    if(!/^\d{10}$/.test(phone)){ if($('#errPhone')) $('#errPhone').textContent = 'Phone must be 10 digits'; ok = false; } else if($('#errPhone')) $('#errPhone').textContent = '';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ if($('#errEmail')) $('#errEmail').textContent = 'Invalid email'; ok = false; } else if($('#errEmail')) $('#errEmail').textContent = '';
    if(!ok) return;
    if(page1) page1.classList.add('hidden');
    if(page2) page2.classList.remove('hidden');
    renderCityNavAndCards();
    chooseCity(selectedCity);
    activateNav(selectedCity);
  });
}

/* next button */
if(toCalcBtn) toCalcBtn.addEventListener('click', ()=>{ if(page2) page2.classList.add('hidden'); if(page3) page3.classList.remove('hidden'); loadPricingForCity(selectedCity); });

/* confirm */
if(confirmBtn) confirmBtn.addEventListener('click', ()=> {
  const total = calculateTotal();
  if(total === 0) return alert('Please select at least one option or the Luxury Package.');
  openSummaryModal();
});

/* print & restart */
if(printBtn) printBtn.addEventListener('click', ()=> printTicketFromModal());
if(startOverBtn) startOverBtn.addEventListener('click', ()=> window.location.reload());

/* ---------- modal & ticket ---------- */
function openSummaryModal(){
  const fullName = ($('#fullName') && $('#fullName').value.trim()) || '';
  const phone = ($('#phone') && $('#phone').value.trim()) || '';
  const email = ($('#email') && $('#email').value.trim()) || '';
  const c = cityData[selectedCity];
  const picks = Array.from(document.querySelectorAll('.price-opt:checked')).map(el => ({ label: el.parentElement.textContent.trim(), value: Number(el.value) }));
  const raw = picks.reduce((s,p)=> s + p.value, 0);
  const { total, discount } = applyPromo(raw);
  const bookingId = 'VF' + (bookingCounter++).toString(36).toUpperCase().slice(-8);

  const ticketHtml = `
    <div class="ticket">
      <div class="top" style="align-items:flex-start;">
        <img class="city-img" src="${c.bg}" alt="${c.name}" />
        <div class="details">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:1.05rem;font-weight:800">${c.name} — ${c.luxury_label}</div>
              <div style="color:var(--muted);margin-top:6px">${c.weather} · Rating: ${c.rating}★</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:0.85rem;color:var(--muted)">Booking ID</div>
              <div style="font-weight:900;color:var(--gold);font-size:1.25rem">${bookingId}</div>
            </div>
          </div>

          <div style="margin-top:10px;display:flex;gap:10px;align-items:center">
            <div style="flex:1">
              <div style="font-size:0.95rem;color:var(--muted)">Passenger</div>
              <div style="font-weight:800">${fullName}</div>
              <div style="color:var(--muted);margin-top:4px">${email} • ${phone}</div>
            </div>

            <div style="width:140px;">
              <canvas id="qrCanvas" width="120" height="120" class="qr-canvas"></canvas>
            </div>
          </div>
        </div>
      </div>

      <hr style="border-color:rgba(255,255,255,0.06);margin:12px 0" />

      <div>
        <div style="display:flex;justify-content:space-between"><div style="color:var(--muted)">Items</div><div style="color:var(--muted)">Amount</div></div>
        <div style="margin-top:8px">
          ${picks.map(p => `<div style="display:flex;justify-content:space-between;margin-bottom:6px"><div>${p.label}</div><div style="font-weight:800">${fmt(p.value)}</div></div>`).join('')}
        </div>

        <hr style="border-color:rgba(255,255,255,0.06);margin:10px 0" />

        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="color:var(--muted)">Subtotal</div>
            <div style="color:var(--muted)">Discount</div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:700">${fmt(raw)}</div>
            <div style="font-weight:700">${fmt(discount || 0)}</div>
          </div>
        </div>

        <div style="margin-top:12px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="color:var(--muted)">Seat</div>
            <div style="font-weight:800">Auto-assigned</div>
          </div>
          <div style="text-align:right">
            <div style="color:var(--gold);font-weight:900;font-size:1.4rem">${fmt(total)}</div>
            <div style="font-size:0.85rem;color:var(--muted)">Status: Confirmed (Demo)</div>
          </div>
        </div>
      </div>
    </div>
  `;

  if(modalContent) modalContent.innerHTML = ticketHtml;
  generateStylizedQR('qrCanvas', `${fullName} | ${bookingId}`);

    if (modalBG) {
    // store data for later use
    modalBG.dataset.bookingId = bookingId;
    modalBG.dataset.name = fullName;
    modalBG.dataset.city = c.name;
    modalBG.dataset.total = total;
    page3.classList.add("hidden");
    page4.classList.remove("hidden");

// Put ticket directly inside THANK YOU page
const box = document.getElementById("ticketContainer");
if (box) box.innerHTML = ticketHtml;
  }
}

/* modal close / save / print */
if(modalClose) modalClose.addEventListener('click', ()=> modalBG && modalBG.classList.add('hidden'));
if($('#modalPrint')) $('#modalPrint').addEventListener('click', ()=> printTicketFromModal());
if($('#modalSave')) $('#modalSave').addEventListener('click', ()=>{
  if(!modalContent) return;
  const txt = modalContent.innerText || '';
  const blob = new Blob([txt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `voyage_summary_${Date.now()}.txt`; a.click(); URL.revokeObjectURL(url);
});

/* print */
function printTicketFromModal(){
  if(!modalContent) return;
  const ticketHtml = modalContent.innerHTML;
  const win = window.open('', '_blank', 'width=900,height=700');
  win.document.write(`<html><head><title>VoyageFlow Ticket</title></head><body style="margin:0;padding:20px;background:#020317;color:#fff">`);
  win.document.write(`<div style="max-width:820px;margin:0 auto;">${ticketHtml}</div>`);
  // transfer QR canvas if exists
  const qrCanvas = document.getElementById('qrCanvas');
  if(qrCanvas){
    const dataUrl = qrCanvas.toDataURL();
    win.document.body.innerHTML = win.document.body.innerHTML.replace('<canvas id="qrCanvas" width="120" height="120" class="qr-canvas"></canvas>', `<img src="${dataUrl}" style="width:120px;height:120px;border-radius:8px;background:#fff;padding:6px" />`);
  }
  win.document.close();
  setTimeout(()=> { win.focus(); win.print(); }, 600);
}

/* ---------- stylized QR generator (simple deterministic) ---------- */
function generateStylizedQR(canvasId, text){
  const c = document.getElementById(canvasId);
  if(!c) return;
  const ctx = c.getContext('2d'), w = c.width, h = c.height;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h);
  // very small hash
  let hash = 0; for(let i=0;i<text.length;i++){ hash = (hash << 5) - hash + text.charCodeAt(i); hash |= 0; }
  // finder squares
  function f(x,y,s){ ctx.fillStyle='#000'; ctx.fillRect(x,y,s,s); ctx.fillStyle='#fff'; ctx.fillRect(x+s*0.15,y+s*0.15,s*0.7,s*0.7); ctx.fillStyle='#000'; ctx.fillRect(x+s*0.3,y+s*0.3,s*0.4,s*0.4); }
  f(6,6,34); f(w-40,6,34); f(6,h-40,34);
  const grid = 7, cell = Math.floor((w-80)/grid), startX = Math.floor((w-cell*grid)/2), startY = Math.floor((h-cell*grid)/2);
  for(let r=0;r<grid;r++) for(let cidx=0;cidx<grid;cidx++){
    const v = ((hash >> ((r*grid + cidx) % 32)) & 1) ^ ((r+cidx) % 2);
    ctx.fillStyle = v ? '#000' : '#fff';
    ctx.fillRect(startX + cidx*cell, startY + r*cell, cell-2, cell-2);
  }
  // small gold dots
  ctx.fillStyle = '#d4af37';
  for(let i=0;i<8;i++){ const x = 18 + Math.abs((hash + i*31)) % (w-36); const y = 18 + Math.abs((hash + i*97)) % (h-36); ctx.beginPath(); ctx.arc(x,y,1.6,0,Math.PI*2); ctx.fill(); }
}

/* ---------- premium dropdown & top small selector ---------- */
function createPremiumDropdown(){
  const wrap = $('#moodDropdownWrap');
  if(!wrap) return;
  const moodHtml = `
    <div class="dropdown" id="moodDropdown">
      <div class="dropdown-selected"><span>Select mood</span><span class="arrow">▼</span></div>
      <ul class="dropdown-options">
        <li data-value="adventure">🔥 Adventure</li>
        <li data-value="romantic">💖 Romantic</li>
        <li data-value="relax">🌿 Relax</li>
        <li data-value="food">🍽 Food</li>
        <li data-value="urban">🌃 Urban / Night</li>
      </ul>
    </div>`;
  wrap.innerHTML = moodHtml;
  const dd = $('#moodDropdown');
  if(!dd) return;
  const sel = dd.querySelector('.dropdown-selected'), opts = dd.querySelectorAll('li');
  sel.addEventListener('click', ()=> dd.classList.toggle('open'));
  opts.forEach(li => li.addEventListener('click', ()=> { sel.querySelector('span').innerText = li.innerText; opts.forEach(x=>x.classList.remove('active')); li.classList.add('active'); dd.classList.remove('open'); }));
  document.addEventListener('click', e=> { if(!dd.contains(e.target)) dd.classList.remove('open'); });

  // small city selector
  if(!selectorWrap) return;
  const smallCityHtml = `<div class="dropdown" id="citySmall"><div class="dropdown-selected"><span>Choose city</span><span class="arrow">▼</span></div><ul class="dropdown-options">${Object.values(cityData).map(c=>`<li data-city="${c.key}">${c.name}</li>`).join('')}</ul></div>`;
  selectorWrap.innerHTML = smallCityHtml;
  const cityDropdown = selectorWrap.querySelector('.dropdown'), citySel = cityDropdown.querySelector('.dropdown-selected');
  citySel.addEventListener('click', ()=> cityDropdown.classList.toggle('open'));
  cityDropdown.querySelectorAll('li').forEach(li => li.addEventListener('click', ()=> { citySel.querySelector('span').innerText = li.innerText; activateNav(li.dataset.city); chooseCity(li.dataset.city); cityDropdown.classList.remove('open'); }));
  document.addEventListener('click', e => { if(!cityDropdown.contains(e.target)) cityDropdown.classList.remove('open'); });
}

/* ---------- choose city ---------- */
function chooseCity(key){
  if(!cityData[key]) return;
  selectedCity = key;
  setHero(cityData[key].bg);
  loadPricingForCity(key);
}

/* ---------- init ---------- */
function init(){
  initParticles();
  renderCityNavAndCards();
  createPremiumDropdown();
  chooseCity(selectedCity);
  activateNav(selectedCity);
  setHero(cityData[selectedCity].bg);
  initNavbarClicks();
  if(promoInput) promoInput.addEventListener('input', calculateTotal);
  // small safety: ensure submitBtn clickable (if earlier CSS meddling)
  if(submitBtn){ submitBtn.style.pointerEvents = 'auto'; submitBtn.style.zIndex = 9999; }
}

// All city buttons
document.querySelectorAll(".city-option").forEach(btn => {
  btn.addEventListener("click", () => {

    const chosen = btn.dataset.city;
    selectedCity = chosen;

    chooseCity(chosen);
    activateNav(chosen);

    // hide modal
    document.getElementById("citySelectModal").classList.add("hidden");

    // open PAGE 2 automatically (cards)
    page1.classList.add("hidden");
    page2.classList.remove("hidden");

  });
});
document.getElementById("cityModalClose").addEventListener("click", () => {
  document.getElementById("citySelectModal").classList.add("hidden");
});


window.addEventListener('load', init);


/* ================= NAVBAR CLICK FLOW ================= */

function handleNavbarClick(type) {
  if (!selectedCity) {
    openCitySelector(type);   // 👈 first ask city
  } else {
    goToCategory(type);       // 👈 direct open category
  }
}

// Attach navbar handlers
function initNavbarClicks() {

  document.querySelectorAll('.nav-item').forEach(item => {

    item.addEventListener('click', () => {
      
      // Save what user clicked (flights, hotels, etc.)
      const typeRequested = item.dataset.type;
      window._pendingNavType = typeRequested;

      // show modal
      document.getElementById("citySelectModal").classList.remove("hidden");

    });

  });
}

/* ================= ASK CITY FIRST ================= */

function openCitySelector(type) {
  // already have your small dropdown
  const cityDrop = $("#citySmall");

  if (cityDrop) {
    cityDrop.classList.add("open");
  }

  // once user selects city → open that category
  selectorWrap.querySelectorAll("li").forEach(li => {
    li.addEventListener("click", () => {
      const city = li.dataset.city;
      selectedCity = city;

      chooseCity(city);
      activateNav(city);

      setTimeout(() => {
        goToCategory(type);
      }, 300);
    });
  });
}

/* ================= GO TO CATEGORY (MAIN LOGIC) ================= */

function goToCategory(type) {
  
  // PAGE navigation:
  if (type === "flights" || type === "hotels" || type === "food" || type === "activities" || type === "addons") {
    
    // Show pricing section directly
    page1.classList.add("hidden");
    page2.classList.add("hidden");
    page3.classList.remove("hidden");

    loadPricingForCity(selectedCity);

    // scroll to specific section automatically
    scrollToCategory(type);
  }
}

/* ================= SMOOTH SCROLL to relevant area ================= */

function scrollToCategory(type) {
  const labelMap = {
    flights: "Flights",
    hotels: "Hotels",
    food: "Food & Dining",
    activities: "Activities",
    addons: "Add-ons"
  };

  const text = labelMap[type];
  if (!text) return;

  const el = [...document.querySelectorAll(".card-title")].find(e =>
    e.innerText.includes(text)
  );

  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

























