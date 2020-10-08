let operations = {
    "+" : function (operand1, operand2) {
        return Number(operand1) + Number(operand2);
    },
    "-" : function (operand1, operand2) {
        return Number(operand1) - Number(operand2);
    },
    "*" : function (operand1, operand2) {
        return Number(operand1) * Number(operand2)
    },
    "/" : function (operand1, operand2) {
        return Number(operand1) / Number(operand2);
        // return Math.round((Number(operand1) / Number(operand2))*100000)/100000;
    },
    "²" : function (operand1, operand2) {
        return Number(operand2)*Number(operand2);
    },
    "(*-1)" : function (operand1, operand2){
        return Number(operand2)*-1;
    }
};
let typing=false;
let currentValue;
let storedValue;
let operand;
let history='';

function input(value){
    if(typing===false){
        storedValue = currentValue;
        currentValue = '';
        if(operand===''){
            history='';
        }
        typing = true;
    }
    if(value==='.' && currentValue.includes(".")){
        return;
    }
    currentValue += value;
    output(currentValue);
    memory.innerHTML = history += value;
}

function calculate(operatorInput){
    if(currentValue==='0' && operand==='/'){
        currentValue = '';
        output('lmao');
    }
    else if(operand){
        currentValue = operations[operand](storedValue,currentValue);
        output(currentValue);
    }
    operand=operatorInput;
    typing=false;
    memory.innerHTML=(history += operand);
    if(operand === ''){
        history = currentValue;
    }
}

function output(value){
    if(value.toString().length > 8){
        value = value.toExponential(5);
    };
    display.innerHTML = value;
}

function clearAll(){
    currentValue = '';
    storedValue = '';
    output(0);
    history='';
    memory.innerHTML='';
}

// Event Listeners

let display = document.querySelector('.display');
let memory = document.querySelector('.memory');

let numbers = document.querySelectorAll('.number');
for(let number of numbers){
    number.addEventListener('click', function(event){
        input(this.value);
    })
}
window.addEventListener('keydown', function(event){
    if( isFinite(event.key) ){
        input(event.key);
    }
})

let operators = document.querySelectorAll('.operator');
for(let operand of operators){
    operand.addEventListener('click', function(event){
        calculate(this.value);
    })
}
window.addEventListener('keydown', function(event){
    if( ['+','-','*','/'].indexOf(event.key) >= 0 ){
        calculate(event.key);
    }
    else if( ['Enter','='].indexOf(event.key) >= 0 ){
        calculate('');
    }
    else if(event.key==='Escape'){
        clearAll();
    }
})

let clear = document.querySelector('.clear');
clear.addEventListener('click',clearAll);