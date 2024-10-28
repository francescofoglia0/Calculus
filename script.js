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

    // Specifiche per il numero 2
    const integerDigits2 = parseInt(document.getElementById('integerDigits2').value);
    const decimalDigits2 = parseInt(document.getElementById('decimalDigits2').value);

    const num1 = generaNumero(integerDigits1, decimalDigits1);
    const num2 = generaNumero(integerDigits2, decimalDigits2);

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
            risultatoCorretto = num1 / num2;
            break;
    }

    // Mostra l'esercizio all'utente
    document.getElementById('exerciseText').innerText = esercizioTesto;
    // Salva il risultato corretto per la verifica
    document.getElementById('exerciseText').dataset.correctAnswer = risultatoCorretto.toFixed(Math.max(decimalDigits1, decimalDigits2));
}

function generaNumero(integerDigits, decimalDigits) {
    const integerPart = Math.floor(Math.random() * Math.pow(10, integerDigits));
    const decimalPart = decimalDigits > 0 ? (Math.random()).toFixed(decimalDigits).substring(2) : '';
    return parseFloat(`${integerPart}.${decimalPart}`);
}

function verificaRisposta() {
    const rispostaUtente = parseFloat(document.getElementById('userAnswer').value);
    const rispostaCorretta = parseFloat(document.getElementById('exerciseText').dataset.correctAnswer);

    if (Math.abs(rispostaUtente - rispostaCorretta) < 0.001) {
        document.getElementById('result').innerText = 'Risposta corretta!';
        document.getElementById('result').style.color = 'green';
    } else {
        document.getElementById('result').innerText = `Risposta errata! La risposta corretta era ${rispostaCorretta}`;
        document.getElementById('result').style.color = 'red';
    }
}
