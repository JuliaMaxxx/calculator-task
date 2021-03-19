// Экран для отображения результата
export class Display 
{
    output: HTMLElement;
    maxChars: number;

    // output - элемент для вывода результата
    // maxchar - максимальное кол-во символов
    constructor( out: HTMLElement, max: number ) 
    {
        this.output = out;
        this.maxChars = max;
    }

    // установка значения
    setValue( value: string ) 
    {
        if ( value.length <= this.maxChars ) 
        {
            this.output.textContent = value;
            return;
        }
        
        const asNumber = Number(value);

        if ( isNaN(asNumber) )
        {
            this.output.textContent = 'NaN';
            return;
        }

        const nonNumericCharsCount: number = 3;
        this.output.textContent = asNumber.toPrecision( this.maxChars - nonNumericCharsCount );
    }
}