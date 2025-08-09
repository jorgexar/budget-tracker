let totalBudgetLabel = document.getElementById("totalBudget");
let totalBudgetAmount = 0;


let neoEsodoBtn = document.getElementById("neoEsodo");
let neoExodoBtn = document.getElementById("neoExodo");

const transactionAmountInput = document.getElementById("transactionAmount");
const transactionCommentInput = document.getElementById("transactionComment");
const transConfirmButton = document.getElementById("confirmTransaction");

const disabledInputFields = [transactionAmountInput, transactionCommentInput, transConfirmButton];

const styledInput = document.querySelectorAll(".transInput");
let currentTransactionType;

function getTodayDate() {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}
function depositToBudget(amount){
    totalBudgetAmount += amount;
    totalBudgetLabel.innerText = makeNumberReadable(totalBudgetAmount);
   
    if(totalBudgetAmount > 0){
        totalBudgetLabel.classList.remove('expense');
    }
}
function withdrawFromBudget(amount){
    totalBudgetAmount -= amount;
    totalBudgetLabel.innerText = makeNumberReadable(totalBudgetAmount);
    if(totalBudgetAmount <= 0){
        totalBudgetLabel.classList.add('expense');
    }
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
        amount.innerText = "-"+ formattedNumber;
        card.classList.add("expense");
    }else{
        amount.innerText = "+"+ formattedNumber;
    }
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
            if (confirm("Are you sure you want to delete this log?") == true) {
            delButton.closest('.card').remove();
            }                
            })
    pg.appendChild(card);


    console.log(card);
}
// createCard();
function makeNumberReadable(amount){
    amount = amount.toLocaleString('el-GR', {style: "currency", currency: "EUR"})
    return(amount);
    
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
    let transDate = getTodayDate();
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


