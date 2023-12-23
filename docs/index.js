let view = null;

function collectInputParameters()
{
    const result =
    {
        numTraces: document.getElementById("numTraces").value,
    };
    return result;
}

function updateUI()
{
    const inputParameters = collectInputParameters();
    view.options.numTraces = inputParameters.numTraces;
    view.draw();
}

function onload()
{
    const canvas = document.getElementById('canvas');

    const options =
        {
            maxHeight: canvas.height,
            maxWidth: canvas.width,
            chargeRadius: 10,
            numTraces: 40,
        };

    document.getElementById("numTraces").value = options.numTraces;

    const ctx = canvas.getContext('2d');

    view = new View(ctx, options);

    view.charges.push(new Charge(options.maxWidth / 2 - 100, options.maxHeight / 2, 10));
    view.charges.push(new Charge(options.maxWidth / 2 + 100, options.maxHeight / 2, 10));

    updateUI();
}

window.addEventListener("load", onload);
