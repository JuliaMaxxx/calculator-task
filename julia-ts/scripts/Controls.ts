import {Calculator} from './Calculator';

export class Controls {
    calculator: Calculator;

    constructor ( calc: Calculator, buttons: NodeListOf<Element>)
    {
        this.calculator = calc;
		this._handleButtonClick = this._handleButtonClick.bind( this );
		
		for ( const button of buttons )
		{
			button.addEventListener( 'click', this._handleButtonClick );
		}
    }

    // выполнение действий
    doAction( action: string, value: string )
	{
		switch ( action )
		{
			case 'addition':
				this.calculator.addition();
				break;
			
			case 'subtraction':
				this.calculator.subtraction();
				break;
			
			case 'multiplication':
				this.calculator.multiplication();
				break;
			
			case 'division':
				this.calculator.division();
				break;
			
			case 'square-root':
				this.calculator.squareRoot();
				break;
			
			case 'digit':
				if ( !value )
				{
					throw new Error( 'Digit action should be used with a value' );
				}
				
				this.calculator.addDigit( value );
				break;
			
			case 'period':
				this.calculator.period();
				break;
			
			case 'change-sign':
				this.calculator.changeSign();
				break;
			
			case 'calculate':
				this.calculator.calculate();
				break;
			
			case 'backspace':
				this.calculator.backspace();
				break;
			
			case 'clear':
				this.calculator.clear();
				break;
			
			default:
				throw new Error( `Unknown action "${action}"` );
		}
	}

    // обработчик нажатия на кнопку
    _handleButtonClick( event: Event )
	{
		const target = event.target;
		
		if ( !( target instanceof HTMLButtonElement ) )
		{
			return;
		}
		
		const action: string = target.dataset.action || '';
		const value: string = target.dataset.value;
		this.doAction( action, value );
	}
}