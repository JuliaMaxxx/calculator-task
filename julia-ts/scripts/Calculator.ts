import {ValueConstructor} from './Value';
import {Display} from './Display';
import {Value} from './Value';

const Operation = {
	NONE: 0,
	ADDITION: 1,
	SUBTRACTION: 2,
	MULTIPLICATION: 3,
	DIVISION: 4,
};

export class Calculator 
{
    display: Display;
    Value: ValueConstructor;
    operation: number = Operation.NONE;
    value: Value;
    memory: Value | null = null;
    edit: boolean = true;

    // калькулятор
    constructor ( disp: Display, val: ValueConstructor )
    {
        this.display = disp;
		this.Value = val;
		this.value = new Value(val);
		
		this.updateDisplay();
    }

    // обновляет отображаемое значение
	updateDisplay()
	{
		this.display.setValue( String( this.value ) );
	}

    // сбрасывает состояние калькулятора
	clear()
	{
		this.operation = Operation.NONE;
		this.value = new this.Value();
		this.memory = null;
		this.edit = true;
		
		this.updateDisplay();
	}

    // удаляет последний символ
	backspace()
	{
		this._prepareEdit();
		this.value.set( String( this.value ).slice( 0, -1 ) );
		this.updateDisplay();
	}

    // выполняет вычисление текущего значения, если необходимо
	calculate()
	{
		if ( !this.memory )
		{
			return;
		}
		
		let numberA: number = Number( this.memory );
		const numberB: number = Number( this.value );
		
		switch ( this.operation )
		{
			case Operation.ADDITION:
				numberA += numberB;
				break;
			
			case Operation.SUBTRACTION:
				numberA -= numberB;
				break;
			
			case Operation.MULTIPLICATION:
				numberA *= numberB;
				break;
			
			case Operation.DIVISION:
				numberA /= numberB;
				break;
			
			case Operation.NONE:
				break;
			
			default:
				throw new Error( 'Unknown operation' );
		}
		
		this.operation = Operation.NONE;
		this.edit = false;
		this.value = new this.Value( numberA );
		this.memory = null;
		
		this.updateDisplay();
	}

    // добавляет новую цифру к значению калькулятора
    addDigit( val: string )
    {
        if ( !/^\d$/.test( val ) )
        {
            throw new Error( `Incorrect number value "${val}".` );
        }
        
        this._prepareEdit();
        
        // Чтобы не потерять -0
        const negative = this.value.getNegative();
        
        this.value.set( String( this.value ) + val );
        this.value.setNegative( negative );
        
        this.updateDisplay();
    }

    // ставит десятичный разделитель
	period()
	{
		this._prepareEdit();
		this.value.setDot();
		this.updateDisplay();
	}

    // изменяет знак числа
	changeSign()
	{
		this.value.setNegative( !this.value.getNegative() );
		this.edit = true;
		this.updateDisplay();
	}

    // вычисляет квадратный корень
	squareRoot()
	{
		this.calculate();
		this.value = new this.Value(
			Math.sqrt( Number( this.value ) ),
		);
		this.updateDisplay();
	}

    // выполняет сложение
	addition()
	{
		this.calculate();
		this.memory = this.value;
		this.value = new this.Value();
		this.edit = true;
		this.operation = Operation.ADDITION;
	}
	
	// выполняет  вычитание
	subtraction()
	{
		this.calculate();
		this.memory = this.value;
		this.value = new this.Value();
		this.edit = true;
		this.operation = Operation.SUBTRACTION;
	}
	
	// выполняет умножение
	multiplication()
	{
		this.calculate();
		this.memory = this.value;
		this.value = new this.Value();
		this.edit = true;
		this.operation = Operation.MULTIPLICATION;
	}
	
	// выполняет деление
	division()
	{
		this.calculate();
		this.memory = this.value;
		this.value = new this.Value();
		this.edit = true;
		this.operation = Operation.DIVISION;
	}
	
    // подготавливает к редактированию значения на экране
	_prepareEdit()
	{
		if (
			!this.edit
			&& ( this.operation === Operation.NONE )
		)
		{
			this.clear();
		}
	}

}