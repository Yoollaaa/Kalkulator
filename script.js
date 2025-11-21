let currentInput = '0';
let calculationChain = ''; 
let memory = 0;
let historyLog = []; 

const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');
const historyList = document.getElementById('history-list');


function updateDisplay() {
    displayCurrent.innerText = currentInput;
    displayPrevious.innerText = calculationChain;
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    if (currentInput === '') return;
    calculationChain += currentInput + ' ' + operator + ' ';
    currentInput = '0';
    updateDisplay();
}

function clearDisplay() { 
    currentInput = '0';
    calculationChain = '';
    updateDisplay();
}

function deleteLast() { 
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '' || currentInput === '-') currentInput = '0';
    updateDisplay();
}

function calculate() {
    if (calculationChain === '' || currentInput === '') return;

    const fullExpression = calculationChain + currentInput;
    let result;

    try {
        result = eval(fullExpression); 
        
        if (!isFinite(result)) {
            alert("Error: Tidak bisa membagi dengan nol!");
            clearDisplay();
            return;
        }
        
        addToHistory(fullExpression + " = " + result);
        
        currentInput = result.toString();
        calculationChain = '';
        updateDisplay();
        
    } catch (error) {
        alert("Format perhitungan salah!");
        clearDisplay();
    }
}

function memoryPlus() {
    memory += parseFloat(currentInput);
    alert("Memory stored: " + memory);
}

function memoryMinus() {
    memory -= parseFloat(currentInput);
    alert("Memory deducted: " + memory);
}

function memoryRecall() {
    currentInput = memory.toString();
    updateDisplay();
}

function memoryClear() {
    memory = 0;
    alert("Memory Cleared");
}

function addToHistory(entry) {
    historyLog.unshift(entry);
    
    if (historyLog.length > 5) {
        historyLog.pop();
    }
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    historyLog.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    historyLog = [];
    renderHistory();
}

document.addEventListener('keydown', function(event) {
    if (event.key >= 0 && event.key <= 9) appendNumber(event.key);
    if (event.key === '.') appendNumber('.');
    if (event.key === '=' || event.key === 'Enter') {
        event.preventDefault(); 
        calculate();
    }
    if (event.key === 'Backspace') deleteLast();
    if (event.key === 'Escape') clearDisplay();
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperator(event.key);
    }
});