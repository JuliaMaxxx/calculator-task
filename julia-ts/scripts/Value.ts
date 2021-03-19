// создаем свой тип
export let ValueConstructor: Value;

// числовое значение
export class Value 
{
    value: number = 0;
    fractionDigits: number = 0;
    negative: boolean = false;
    withDot: boolean = false;

    constructor ( val: string | number )
    {
        if ( val )
        {
            this.set(val);
        }
    }

    // возвращает примитивное значение
    valueOf()
	{
		return this.value * ( this.negative ? -1 : 1 );
	}

    // возвращает строковое представление
    toString()
	{
		let asString: string = this.valueOf().toFixed( this.fractionDigits );
		
		if ( this.withDot && !asString.includes( '.' ) )
		{
			asString += '.';
		}
		
		if ( this.negative && asString[0] !== '-' )
		{
			asString = '-' + asString;
		}
		
		return asString;
	}

    // устанавливает значение
    set( val: string | number )
	{
		if ( typeof val === 'number' )
		{
			this._setFromNumber( val );
		}
		else
		{
			this._setFromString( val );
		}
	}

    // возвращает знак числа
    getNegative()
	{
		return this.negative;
	}

    //устанавливает знак числа
    setNegative( state: boolean = true )
	{
		this.negative = state;
	}

    // устанавливает наличие точки в числе
    setDot( state: boolean = true )
	{
		this.withDot = state;
	}

    // устанавливает значение из числа
    _setFromNumber( val: number )
	{
		const asString: string = String( val );
		const dotIndex: number = asString.indexOf( '.' );
		
		if ( dotIndex === -1 )
		{
			this.fractionDigits = 0;
			this.withDot = false;
		}
		else
		{
			this.fractionDigits = asString.length - dotIndex - 1;
			this.withDot = true;
		}
		
		this.negative = val < 0;
		this.value = Math.abs( val );
	}

    // устанавливает значение из строки
    _setFromString( val: string )
	{
		if ( val === '' )
		{
			this.fractionDigits = 0;
			this.withDot = false;
			this.negative = false;
			this.value = 0;
			return;
		}
		
		const dotIndex: number = val.indexOf( '.' );
		
		if ( dotIndex === -1 )
		{
			this.fractionDigits = 0;
			this.withDot = false;
		}
		else
		{
			this.fractionDigits = val.length - dotIndex - 1;
			this.withDot = true;
		}
		
		this.negative = val[0] === '-';
		this.value = Math.abs( Number( val ) );
	}

}