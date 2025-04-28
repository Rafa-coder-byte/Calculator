
export class BasicOperations{
      
    static sum(a: number, b:number): number{
        var result: number = a+b
        return result
    }
    
    static minus(a: number, b:number): number{
        var result: number = a-b
        return result
    }

    static mul(a: number, b:number): number{
        var result: number = a*b
        return result
    }
 
    static div(a: number, b:number): number | string{
        if(b === 0)
            return 'División por 0'
        var result: number = a/b
        return result
    }
}