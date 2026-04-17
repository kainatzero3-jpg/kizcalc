<script>
let expression = "";

const expDisplay = document.getElementById("expression");
const resultDisplay = document.getElementById("result");

function updateDisplay() {
    expDisplay.innerText = expression;
}

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => {
        let value = button.innerText;

        // EQUAL
        if (value === "=") {
            try {
                let exp = expression
                    .replace(/÷/g, "/")
                    .replace(/×/g, "*");

                expression = eval(exp).toString();
                resultDisplay.innerText = expression;
                expDisplay.innerText = "";
            } catch {
                resultDisplay.innerText = "Error";
            }
        }

        // DELETE
        else if (value === "DEL") {
            expression = expression.slice(0, -1);
            updateDisplay();
        }

        // SCIENTIFIC FUNCTIONS
else if (value === "sin") {
    expression += "Math.sin(";
}
else if (value === "cos") {
    expression += "Math.cos(";
}
else if (value === "tan") {
    expression += "Math.tan(";
}
else if (value === "log") {
    expression += "Math.log10(";
}
else if (value === "√") {
    expression += "Math.sqrt(";
}
else if (value === "^") {
    expression += "**";
}
else if (value === "π") {
    expression += Math.PI;
}
else if (value === "e") {
    expression += Math.E;
}

        // CLEAR ALL
        else if (value === "AC") {
            expression = "";
            expDisplay.innerText = "";
            resultDisplay.innerText = "0";
        }

        // GST ADD & REMOVE (ALL %)
else if (value && value.includes("GST")) {
    if (expression !== "") {

        let amount;

        // Safe eval (prevents crash)
        try {
            amount = eval(expression);
        } catch (e) {
            resultDisplay.innerText = "Error";
            return;
        }

        // Extract GST % (works for GST+5, GST-18 etc.)
        let gstPercent = parseFloat(value.replace("GST+", "").replace("GST-", ""));

        let result;

        if (value.includes("+")) {
            result = amount + (amount * gstPercent / 100);
            expDisplay.innerText = "GST " + gstPercent + "% Added";
        } else {
            result = amount / (1 + gstPercent / 100);
            expDisplay.innerText = "GST " + gstPercent + "% Removed";
        }

        resultDisplay.innerText = "₹ " + result.toFixed(2);
        expression = result.toString();
    }
}

        // NORMAL INPUT
        else {
            expression += value;
            updateDisplay();
        }
    });
});
</script>

