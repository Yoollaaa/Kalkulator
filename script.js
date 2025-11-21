let currentInput = ''; 
let memory = 0;
let historyLog = []; 

const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand'); // Kita akan kosongkan ini biar rapi
const historyList = document.getElementById('history-list');

function updateDisplay() {
    if (currentInput === '') {
        displayCurrent.innerText = '0';
    } else {
        displayCurrent.innerText = currentInput;
    }
    
    displayPrevious.innerText = ''; 
}

function appendNumber(number) {
    if (number === '.' && currentInput.slice(-1) === '.') return;
    
    if (number === '.' && currentInput === '') {
        currentInput = '0.';
    } else {
        currentInput += number;  (Concatenate)
    }
    
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === '') {
        currentInput = '0';
    }

    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1);
    }
    
    currentInput += operator;
    
    updateDisplay();
}

function deleteLast() { 
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (currentInput === '') return;

    const originalExpression = currentInput;
    let result;

    try {
        result = eval(currentInput); 
        
        if (!isFinite(result)) {
            alert("Error: Tidak bisa membagi dengan nol!");
            currentInput = '';
            updateDisplay();
            return;
        }
        
        result = parseFloat(result.toFixed(8));

        addToHistory(originalExpression + " = " + result);
        
        currentInput = result.toString();
        updateDisplay();
        
    } catch (error) {
        alert("Format perhitungan belum selesai!");
    }
}

    const operators = ['+', '-', '*', '/'];
    let lastOperatorIndex = -1;

  
    for (let op of operators) {
        const index = currentInput.lastIndexOf(op);
        if (index > lastOperatorIndex) {
            lastOperatorIndex = index;
        }
    }


    if (lastOperatorIndex === -1) {
        currentInput = '';
    } else {
        currentInput = currentInput.slice(0, lastOperatorIndex + 1);
    }

    updateDisplay();


function clearDisplay() { 
    currentInput = '';
    displayPrevious.innerText = '';
    updateDisplay();
}

function memoryPlus() { 
    try {
        memory += eval(currentInput || '0'); 
        alert("Disimpan ke Memory: " + memory); 
    } catch(e) {}
}
function memoryMinus() { 
    try {
        memory -= eval(currentInput || '0'); 
        alert("Dikurang dari Memory: " + memory); 
    } catch(e) {}
}
function memoryRecall() { 
    if(currentInput !== '' && !['+', '-', '*', '/'].includes(currentInput.slice(-1))) {
        currentInput = memory.toString();
    } else {
        currentInput += memory.toString();
    }
    updateDisplay(); 
}
function memoryClear() { memory = 0; alert("Memory Dikosongkan"); }

function addToHistory(entry) {
    historyLog.unshift(entry);
    if (historyLog.length > 5) historyLog.pop();
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    if (historyLog.length === 0) {
         historyList.innerHTML = '<li class="empty-msg">Belum ada perhitungan</li>';
    } else {
        historyLog.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            historyList.appendChild(li);
        });
    }
}

function clearHistory() {
    historyLog = [];
    renderHistory();
}


document.addEventListener('keydown', function(event) {
    if (event.key >= 0 && event.key <= 9) appendNumber(event.key);
    if (event.key === '.') appendNumber('.');
    if (event.key === '=' || event.key === 'Enter') { event.preventDefault(); calculate(); }
    if (event.key === 'Backspace') deleteLast();
    if (event.key === 'Escape') clearDisplay();
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') appendOperator(event.key);
});

updateDisplay();