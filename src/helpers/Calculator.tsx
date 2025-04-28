type Operator = '+' | '-' | '*' | '/' | '^';
type Parenthesis = '(' | ')';
export type Token = number | Operator | Parenthesis;

export class Calculator{


    static tokenize(expression: string): Token[] {
        const tokens: Token[] = [];
        let i = 0;
    
        while (i < expression.length) {
            const char = expression[i];
    
            // Saltar espacios
            if (/\s/.test(char)) {
                i++;
                continue;
            }
    
            // Números (incluyendo negativos)
            if (char === '-' && (
                i === 0 || // Al inicio de la expresión
                /[+\-*/^(\s]/.test(expression[i - 1]) // O después de un operador o paréntesis de apertura
            )) {
                // Buscar el número negativo completo
                let numStr = '-';
                i++;
                while (i < expression.length && /[\d.]/.test(expression[i])) {
                    numStr += expression[i];
                    i++;
                }
                tokens.push(parseFloat(numStr));
                continue;
            }
    
            // Números positivos
            if (/\d/.test(char)) {
                let numStr = '';
                while (i < expression.length && /[\d.]/.test(expression[i])) {
                    numStr += expression[i];
                    i++;
                }
                tokens.push(parseFloat(numStr));
                continue;
            }
    
            // Operadores y paréntesis
            if (/[+\-*/^()]/.test(char)) {
                tokens.push(char as Operator | Parenthesis);
                i++;
                continue;
            }
    
            throw new Error(`Carácter no válido: ${char}`);
        }
    
        return tokens;
    }

    static validateParentheses(tokenizeExpression: Token[]): boolean {
        const stack: Parenthesis[] = [];
        
        for (const token of tokenizeExpression) {
            if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                if (stack.length === 0) return false; // Cierre sin apertura
                stack.pop();
            }
        }
        
        return stack.length === 0;
    }

    static infixToPostfix(tokenizeExpression: Token[]): Token[]{
        const stack: (Operator | Parenthesis)[] = [] //stack for operators and parenthesis temporaly
        const output: Token[] = []

        for(const token of tokenizeExpression){
            //Number handling
            if(typeof token === 'number'){
                output.push(token);
            }
            //Left Parenthesis
            else if(token === '(' ){
                stack.push(token);
            }
             //Right Parenthesis
            else if(token === ')' ){
                while (stack.length > 0 && stack[stack.length -1] !== '('){
                    output.push(stack.pop() as Operator)
                }
                stack.pop(); //Remove '('
            }
              
              //Operator handling
            else {
               while(
                stack.length > 0 &&
                stack[stack.length - 1] !== '(' &&
                getPrecedence(token) <= getPrecedence(stack[stack.length -1] as Operator)
               )
                 {
                        output.push(stack.pop() as Operator)
                 }
                 stack.push(token)
            }
        }
            // Empty remaining stack
        while (stack.length > 0) {
            output.push(stack.pop() as Operator);
        }
    
    return output;
    }


    static evaluatePostfix(postfixExpression: Token[]): string{
     var result: number = 0
     
     const stack: number[] = [];
    
     for (const token of postfixExpression) {
         if (typeof token === 'number') {
             stack.push(token);
         } else {
             // Pop operands (right operand first, left operand second)
             const rightOperand = stack.pop()!;
             const leftOperand = stack.pop()!;
             
             let result: number;
             switch (token) {
                 case '+': result = leftOperand + rightOperand; break;
                 case '-': result = leftOperand - rightOperand; break;
                 case '*': result = leftOperand * rightOperand; break;
                 case '/': if (rightOperand === 0) {
                                throw new Error("Error: División por cero");
                            }
                            result = leftOperand / rightOperand;
                            break;
                 case '^': result = leftOperand ** rightOperand; break;
                 default: throw new Error(`Unsupported operator: ${token}`);
             }
             
             stack.push(result);
         }
     }
     
     if (stack.length !== 1) {
         throw new Error("Invalid postfix expression");
     }
     
     result=  stack[0];

     return result.toString()
    }
}



function getPrecedence(operator: Operator): number {
    const precedenceMap: Record<Operator, number> = {
        '^': 4,
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2
    };
    return precedenceMap[operator];
}