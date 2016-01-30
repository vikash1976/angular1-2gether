import {Component, Input, Inject} from 'angular2/core';
import {Hero} from './hero';
import {adapter} from '../adapter';
@Component({
	selector: 'my-hero-detail',
	template: `
		<div>
                        <h3>{{hero.name}} details!</h3>
                        <div><label>id: </label>{{hero.id}}</div>
						<h4>{{simple}} - Angular2 (text message)</h4>
						<h3>Its A2 consuming A1's directive with transclusion</h3>
						<price-record price="{{price}}" stock="{{stock}}" lastPrice="{{prevPr}}">
								my transcluded text</price-record>
                        
						<h3>Its A2 consuming A1's service</h3>
						<h3>My Full Name</h3>
        				<h4>{{myFullName}}</h4>
                    </div> 
	`,
    inputs: ['hero:hero', 'simple:simple'],
	directives: [adapter.upgradeNg1Component('priceRecord')]
})
export class HeroDetailComponent {
	 hero: Hero;
	 simple: any = "Some Other Value";
	 prevPr = 110;
	 price = 106;
	 stock = 'VED';
	 myFullName = "";
	 //upgraded A1's service is injected into A2 component
	 constructor(@Inject('nameService') nameService){
		 this.myFullName = nameService.getFullName(); // calls A1's service
	 }
};

