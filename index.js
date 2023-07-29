function App() {

    const [expression, setExpression] = React.useState("");
    const [answer, setAnswer] = React.useState("");

    const display = (symbol) => {

        if(/[0-9.]/.test(symbol) && /[1-9.]/.test(expression[expression.length-1])){
            setAnswer(prev => prev + symbol);
        }else{
            setAnswer(symbol);
        }

        setExpression(prev => prev + symbol);
        if(expression[expression.length-1] == "="){
            if(/[1-9.]/.test(symbol)){
                setExpression(symbol)
            }else{
                setExpression(answer+symbol)
            }
        }

    };

    const calculate = () => {
        setAnswer(eval(expression));
        setExpression(prev => prev + "=");
    };

    const decimal = () => {
        const str = expression.split(/[\+\-\*\/]/);
        const prevStr = str[str.length-1];
        if(!prevStr.includes(".")){
            display(".");
        }
    }

    const operator = (symbol) => {
        const ops = ["+", "*", "/"];
        const sub = expression.substring(0,expression.length-1);
        let sub2 = sub.substring(0,sub.length);

        
        sub2 += symbol;

        console.log("sub: " + sub + " length: " + sub.length);
        console.log("sub2: " + sub2 + " length: " + sub2.length);
        console.log("ex: " + expression + " length: " + expression.length);


        switch (symbol) {
            case "+":
                if(expression.charAt(sub.length) == "-" && ops.includes(expression.charAt(sub.length-1))){
                    setExpression(prev => prev.replace(/[\+\-\*\/]/g, "") + symbol);
                }else if(ops.includes(expression.charAt(expression.length-1))){
                    setExpression(sub2);
                }else{
                    display(symbol);
                }
                break;
            case "*":
                if(expression.charAt(sub.length) == "-" && ops.includes(expression.charAt(sub.length-1))){
                    setExpression(prev => prev.replace(/[\+\-\*\/]/g, "") + symbol);
                }else if(ops.includes(expression.charAt(expression.length-1))){
                    setExpression(sub2);
                }else{
                    display(symbol);
                }
                break;
            case "/":
                if(expression.charAt(sub.length) == "-" && ops.includes(expression.charAt(sub.length-1))){
                    setExpression(prev => prev.replace(/[\+\-\*\/]/g, "") + symbol);
                }else if(ops.includes(expression.charAt(expression.length-1))){
                    setExpression(sub2);
                }else{
                    display(symbol);
                }
                break;
            case "-":
                display(symbol);
                break;     
        }
    }

    const allClear = () => {
        setExpression("");
        setAnswer(0);
    };
    
    const clear = () => {
        setExpression(prev => prev.split("").slice(0, prev.length-1).join(""));
        setAnswer(0);
    };

    return (
        <div className="container">
            <div className="grid">
                <div onClick={display} className="dis" id="display">
                    <input type="text" value={expression} placeholder="0" disabled/>
                    <div className="total" >{answer}</div>
                </div>
                <div onClick={allClear} className="padButton AC red" id="clear">AC</div>
                <div onClick={clear} className="padButton C red" id="clear2">C</div>
                <div onClick={() => operator("/")} className="padButton div" id="divide">/</div>
                <div onClick={() => operator("*")} className="padButton times" id="multiply">x</div>
                <div onClick={() => display("7")} className="padButton seven dark-gray" id="seven">7</div>
                <div onClick={() => display("8")} className="padButton eight dark-gray" id="eight">8</div>
                <div onClick={() => display("9")} className="padButton nine dark-gray" id="nine">9</div>
                <div onClick={() => operator("-")} className="padButton minus" id="subtract">-</div>
                <div onClick={() => display("4")} className="padButton four dark-gray" id="four">4</div>
                <div onClick={() => display("5")} className="padButton five dark-gray" id="five">5</div>
                <div onClick={() => display("6")} className="padButton six dark-gray" id="six">6</div>
                <div onClick={() => operator("+")} className="padButton plus" id="add">+</div>
                <div onClick={() => display("1")} className="padButton one dark-gray" id="one">1</div>
                <div onClick={() => display("2")} className="padButton two dark-gray" id="two">2</div>
                <div onClick={() => display("3")} className="padButton three dark-gray" id="three">3</div>
                <div onClick={calculate} className="padButton equal blue" id="equals">=</div>
                <div onClick={() => display("0")} className="padButton zero dark-gray" id="zero">0</div>
                <div onClick={decimal} className="padButton dot dark-gray" id="decimal">.</div>
            </div>
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));