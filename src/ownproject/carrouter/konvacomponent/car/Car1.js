/**
 * Created by admin on 2018/11/20.
 */
import Car from '../Car'
import React from 'react';
const animations={
	"day-down": [
		309, 568, 279, 203
		],
	"day-right": [
		309, 344, 279, 204
		],

	"evening-down":[
		608, 344, 279, 204
		],
	"evening-right": [
		10, 568, 279, 203
		],
	"night-down":[
		10, 10, 436, 314
		],
	"night-right": [
		466, 10, 436, 313
		],

	"opendoor":[
		10, 344, 279, 204
		]
}
const carbg="./res/car1.png";

const Car1=()=>{
	return (props)=>{
		return (<Car
			carwidth={279} carheight={203} animations={animations} carbg={carbg} {...props}/>)
	}
}

export default Car1()