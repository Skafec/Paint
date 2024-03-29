const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
drawing();

function drawing() {
  window.addEventListener("load", () => {
    resize();
    canvasFill();

    //variables
    let painting = false;

    function startPosition(e) {
      painting = true;
      draw(e);
    }
    function finishedPosition() {
      painting = false;
      ctx.beginPath();
    }
    function draw(e) {
      if (!painting) return;
      ctx.lineWidth = 10;
      ctx.lineCap = "round";

      ctx.lineTo(translatedX(e.clientX), translatedY(e.clientY));
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(translatedX(e.clientX), translatedY(e.clientY));
    }

    //EventListeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
  });

  window.addEventListener("resize", resize);

  function resize() {
    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvasFill();
  }

  function translatedX(x) {
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (x - rect.left);
  }

  function translatedY(y) {
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (y - rect.top);
  }

  function canvasFill() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function download() {
  var download = document.getElementById("download");
  var image = document
    .getElementById("canvas")
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
  bgDropdownCheck();
  penDropdownCheck();
}

function backgroundChange(id) {
  switch (id) {
    case "red":
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      /* Background color of buttons, fires on click(problem)
      let element = document.getElementById(id);
      element.style.backgroundColor = "#FF0000"; */
      dropdown_bg();
      break;
    case "green":
      ctx.fillStyle = "#008000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      dropdown_bg();
      break;
    case "black":
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      dropdown_bg();
      break;
    case "blue":
      ctx.fillStyle = "#0000FF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      dropdown_bg();
      break;
    case "white":
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#000000";
      break;
  }
}

function penChange(id) {
  switch (id) {
    case "red":
      ctx.strokeStyle = "#FF0000";
      dropdown_pen();
      break;
    case "green":
      ctx.strokeStyle = "#008000";
      dropdown_pen();
      break;
    case "black":
      ctx.strokeStyle = "#000000";
      dropdown_pen();
      break;
    case "blue":
      ctx.strokeStyle = "#0000FF";
      dropdown_pen();
      break;
  }
}

function customBg() {
  let bgCustom = document.getElementById("background-custom");
  ctx.fillStyle = bgCustom.value;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  dropdown_bg();
}

function customPen() {
  let penCustom = document.getElementById("pen-custom");
  ctx.strokeStyle = penCustom.value;
  dropdown_pen();
}

let bgDropdown = document.getElementById("dropdown-background");
let penDropdown = document.getElementById("dropdown-pen");

function dropdown_bg() {
  bgDropdown.classList.toggle("show");
  penDropdownCheck();
}

function dropdown_pen() {
  penDropdown.classList.toggle("show");
  bgDropdownCheck();
}

function penDropdownCheck() {
  if (penDropdown.classList.contains("show")) {
    penDropdown.classList.toggle("show");
  }
}

function bgDropdownCheck() {
  if (bgDropdown.classList.contains("show")) {
    bgDropdown.classList.toggle("show");
  }
}

function clear_alert() {
  if (confirm("Are you sure you want to delete your work?")) {
    backgroundChange("white");
  } else {
    alert("Phew! That was close!");
  }
  bgDropdownCheck();
  penDropdownCheck();
}
