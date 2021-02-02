import React, { useState } from 'react';
import './Calculator.css';
import functions from '../functions/functions';
import Button from './Button';
import Display from './Display';

const Calculator = () => {
    const [displayedValue, setDisplayedValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [nextNumberWillCleanDisplayValue, setNextNumberWillCleanDisplayValue] = useState(false);
    const [lastKeyIsDigit, setLastKeyIsDigit] = useState(true);
    const [lastKeyIsOperator, setLastKeyIsOperator] = useState(false);
    const [sciencetific, setSciencetific] = useState(false);
    const [theme, setTheme] = useState(true);
    

    const handleDecimal = () => {
        if (displayedValue.toString().indexOf(".") === -1) {
            setDisplayedValue(displayedValue + ".");
            setNextNumberWillCleanDisplayValue(false);
            setLastKeyIsOperator(false);
            setLastKeyIsDigit(true);
        }
    }

    const handleClearButton = () => {
        setPreviousValue(null);
        setDisplayedValue('0');
        setOperator(null);
        setNextNumberWillCleanDisplayValue(false);
        setLastKeyIsDigit(true);
        setLastKeyIsOperator(false);
    }

    const handleXButton = () => {
        setDisplayedValue(displayedValue.toString().substr(0, displayedValue.length - 1));
        setLastKeyIsOperator(false);
    }

    const toggleSciencetific = () => {
        const sc = sciencetific
        setSciencetific(!sc)

    }

    const handleNumbers = (event) => {
        event.persist();
        const num = event.target.innerHTML;
        if (nextNumberWillCleanDisplayValue) {
            setDisplayedValue(String(num));
            setNextNumberWillCleanDisplayValue(false);
            setLastKeyIsDigit(true);
            setLastKeyIsOperator(false);
        } else {
            displayedValue === "0" ? setDisplayedValue(String(num)) : setDisplayedValue(displayedValue + String(num));
            setLastKeyIsDigit(true);
            setLastKeyIsOperator(false);
        }
    }

    const handleOps = (event) => {
        event.persist();
        const signJustPressed = event.target.innerHTML;
        let resultTemporario = 0;
        if (previousValue && operator) {
            if (lastKeyIsOperator && signJustPressed !== "-") {
                setOperator(signJustPressed);
                setNextNumberWillCleanDisplayValue(true);
                setLastKeyIsOperator(true);
                setLastKeyIsDigit(false);
            }
        }
        if (previousValue && operator) {
            if (lastKeyIsOperator && signJustPressed === "-") {
                setDisplayedValue("-");
                setNextNumberWillCleanDisplayValue(false);
                setLastKeyIsOperator(true);
                setLastKeyIsDigit(false);
            }
            else if (displayedValue !== '-' && !lastKeyIsOperator) {
                resultTemporario = functions.calculate(previousValue, operator, displayedValue);
                setPreviousValue(resultTemporario);
                setDisplayedValue(resultTemporario);
                setOperator(signJustPressed);
                setNextNumberWillCleanDisplayValue(true);
                setLastKeyIsDigit(false);
                setLastKeyIsOperator(true);
            }
        }
        else {
            setPreviousValue(displayedValue);
            setOperator(signJustPressed);
            setNextNumberWillCleanDisplayValue(true);
            setLastKeyIsDigit(false);
        }
    }

    const handleEquals = (event) => {
        event.persist();
        const inp = displayedValue;
        if (previousValue) {
            if (operator) {
                const calculatedValue = functions.calculate(previousValue, operator, inp);
                setDisplayedValue(String(calculatedValue));
                setPreviousValue(null);
                setOperator(null);
                setNextNumberWillCleanDisplayValue(true);
                setLastKeyIsOperator(false);
            }
        } else {
            setPreviousValue(displayedValue);
            setLastKeyIsDigit(true);
            setLastKeyIsOperator(false);
        }
    }

    const togglePositiveNegativeNumbers = () => {
        
        if (displayedValue.toString().charAt(0) === "-") {
            setDisplayedValue(displayedValue.substr(1));
        } else {
            setDisplayedValue("-" + displayedValue);
        }
    }

    const handleSquare = () => {
        if (displayedValue) {
            setDisplayedValue(displayedValue * displayedValue);
        }
    }


    const handleRoot = () => {
        if (displayedValue) {
            setDisplayedValue(Math.sqrt(displayedValue));
        }
    }

    const valuesRows = [
        [{
                value: 'AC',
                classN: `${theme?'AC-key_dark':'AC-key_light'}`,
                function: handleClearButton,
                permanent: true
            }, {
                value: 'X',
                function: handleXButton,
                permanent: true
            },
    
            {
                value: '/',
                function: handleOps,
                permanent: true
            }
        ],
        [{
            value: '7',
            function: handleNumbers,
            permanent: true
        }, {
            value: '8',
            function: handleNumbers,
            permanent: true
        }, {
            value: '9',
            function: handleNumbers,
            permanent: true
        }, {
            value: '*',
            function: handleOps,
            permanent: true
        }],
        [{
            value: '4',
            function: handleNumbers,
            permanent: true
        }, {
            value: '5',
            function: handleNumbers,
            permanent: true
        }, {
            value: '6',
            function: handleNumbers,
            permanent: true
        }, {
            value: '-',
            function: handleOps,
            permanent: true
        }],
        [{
            value: '1',
            function: handleNumbers,
            permanent: true
        }, {
            value: '2',
            function: handleNumbers,
            permanent: true
        }, {
            value: '3',
            function: handleNumbers,
            permanent: true
        }, {
            value: '+',
            function: handleOps,
            permanent: true
        }],
        [{
                value: '0',
                function: handleNumbers,
                permanent: true
            }, {
                value: '.',
                function: handleDecimal,
                permanent: true
            }, {
                value: '=',
                classN: "double-key",
                function: handleEquals,
                permanent: true
            },
    
            {
                value: 'sign',
                classN: "sciencetific",
                display: sciencetific,
                function: togglePositiveNegativeNumbers
            },
    
            {
                value: '^2',
                display: sciencetific,
                classN: "sciencetific",
                function: handleSquare
            },
    
            {
                value: 'sqrt',
                display: sciencetific,
                classN: "sciencetific",
                function: handleRoot
            },
    
        ]
    ];

    return (
        <div className={`${theme?'Appdark':'Applight'} `} >
        <div className="row">
           
            <div className={`col-sm ${theme?'colu1_light':'colu1_dark'} `}>
            <Button className="Mode" onClick={()=>setTheme(true)}>Dark</Button>
              <Button className="Mode" onClick={()=>setTheme(false)}>Light</Button><br />
                <Button className="Sciencetific" onClick={toggleSciencetific}>Scientific</Button>
                     <Display theme={`${theme?'dark':'light'}`}>{displayedValue}</Display>

                            {/*For Normal Mode */}

                 <div className={`calculator ${theme?'light':'dark'} `}>
                    {valuesRows.map(function (values) {
                        const buttons = values.map(function (elem) {
                            const classN = elem.classN || "";
                            return (
                                <>
                                   {elem.permanent ? <Button theme={theme}
                                        type="submit"
                                        onClick={elem.function}
                                        className={`btn btn-light btn-lg  ${theme?'keydark':'keylight'} ${classN}`}>
                                        {elem.value}
                                    </Button>:null}
                                 </>
                            )
                        });
                        return (<div className="row">{buttons}</div>);
                    })}

                    {/* For Scientific Mode  */}
                    {valuesRows.map(function (values) {
                        const buttons = values.map(function (elem) {
                            const classN = elem.classN || "";
                            return (
                               <>
                                     {elem.display ? <Button
                                        type="submit"
                                        onClick={elem.function}
                                        className={`btn btn-light btn-lg  ${theme?'keydark':'keylight'} ${classN}`}>
                                        {elem.value}
                                    </Button> : null} 
                               </>
                            )
                        });
                        return (<div className="row">{buttons}</div>);
                    })}
                </div>

            </div>
        </div>
        </div>
    )
}
export default Calculator;

