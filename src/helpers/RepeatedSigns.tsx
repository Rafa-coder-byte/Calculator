
export class RepeatedSigns{

    static eviteRepeatedSigns( expression : string, operationSign : string) : string{

        var newExpression : string

        if(expression[expression.length-1] === '+' || expression[expression.length-1] === '-' || expression[expression.length-1] === 'x' || expression[expression.length-1] === '÷' || expression[expression.length-1] === '%' || expression[expression.length-1] === '.')
            {
                let splitExpression = expression.split('')

            switch(operationSign){
                case '+':
                    {
                        splitExpression = splitExpression.with(-1, '+')
                        newExpression = splitExpression.join('').toString()
                        break;
                    }

                case '-':
                    {
                        splitExpression = splitExpression.with(-1, '-')
                        newExpression = splitExpression.join('').toString()
                        break;
                    }
                case 'x':
                    {
                        splitExpression = splitExpression.with(-1, 'x')
                        newExpression = splitExpression.join('').toString()
                        break;
                    }
                case '÷':
                    {
                        splitExpression = splitExpression.with(-1, '÷')
                        newExpression = splitExpression.join('').toString()
                        break;
                    }
                case '%':
                    {
                        splitExpression = splitExpression.with(-1, '%')
                        newExpression = splitExpression.join('').toString()
                        break;
                    }

                default: {
                    splitExpression = splitExpression.with(-1, '.')
                    newExpression = splitExpression.join('').toString()
                    break;
                };
            }
     }  

        else{
                newExpression = expression + operationSign        
            }

        return newExpression;
    }
}