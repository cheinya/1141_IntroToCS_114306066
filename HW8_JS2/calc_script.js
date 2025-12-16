/** 加法 [cite: 56] */
function add(a, b) {
    return a + b;
}

/** 減法 [cite: 57] */
function subtract(a, b) {
    return a - b;
}

/** 乘法 [cite: 58] */
function multiply(a, b) {
    return a * b;
}

/** 除法 - 檢查除數 [cite: 59] */
function divide(a, b) {
    // 4. 處理除數為零的無效輸入 (Handle division by zero) [cite: 51]
    if (b === 0) {
        return NaN; // Not a Number，表示錯誤
    }
    return a / b;
}

/** 獲取輸入並執行計算 [cite: 60] */
function calculate() {
    // 2. 使用 getElementById() 獲取輸入 
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operatorSelect = document.getElementById('operator');
    const resultDisplay = document.getElementById('resultDisplay');

    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operator = operatorSelect.value;
    let result;

    // 檢查輸入是否為有效數字
    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.textContent = 'Result = Invalid Input';
        return;
    }

    // 根據選擇的運算子執行對應函式
    switch (operator) {
        case 'add':
            result = add(num1, num2);
            break;
        case 'subtract':
            result = subtract(num1, num2);
            break;
        case 'multiply':
            result = multiply(num1, num2);
            break;
        case 'divide':
            result = divide(num1, num2);
            break;
        default:
            resultDisplay.textContent = 'Result = Select Operator';
            return;
    }

    // 處理除以零的結果
    if (isNaN(result)) {
        resultDisplay.textContent = 'Result = Error (Division by Zero)';
    } else {
        // 5. 顯示結果，四捨五入到小數點後兩位 
        resultDisplay.textContent = `Result = ${result.toFixed(2)}`;
    }
}

// 為計算按鈕添加事件監聽器
document.getElementById('calculateBtn').addEventListener('click', calculate);