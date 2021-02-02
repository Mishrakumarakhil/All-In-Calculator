export const calculate = (previousValue, operator, displayedValue) => {
    let result = 0;
    if (operator === "+") {
        result = parseFloat(previousValue) + parseFloat(displayedValue);
    } else if (operator === "-") {
        result = parseFloat(previousValue) - parseFloat(displayedValue);
    } else if (operator === "*") {
        result = parseFloat(previousValue) * parseFloat(displayedValue);
    } else if (operator === "/") {
        result = parseFloat(previousValue) / parseFloat(displayedValue);
    }
    return result;
};

const functions = {
    calculate: calculate,
}


export default functions;