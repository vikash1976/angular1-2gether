import {Component} from 'angular2/core';

@Component({
    selector: 'adder',
    inputs: ['operands:operands'],
    template:`<h3>Sum of {{operands.operand1}} and {{operands.operand2}} is: 
    <span>{{operands.operand1 + operands.operand2}}</span></h3>
    `
})

export class Adder {
    operands:any;
}