let totalBudgetLabel = document.getElementById("totalBudget");
let totalBudgetAmount = 0;

let esodoInputField = document.getElementById("esodo");
let exodoInputField = document.getElementById("exodo");

let esodoConfirmButton = document.getElementById("confirmEsodo");



let numericInputFields = [esodoInputField, exodoInputField];

function depositToBudget(amount){
    totalBudgetAmount += amount;
    totalBudgetLabel.innerText = totalBudgetAmount;
}

numericInputFields.forEach(numericField => {
    numericField.onkeydown = (event) => {
    // Only allow if the e.key value is a number or if it's 'Backspace'
    if(isNaN(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
    };
});



esodoConfirmButton.addEventListener("click", (event)=>{
    let transactionAmount = esodoInputField.valueAsNumber;
    depositToBudget(transactionAmount);
    console.log(transactionAmount);
})





totalBudgetLabel.innerText = totalBudgetAmount;

