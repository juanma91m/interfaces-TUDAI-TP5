function escribirTextoAleatorio() {
    let formInput = document.getElementById('captchaOrigen');
    formInput.innerHTML = textoAleatorio(7);
}

function textoAleatorio(cantValores) {
    let alpha = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    let captcha = "";

    for (let i = 0; i < cantValores; i++)
        captcha += alpha[Math.floor(Math.random() * alpha.length)];

    return captcha;
}

function validarCaptcha() {
    let captcha = document.getElementById('captchaOrigen').innerHTML;
    let respuesta = document.getElementById('captchaRespuesta').value;
    let labelResultado = document.getElementById('resultado');

    if (respuesta === "") {
        labelResultado.style.color = 'black';
        labelResultado.innerHTML = "debe ingresar un captcha";
    } else if (captcha === respuesta) {
        labelResultado.style.color = 'green';
        labelResultado.innerHTML = "correcto";
    } else {
        labelResultado.style.color = 'red';
        labelResultado.innerHTML = "incorrecto";
    }
}