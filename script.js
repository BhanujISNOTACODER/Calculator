class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement;
        this.currentOperandTextElement=currentOperandTextElement;
        this.clear();
    }
    clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
    }
    updateDisplay(){
     this.currentOperandTextElement.innerText = this.currentOperand;
     if(this.operation!==null){
         this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
     }
     else{
        this.previousOperandTextElement = '';
     }
     }
    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    appendNumber(number){
      if(number=="." && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString()+number.toString();
    }
    chooseOperation(operation){
      if(this.currentOperand === '') return;
      if(this.previousOperand !== ''){
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
    compute(){
     let computation;
     let prev = Number.parseFloat(this.previousOperand);
     let curr = Number.parseFloat(this.currentOperand);
     switch(this.operation){
        case '+': 
          computation = prev + curr;
          break;
        case '-': 
          computation = prev - curr;
          break;
        case '*': 
          computation = prev*curr;
          break;
        case '/': 
          computation = prev / curr;
          break;
        default:
            return;
     }
     this.currentOperand = computation;
     this.previousOperand ='';
     this.operation = '';
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
})
equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click',()=>{
    calculator.clear(); 
    calculator.updateDisplay();
})
deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})
operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
})
