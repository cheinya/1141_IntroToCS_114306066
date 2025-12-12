// 初始化行計數器 (Row counter, starting after initial rows)
let rowCount = 0; 

// 獲取元素 (Get elements using getElementById)
const submitBtn = document.getElementById('submitBtn');
const mathInput = document.getElementById('mathGrade');
const englishInput = document.getElementById('englishGrade');
const gradeTableBody = document.querySelector('#gradeTable tbody');
const mathAvgDisplay = document.getElementById('mathAverage');
const englishAvgDisplay = document.getElementById('englishAverage');
const overallAvgDisplay = document.getElementById('overallAverage');

/**
 * 計算並更新所有欄位的平均分數和總平均。
 */
function updateAverages() {
    const rows = gradeTableBody.querySelectorAll('tr');
    let totalMath = 0;
    let totalEnglish = 0;
    let totalScores = 0;
    const numRows = rows.length;

    if (numRows === 0) {
        mathAvgDisplay.textContent = '0.00';
        englishAvgDisplay.textContent = '0.00';
        overallAvgDisplay.textContent = '0.00';
        return;
    }

    rows.forEach(row => {
        // 假設 Math 在第二個 <td>，English 在第三個 <td>
        const cells = row.querySelectorAll('td');
        const mathScore = parseFloat(cells[1].textContent);
        const englishScore = parseFloat(cells[2].textContent);

        totalMath += mathScore;
        totalEnglish += englishScore;
        totalScores += (mathScore + englishScore);
    });

    // 計算欄位平均 (Calculate column-wise averages)
    const mathAverage = totalMath / numRows;
    const englishAverage = totalEnglish / numRows;
    // 計算總平均 (Calculate overall average)
    const overallAverage = totalScores / (numRows * 2); 

    // 顯示結果 (Display results, rounded to 2 decimal places)
    mathAvgDisplay.textContent = mathAverage.toFixed(2);
    englishAvgDisplay.textContent = englishAverage.toFixed(2);
    overallAvgDisplay.textContent = overallAverage.toFixed(2);
}

/**
 * 處理提交按鈕點擊事件 (Handles the submit button click).
 */
submitBtn.addEventListener('click', function() {
    const mathGrade = parseFloat(mathInput.value);
    const englishGrade = parseFloat(englishInput.value);

    // 驗證輸入 (Input Validation)
    if (isNaN(mathGrade) || isNaN(englishGrade) || mathGrade < 0 || englishGrade < 0) {
        alert('請輸入有效的成績 (0-100)');
        return;
    }
    
    // 計算該行平均 (Calculate row average)
    const rowAverage = ((mathGrade + englishGrade) / 2).toFixed(2);
    
    // 新增行計數 (Increment row count)
    rowCount++;
    
    // 建立新的表格行 (Create a new table row)
    const newRow = gradeTableBody.insertRow();
    newRow.setAttribute('data-row-id', rowCount);

    // 新增儲存格資料 (Add cell data)
    newRow.insertCell().textContent = rowCount; // #
    newRow.insertCell().textContent = mathGrade; // Math
    newRow.insertCell().textContent = englishGrade; // English
    newRow.insertCell().textContent = rowAverage; // Average (for the row)

    // 更新整體平均值 (Update column and overall averages)
    updateAverages();

    // 清空輸入框 (Clear input fields)
    mathInput.value = '';
    englishInput.value = '';
});

// 頁面載入時，先執行一次平均值計算，確保初始數據正確顯示 (Initial calculation on page load)
// 雖然在 HTML 中已經預設了，但這確保了腳本的完整性
updateAverages();

// ** 備註: 根據 Lab 提示，您也可以將 updateAverages() 命名為 updateColumnAverages() [cite: 23] **
// ** 此處使用 updateAverages() 包含所有平均計算，更符合整個 Lab 的要求 [cite: 14, 15, 16] **