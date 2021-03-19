// Числовое значение
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