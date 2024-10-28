let operazioneSelezionata = null;

function selezionaOperazione(operazione) {
    operazioneSelezionata = operazione;
    
    // Rimuovi la classe "active" da tutti i bottoni
    const buttons = document.querySelectorAll('.operations button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Aggiungi la classe "active" al bottone selezionato
    document.getElementById(`btn-${operazione}`).classList.add('active');
}

function generaEsercizio() {
    if (!operazioneSelezionata) {
        alert("Seleziona prima un'operazione!");
        return;
    }

    // Specifiche per il numero 1
    const integerDigits1 = parseInt(document.getElementById('integerDigits1').value);
    const decimalDigits1 = parseInt(document.getElementById('decimalDigits1').value);
    const customNumber1 = document.getElementById('number1').value;

    // Specifiche per il numero 2
    const integerDigits2 = parseInt(document.getElementById('integerDigits2').value);
    const decimalDigits2 = parseInt(document.getElementById('decimalDigits2').value);
    const customNumber2 = document.getElementById('number2').value;

    let num1, num2;

    // Se l'utente ha fornito un numero, usalo; altrimenti genera un numero
    if (customNumber1) {
        num1 = parseFloat(customNumber1);
    } else {
        num1 = generaNumero(integerDigits1, decimalDigits1);
    }

    if (customNumber2) {
        num2 = parseFloat(customNumber2);
    } else {
        num2 = generaNumero(integerDigits2, decimalDigits2);
    }

    // Se l'operazione è divisione, rigenera num2 finché non è diverso da zero
    if (operazioneSelezionata === 'divisione' && num2 === 0) {
        num2 = generaNumero(integerDigits2, decimalDigits2);
    }

    let esercizioTesto = '';
    let risultatoCorretto = 0;

    switch (operazioneSelezionata) {
        case 'addizione':
            esercizioTesto = `${num1} + ${num2}`;
            risultatoCorretto = num1 + num2;
            break;
        case 'sottrazione':
            esercizioTesto = `${num1} - ${num2}`;
            risultatoCorretto = num1 - num2;
            break;
        case 'moltiplicazione':
            esercizioTesto = `${num1} × ${num2}`;
            risultatoCorretto = num1 * num2;
            break;
        case 'divisione':
            esercizioTesto = `${num1} ÷ ${num2}`;
            risultatoCorretto = (num1 / num2).toFixed(2); // Formatta sempre con due cifre decimali
            break;
    }

    // Mostra l'esercizio all'utente
    document.getElementById('exerciseText').innerText = esercizioTesto;
    // Salva il risultato corretto per la verifica, assicurandosi di mantenerlo come numero con due cifre decimali
    document.getElementById('exerciseText').dataset.correctAnswer = parseFloat(risultatoCorretto).toFixed(2);
}



function generaNumero(integerDigits, decimalDigits) {
    const integerPart = Math.floor(Math.random() * Math.pow(10, integerDigits));
    const decimalPart = decimalDigits > 0 ? (Math.random() * Math.pow(10, decimalDigits)).toFixed(0) : '';
    return parseFloat(`${integerPart}.${decimalPart}`);
}


function verificaRisposta() {
    const rispostaUtente = parseFloat(document.getElementById('userAnswer').value);
    const rispostaCorretta = parseFloat(document.getElementById('exerciseText').dataset.correctAnswer);

    // Formatta la risposta corretta sempre con due cifre decimali
    const rispostaCorrettaFormattata = rispostaCorretta.toFixed(2);

    // Verifica se la risposta è corretta con tolleranza per i decimali
    if (Math.abs(rispostaUtente - parseFloat(rispostaCorrettaFormattata)) < 0.001) {
        document.getElementById('result').innerText = 'Risposta corretta!';
        document.getElementById('result').style.color = 'green';
    } else {
        document.getElementById('result').innerText = `Risposta errata! La risposta corretta era ${rispostaCorrettaFormattata}`;
        document.getElementById('result').style.color = 'red';
    }
}



