
function updateUI()
{
        //TODO: read parameters from inputs

    //TODO: process parameters in model
  
    let canvas = document.getElementById('canvas');

    let maxHeight = canvas.height;
    let maxWidth = canvas.width;

    let ctx = canvas.getContext('2d');

    let view = new View(ctx, maxWidth, maxHeight);

    view.addCharge(maxWidth/2-100, maxHeight/2, 1);
    view.addCharge(maxWidth/2+100, maxHeight/2, 1);

    view.draw();
}

window.addEventListener("load", updateUI);