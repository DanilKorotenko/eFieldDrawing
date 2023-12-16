function updateUI()
{
    // TODO: read parameters from inputs

    // TODO: process parameters in model

    const canvas = document.getElementById('canvas');

    const maxHeight = canvas.height;
    const maxWidth = canvas.width;

    const ctx = canvas.getContext('2d');

    const view = new View(ctx, maxWidth, maxHeight);

    view.charges.push(new Charge(maxWidth / 2 - 100, maxHeight / 2, 10, "charge +10"));
    view.charges.push(new Charge(maxWidth / 2 + 100, maxHeight / 2, -10, "charge -10"));

    view.draw();
}

window.addEventListener("load", updateUI);
