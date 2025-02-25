
document.addEventListener('DOMContentLoaded', function() {
    let historyDiv = document.querySelector('.history');
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let history = "";

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            handleButtonClick(button.innerText);
        });

        button.addEventListener('touchstart', function(event) {
            event.preventDefault();  
            handleButtonClick(button.innerText);
            highlightButton(button); 
        });

        
        button.addEventListener('touchend', function() {
            removeHighlight(button);
        });

        
        button.addEventListener('touchcancel', function() {
            removeHighlight(button);
        });

        
        button.addEventListener('mousedown', function() {
            highlightButton(button);  
        });

        button.addEventListener('mouseup', function() {
            removeHighlight(button);  
        });

        button.addEventListener('mouseleave', function() {
            removeHighlight(button);  
        });
    });

    
    function handleButtonClick(value) {
        if (value === 'C') {
            clearAll();
        } else if (value === 'Del') {  
            deleteLastChar();
        } else if (value === '=') {
            evaluateExpression();
        } else {
            appendToScreen(value);
        }
    }

    
    function clearAll() {
        screen.textContent = "";
        history = "";  
        updateHistory();
    }

    
    function deleteLastChar() {
        let currentText = screen.textContent;
        screen.textContent = currentText.slice(0, -1);
    }

    
    function appendToScreen(value) {
        screen.textContent += value;
    }

    
    function evaluateExpression() {
        try {
            let expression = screen.textContent;
            let result = eval(expression);

            result = parseFloat(result.toFixed(5)); 
            history = expression + '=' + result;
            screen.textContent = result;
            updateHistory();
        } catch (error) {
            screen.textContent = 'Error';
            history = " "; 
            updateHistory();
        }
    }

    
    function updateHistory() {
        historyDiv.textContent = history;
    }

    
    function highlightButton(button) {
        button.style.backgroundColor = "#f0f0f0"; 
        button.style.transform = "scale(1.1)";  
    }

    
    function removeHighlight(button) {
        button.style.backgroundColor = " ";  
        button.style.transform = " ";  
    }
});
