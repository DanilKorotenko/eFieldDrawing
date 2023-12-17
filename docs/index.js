function updateUI()
{
    // TODO: read parameters from inputs

    // TODO: process parameters in model

    const canvas = document.getElementById('canvas');

    const maxHeight = canvas.height;
    const maxWidth = canvas.width;

    const ctx = canvas.getContext('2d');

    const view = new View(ctx, maxWidth, maxHeight);

    view.addCharge(maxWidth / 2 - 100, maxHeight / 2, 10);
    view.addCharge(maxWidth / 2 + 100, maxHeight / 2, -10);
    //view.addCharge(maxWidth / 2 + 100, maxHeight / 2, 10);

    view.draw();
}

window.addEventListener("load", updateUI);
