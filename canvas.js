const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
drawing();

function drawing() {
  window.addEventListener("load", () => {
    resize();

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
}

function download() {
  var download = document.getElementById("download");
  var image = document
    .getElementById("canvas")
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
  clear();
}

function backgroundChange(id) {
  switch (id) {
    case "red":
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      break;
    case "green":
      ctx.fillStyle = "#008000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      break;
    case "black":
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      break;
    case "blue":
      ctx.fillStyle = "#0000FF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      break;
  }
}

function penChange(id) {
  switch (id) {
    case "red":
      ctx.strokeStyle = "#FF0000";
      break;
    case "green":
      ctx.strokeStyle = "#008000";
      break;
    case "black":
      ctx.strokeStyle = "#000000";
      break;
    case "blue":
      ctx.strokeStyle = "#0000FF";
      break;
  }
}

function clear() {
  ctx.fillStyle = "#FFFFFF";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
}
