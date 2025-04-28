
type Operator = '+' | '-' | '*' | '/' | '^';
type Parenthesis = '(' | ')';
export type Token = number | Operator | Parenthesis;

export class Calculator{


    static tokenize(expression : string): Token[] {
        const regex = /(\-?\d+\.?\d*)|([+\-*/^()])|\s+/g;
        var tokens: Token[] = []
        let match;

        while((match = regex.exec(expression)) !== null){
            const [_, numero, operador] = match
        
            if(numero){
                tokens.push(parseFloat(numero));
            }
            else if (operador && operador.trim() !== '') {
                tokens.push(operador as Operator | Parenthesis);
            }
            console.log(match)
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
                 case '/': result = leftOperand / rightOperand; break;
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