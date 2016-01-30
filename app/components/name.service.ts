
import {Injectable} from 'angular2/core';


@Injectable()
export class NameServiceA2 {
	fname = "Vikash";
	lname = "Pandey"
	constructor(){}
	
	getFormalFullName() {
    	return this.lname +', '+this.fname;
  }
}