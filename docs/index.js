
function updateUI()
{
        //TODO: read parameters from inputs

    //TODO: process parameters in model
  
    let canvas = document.getElementById('canvas');

    let height = canvas.height;
    let width = canvas.width;

    let ctx = canvas.getContext('2d');

    let view = new View(ctx);

    view.addCharge(width/2, height/2, 1);

    view.draw();
}

window.addEventListener("load", updateUI);