$(document).ready(function () {

  var data = [];
  var activeIdx = -1;
  var memes = ["DistractedBoyfriend", "Drake", "IsThisAPigeon", "SurprisedPikachu", "ExpandingBrain", "TwoButtons", "BatmanRobin", "TrumpBill"];
  var memePath = "../../templates/";
  var dragger = 0;
  getMemes();

  function getMemes() {
    renderMemesTemplates();
    renderMemeList();
  }

  // makes a list  of questions which all have the question text and a data-qid attribute
  // that allows you to access their _id by doing $whateverjQueryObjectYouHave.data('qid')
  function renderMemeList() {
    $('#memes').html(
        memes.map((i) => '<li id="' + i + '">' + i + '</li>').join('')
    )
  }

  function renderMemesTemplates() {
    if (activeIdx > -1) {
      $('#show-meme').css('display', 'block');
      $('meme').text(memes[activeIdx]);
    } else {
      console.log(activeIdx);
      $('#show-meme').css('display', 'none');
    }
  }

  $('#memes').on('click', 'li', function () {
    var _id = $(this)[0].innerText;
    var i = 0;
    for (i = 0; i < memes.length; i++) {
      if (memes[i] === _id) {
        activeIdx = i;
      }
    }

    renderMemesTemplates();
    renderImage();
  })

  function renderImage() {
    var img = document.createElement("img");
    img.src = memePath + memes[activeIdx] + ".jpg";
    img.width = "700"
    var src = document.getElementById("meme-info");
    while (src.firstChild) {
      src.removeChild(src.firstChild);
    }
    src.appendChild(img);
    

  }

  $('#memeText').on('click', function () {
    dragger++;
    var src = document.getElementById("meme-info");
    var div = document.createElement("div");
    div.id = "mydiv" + dragger;
    div.style.position = "absolute";
    div.style.zIndex = "9";
    div.style.textAlign = "center";
    var divChild = document.createElement("div");
    divChild.id = "mydivheader" + dragger;
    divChild.style.padding = "10";
    divChild.style.cursor = "move";
    divChild.style.color = "#fff";
    divChild.style.textShadow = "1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000";
    divChild.style.fontSize = "30";
    var txt = document.getElementById("memeArea");
    divChild.innerText = txt.value;
    div.appendChild(divChild);
    src.appendChild(div);
    dragElement(div);
  })

  function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header" + dragger)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header" + dragger).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



})
