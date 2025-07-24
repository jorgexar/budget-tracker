let totalBudgetLabel = document.getElementById("totalBudget");
let totalBudgetAmount = 0;


let neoEsodoBtn = document.getElementById("neoEsodo");
let neoExodoBtn = document.getElementById("neoExodo");

const transactionAmountInput = document.getElementById("transactionAmount");
const transactionCommentInput = document.getElementById("transactionComment");
const transConfirmButton = document.getElementById("confirmTransaction");

const disabledInputFields = [transactionAmountInput, transactionCommentInput, transConfirmButton];

const historyTable = document.getElementById("historyTable")
const historyTableLogs = document.getElementById("historyTableLogs");
const styledInput = document.querySelectorAll(".transInput");
let currentTransactionType;

neoEsodoBtn.addEventListener('click',(e)=>{
    currentTransactionType = 'esodo';
    disabledInputFields.forEach(inputField => {
        inputField.disabled = false;
    });
    styledInput.forEach(input => {
    input.style.borderColor = '#4bc269ff'; // Change this to any color you like
  });

})
neoExodoBtn.addEventListener('click',(e)=>{
    currentTransactionType = 'exodo';
    disabledInputFields.forEach(inputField => {
        inputField.disabled = false;
    });
    styledInput.forEach(input => {
    input.style.borderColor = '#f34e4eff'; // Change this to any color you like
  });
    

})

transactionAmountInput.onkeydown = (event) => {
    // Only allow if the e.key value is a number or if it's 'Backspace'
    if(isNaN(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
    };


function depositToBudget(amount){
    totalBudgetAmount += amount;
    totalBudgetLabel.innerText = makeNumberReadable(totalBudgetAmount);
}
function withdrawFromBudget(amount){
    totalBudgetAmount -= amount;
    totalBudgetLabel.innerText = makeNumberReadable(totalBudgetAmount);
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

function createLogEntry(amount, description, date, mark){
    let row = historyTableLogs.insertRow(0);
    let amountCell = row.insertCell(0);
    let descriptionCell = row.insertCell(1);
    let dateCell = row.insertCell(2);
    let buttonCell = row.insertCell(3);

    amountCell.innerHTML = mark + " " + makeNumberReadable(amount);
    descriptionCell.innerHTML = description;
    dateCell.innerHTML = date; 
    buttonCell.innerHTML = "❌";
}    




transConfirmButton.addEventListener("click", (event)=>{
    let transAmount = transactionAmountInput.valueAsNumber;
    let transDescription = transactionCommentInput.value;
    let mark;
    let transDate = "22*7*2025"
    if (!transAmount){
        return;
    }
    if(currentTransactionType == "esodo"){
        depositToBudget(transAmount);
        mark = "+";
    }
    else{
        withdrawFromBudget(transAmount);
        mark = "-";
    }
    
    createLogEntry(transAmount, transDescription,  transDate, mark);
    setDefaultState();
    
})


function makeNumberReadable(amount){
        let amountArr = amount.toString().split("");
    const dotTimes = Math.floor(amountArr.length / 3);
    let startingLen = amountArr.length -1;
    
    for(let i=1; i<=dotTimes; i++){
        amountArr[startingLen - (3 * i)]+=".";
        console.log(startingLen);
    }
    amountArr = amountArr.join("");
    return(amountArr);
    
}
console.log(makeNumberReadable(1000000000));

totalBudgetLabel.innerText = totalBudgetAmount;



