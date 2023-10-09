

function addDateTime(message) {
    const dateTimeNom = new Date();
    const finalMessage = `${dateTimeNom.toLocaleDateString()}: ${message}`;
    console.log(finalMessage);
    return finalMessage;
}


alert(addDateTime("This is the best moment to have a look at this website !"));