import { Calculator } from './Calculator';
import { Controls } from './Controls';
import { Display } from './Display';
import { Value } from './Value';

main();

function main()
{	
	const outputElement = document.getElementById( 'display' );
	
	if ( !outputElement )
	{
		return;
	}
	
	const display: Display = new Display( outputElement, 12 );
	const calculator: Calculator = new Calculator( display, Value );
	const buttons: NodeListOf<Element> = document.querySelectorAll( 'div.buttons>button' );
	
	new Controls( calculator, buttons );
}