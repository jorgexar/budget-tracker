let totalBudgetLabel = document.getElementById("totalBudget");
let totalBudgetAmount = 0;

const date = new Date();
const day = date.getDate();
const month = date.getMonth() +1;
const year = date.getFullYear();
const today = `${day}/${month}/${year}`;

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
let logsList = [];
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


// function createLogEntry(amount, description, date, mark, expense){
    
//     let transLog = {
//         t_mark: mark,
//         t_amount: makeNumberReadable(amount),
//         t_desc: description,
//         t_date : date,
//         t_expense : expense,
//         printLog : function(){
//              let row = historyTableLogs.insertRow(0);
//             let amountCell = row.insertCell(0);
//             let descriptionCell = row.insertCell(1);
//             let dateCell = row.insertCell(2);
//             let buttonCell = row.insertCell(3);
            
//             if(transLog.t_expense){
//                 row.classList.add("expense");
//             }
            
//             amountCell.innerHTML = transLog.t_mark + " " + transLog.t_amount;
//             descriptionCell.innerHTML = transLog.t_desc;
//             dateCell.innerHTML = transLog.t_date; 
//             buttonCell.innerHTML = "❌";
            
//             buttonCell.addEventListener("click",(e)=>{
//                 buttonCell.parentNode.parentNode.removeChild(buttonCell.parentNode);
//             })
//         }
//     }
//     logsList.push(transLog);
//     console.log(logsList); 
//     transLog.printLog();
    
    
// }    
function createCard(t_amount, t_desc, t_date, isExpense){
    const pg = document.getElementById('pg');
    const card = document.createElement('div')
    const cardTop = document.createElement('div');
    const cardMid = document.createElement('div');
    const cardBot = document.createElement('div');

    const amount = document.createElement('span');
    const delButton = document.createElement('span');

    const desc = document.createElement('span');
    const date = document.createElement('span');

    let formattedNumber = makeNumberReadable(t_amount);
    
    card.className = 'card';
    cardTop.className = 'cardTop';
    cardMid.className = 'cardMid';
    cardBot.className = 'cardBot';

    amount.id = 'amount';
    delButton.id = 'delButton';
    desc.id = 'desc';
    date.id = 'date';
    if(isExpense){
        formattedNumber = "-"+formattedNumber;
        card.classList.add("expense");
    }else{
        formattedNumber = "+"+formattedNumber;
    }
    amount.innerText= formattedNumber;
    delButton.innerText = "❌"
    desc.innerText = t_desc;
    date.innerText = t_date;

    card.appendChild(cardTop);
    card.appendChild(cardMid);
    card.appendChild(cardBot);

    cardTop.appendChild(amount);
    cardTop.appendChild(delButton);
    cardMid.appendChild(desc);
    cardMid.appendChild(date);
    delButton.addEventListener("click",(e)=>{
                delButton.parentNode.parentNode.parentNode.removeChild(delButton.parentNode.parentNode);
            })
    pg.appendChild(card);


    console.log(card);
}
// createCard();
function makeNumberReadable(amount){
        let amountArr = amount.toString().split("");
    const dotTimes = Math.floor(amountArr.length / 3);
    let startingLen = amountArr.length -1;
    
    for(let i=1; i<=dotTimes; i++){
        amountArr[startingLen - (3 * i)]+=".";
        
    }
    amountArr = amountArr.join("");
    return(amountArr);
    
}

neoEsodoBtn.addEventListener('click',(e)=>{
    currentTransactionType = 'esodo';
    disabledInputFields.forEach(inputField => {
        inputField.disabled = false;
    });
    styledInput.forEach(input => {
    input.style.borderColor = '#4bc269ff'; // Change this to any color you like
    input.style.color = '#4bc269ff';
  });

})
neoExodoBtn.addEventListener('click',(e)=>{
    currentTransactionType = 'exodo';
    disabledInputFields.forEach(inputField => {
        inputField.disabled = false;
    });
    styledInput.forEach(input => {
    input.style.borderColor = '#f34e4eff'; // Change this to any color you like
    input.style.color = '#f34e4eff';
});


})

transactionAmountInput.onkeydown = (event) => {
    // Only allow if the e.key value is a number or if it's 'Backspace'
    if(isNaN(event.key) && event.key !== 'Backspace') {
        event.preventDefault();
    }
};





transConfirmButton.addEventListener("click", (event)=>{
    let transAmount = transactionAmountInput.valueAsNumber;
    let transDescription = transactionCommentInput.value;
    let mark;
    let transDate = today;
    let expense = false;
    if (!transAmount){
        return;
    }
    if(currentTransactionType == "esodo"){
        depositToBudget(transAmount);
        mark = "+";
        
    }
    else{
        withdrawFromBudget(transAmount);
        expense = true;
        mark = "-";
       
    }
    
    // createLogEntry(transAmount, transDescription,  transDate, mark,expense);
    createCard(transAmount, transDescription, transDate, expense);
    setDefaultState();
    
})



totalBudgetLabel.innerText = totalBudgetAmount;


