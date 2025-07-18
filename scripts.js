let totalBudgetLabel = document.getElementById("totalBudget");
let totalBudgetAmount = 0;


let neoEsodoBtn = document.getElementById("neoEsodo");
let neoExodoBtn = document.getElementById("neoExodo");

const transactionAmountInput = document.getElementById("transactionAmount");
const transactionCommentInput = document.getElementById("transactionComment");
const transConfirmButton = document.getElementById("confirmTransaction");

const disabledInputFields = [transactionAmountInput, transactionCommentInput, transConfirmButton];


let currentTransactionType;

const historyTable = document.getElementById("historyTable");

neoEsodoBtn.addEventListener('click',(e)=>{
    currentTransactionType = 'esodo';
    disabledInputFields.forEach(inputField => {
        inputField.disabled = false;
    });
    neoExodoBtn.disabled = true;

})
neoExodoBtn.addEventListener('click',(e)=>{
    currentTransactionType = 'exodo';
    disabledInputFields.forEach(inputField => {
        inputField.disabled = false;
    });
    neoEsodoBtn.disabled = true;

})

transactionAmountInput.onkeydown = (event) => {
    // Only allow if the e.key value is a number or if it's 'Backspace'
    if(isNaN(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
    };


function depositToBudget(amount){
    totalBudgetAmount += amount;
    totalBudgetLabel.innerText = totalBudgetAmount;
}
function withdrawFromBudget(amount){
    totalBudgetAmount -= amount;
    totalBudgetLabel.innerText = totalBudgetAmount;
}
function setDefaultState(){
    transactionAmountInput.value = "";
    transactionCommentInput.value = "";
    disabledInputFields.forEach(inputField => {
        inputField.disabled = true;
    });
    neoEsodoBtn.disabled = false;
    neoExodoBtn.disabled = false;
    

}

    




transConfirmButton.addEventListener("click", (event)=>{
    let transactionAmount = transactionAmountInput.valueAsNumber;
    if (!transactionAmount){
        return;
    }
    if(currentTransactionType == "esodo"){
        depositToBudget(transactionAmount);
    }
    else{
        withdrawFromBudget(transactionAmount);
    }
    console.log(transactionCommentInput);
    setDefaultState();
    
})





totalBudgetLabel.innerText = totalBudgetAmount;

