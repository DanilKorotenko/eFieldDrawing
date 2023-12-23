let view = null;

function collectInputParameters()
{
    const result =
    {
        numTraces:      +document.getElementById("numTraces").value,
        chargeRadius:   +document.getElementById("chargeRadius").value,
        q:              +document.getElementById("q").value,
    };
    return result;
}

function updateUI()
{
    const inputParameters = collectInputParameters();

    document.getElementById("qValue").value = inputParameters.q;

    const selectedCharge = view.getSelectedCharge();
    if (selectedCharge)
    {
        selectedCharge.q = inputParameters.q;
    }
    view.options.numTraces = inputParameters.numTraces;
    view.options.chargeRadius = inputParameters.chargeRadius;

    view.draw();
}

// ////////////////////////////////////////////////////////////////////////////

function mouseDownEvent(event)
{
    const point = new Point(event.offsetX, event.offsetY);
    view.mouseDown(point);
}

function mouseMoveEvent(event)
{
    const point = new Point(event.offsetX, event.offsetY);
    view.mouseMove(point);
}

function mouseUpEvent(event)
{
    const point = new Point(event.offsetX, event.offsetY);
    view.mouseUp(point);
}

// ////////////////////////////////////////////////////////////////////////////

function onChargeSelected(charge)
{
    if (charge)
    {
        document.getElementById("q").disabled = false;
        document.getElementById("q").value = charge.q;
        document.getElementById("qValue").value = charge.q;
    }
    else
    {
        document.getElementById("q").disabled = true;
    }
}

function onload()
{
    const canvas = document.getElementById('canvas');

    canvas.addEventListener('mousedown', mouseDownEvent);
    canvas.addEventListener('mousemove', mouseMoveEvent);
    canvas.addEventListener('mouseup', mouseUpEvent);

    const options =
        {
            maxHeight: canvas.height,
            maxWidth: canvas.width,
            chargeRadius: 10,
            numTraces: 40,
        };

    document.getElementById("numTraces").value = options.numTraces;
    document.getElementById("chargeRadius").value = options.chargeRadius;

    const ctx = canvas.getContext('2d');

    onChargeSelected(null);

    view = new View(ctx, options);

    view.onChargeSelected = onChargeSelected;

    view.charges.push(new Charge(options.maxWidth / 2 - 100, options.maxHeight / 2, 100));
    view.charges.push(new Charge(options.maxWidth / 2 + 100, options.maxHeight / 2, 100));

    updateUI();
}

window.addEventListener("load", onload);
