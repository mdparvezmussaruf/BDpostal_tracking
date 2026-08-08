const shipments = {
  "BD40260808007": {
    status:"In Transit",
    step:3,
    from:"Dhaka GPO - 1000",
    to:"Ban Phai, Khon Kaen - 40110",
    receiverName:"Anurak Kulcharasprasort",
    receiverAddress:"14 Ban Pa Po, Tambon Pa Po, Amphoe Ban Phai, Khon Kaen Province 40110, Thailand",
    parcelDetails:"Registered Parcel — Personal Documents",
    service:"Registered Parcel",
    weight:"0.20 kg",
    booking:"08 Aug 2026",
    expected:"15 Aug 2026",
    dates:["07 Aug 2026","08 Aug 2026","08 Aug 2026","",""],
    history:[
      ["08 Aug 2026 • 11:42 AM","In Transit","Parcel departed from Dhaka Mail Processing Centre."],
      ["08 Aug 2026 • 08:15 AM","Dispatched","Shipment dispatched toward Ban Phai, Khon Kaen, Thailand."],
      ["08 Aug 2026 • 07:35 AM","Booked","Shipment accepted at Dhaka GPO."]
    ]
  },

  "BD20260808001": {
    status:"In Transit",
    step:3,
    from:"Dhaka GPO - 1000",
    to:"Ban Phai, Khon Kaen - 40110",
    receiverName:"Anurak Kulcharasprasort",
    receiverAddress:"14 Ban Pa Po, Tambon Pa Po, Amphoe Ban Phai, Khon Kaen Province 40110, Thailand",
    parcelDetails:"Registered Parcel — Personal Documents",
    service:"Registered Parcel",
    weight:"0.20 kg",
    booking:"08 Aug 2026",
    expected:"15 Aug 2026",
    dates:["07 Aug 2026","08 Aug 2026","08 Aug 2026","",""],
    history:[
      ["08 Aug 2026 • 11:42 AM","In Transit","Parcel departed from Dhaka Mail Processing Centre."],
      ["08 Aug 2026 • 08:15 AM","Dispatched","Shipment dispatched toward Ban Phai, Khon Kaen, Thailand."],
      ["08 Aug 2026 • 07:35 AM","Booked","Shipment accepted at Dhaka GPO."]
    ]
  },

  "BD20260808002": {
    status:"At Delivery Office",
    step:4,
    from:"Chattogram GPO",
    to:"Sylhet Sadar, Sylhet",
    receiverName:"Md. Rahim Uddin",
    receiverAddress:"House 25, Road 04, Sylhet Sadar, Sylhet-3100, Bangladesh",
    parcelDetails:"Express Parcel — Personal Items",
    service:"Express Parcel",
    weight:"0.75 kg",
    booking:"07 Aug 2026",
    expected:"09 Aug 2026",
    dates:["07 Aug 2026","07 Aug 2026","08 Aug 2026","08 Aug 2026",""],
    history:[
      ["08 Aug 2026 • 02:10 PM","At Delivery Office","Parcel arrived at Sylhet Sadar Delivery Office."],
      ["08 Aug 2026 • 06:30 AM","In Transit","Parcel arrived at Sylhet Mail Processing Centre."],
      ["07 Aug 2026 • 04:50 PM","Dispatched","Shipment dispatched from Chattogram."],
      ["07 Aug 2026 • 01:20 PM","Booked","Shipment accepted at Chattogram GPO."]
    ]
  }
};

const $ = id => document.getElementById(id);

function showDetails(code){
  const s = shipments[code];

  $("trackingScreen").classList.add("hidden");
  $("detailsScreen").classList.remove("hidden");

  $("trackingNo").textContent = code;
  $("statusTitle").textContent = s.status;

  $("from").textContent = s.from;
  $("to").textContent = s.to;

  $("receiverName").textContent = s.receiverName;
  $("receiverAddress").textContent = s.receiverAddress;
  $("parcelDetails").textContent = s.parcelDetails;

  $("service").textContent = s.service;
  $("weight").textContent = s.weight;
  $("booking").textContent = s.booking;
  $("expected").textContent = s.expected;

  $("progressFill").style.width = ((s.step - 1) / 4 * 100) + "%";

  document.querySelectorAll(".step").forEach((el,i)=>{
    const n = i + 1;
    const dot = el.querySelector(".dot");

    el.classList.toggle("active", n <= s.step);
    dot.textContent = n < s.step ? "✓" : n;
  });

  ["date1","date2","date3","date4","date5"].forEach((id,i)=>{
    $(id).textContent = s.dates[i] || "";
  });

  $("history").innerHTML = s.history.map(item => `
    <div class="history-item">
      <div class="history-date">${item[0]}</div>
      <div class="history-marker"></div>
      <div>
        <strong>${item[1]}</strong>
        <p>${item[2]}</p>
      </div>
    </div>
  `).join("");

  window.scrollTo({top:0,behavior:"smooth"});
}

$("trackBtn").onclick = () => {
  const code = $("trackingInput").value.trim().toUpperCase();

  if(!shipments[code]){
    $("error").textContent = "Tracking number not found. Try BD40260808007.";
    return;
  }

  $("error").textContent = "";
  showDetails(code);
};

$("trackingInput").onkeydown = e => {
  if(e.key === "Enter") $("trackBtn").click();
};

$("backBtn").onclick = () => {
  $("detailsScreen").classList.add("hidden");
  $("trackingScreen").classList.remove("hidden");
  $("trackingInput").value = "";
  $("error").textContent = "";

  window.scrollTo({top:0,behavior:"smooth"});
  $("trackingInput").focus();
};

document.querySelector(".logo-link").addEventListener("click", e => {
  e.preventDefault();

  $("detailsScreen").classList.add("hidden");
  $("trackingScreen").classList.remove("hidden");

  window.scrollTo({top:0,behavior:"smooth"});
});
