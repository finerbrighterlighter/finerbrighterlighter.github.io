function showHiddenDivOnHover(hoverTargetSelector, hiddenDivId, htmlBlock) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.id = hiddenDivId;
    hiddenDiv.innerHTML = htmlBlock;
  
    document.querySelectorAll(hoverTargetSelector).forEach(function(hoverTarget) {
      hoverTarget.addEventListener('mouseover', function() {
        hoverTarget.insertAdjacentElement("beforebegin", hiddenDiv);
        hiddenDiv.style.display = 'block';
      });
  
      hoverTarget.addEventListener('mouseout', function() {
        hiddenDiv.style.display = 'none';
      });
    });
  }

var htmlblock = '<span id="hideblock" style="font-size:80%;font-family: monospace, monospace;color:black;border:1px dotted grey;padding:0;background:#e7c336;"><i class="fa-li fa fas fa-newspaper" style="position:initial"></i>Academic Publication <i class="fa-li fa fas fa-chalkboard" style="position:initial"></i>Conference Proceeding/Poster <i class="fa-li fa fas fa-microphone-alt" style="position:initial"></i>Conference Speaking <i class="fa-li fa fas fa-book" style="position:initial"></i>Dissertation/Descriptive Report </span>';

showHiddenDivOnHover('.work_div', 'legend-div', htmlblock);