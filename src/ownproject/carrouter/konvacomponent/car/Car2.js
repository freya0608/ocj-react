/**
 * Created by admin on 2018/11/20.
 */
import Car from '../Car'
import React from 'react';
const animations={
	"day-down": [
		299, 342, 269, 201
		],
	"day-right": [
		588, 342, 269, 200
		],

	"evening-down":[
		299, 563, 269, 200
		],
	"evening-right": [
		10, 563, 269, 200
		],
	"night-down":[
		10, 10, 422, 312
		],
	"night-right": [
		452, 10, 422, 311
		],

	"opendoor":[
		10, 342, 269, 201
		]
}
const carbg="./res/car2.png";

const Car2=()=>{
	return (props)=>{
		return (<Car
			carwidth={269} carheight={201} animations={animations} carbg={carbg} {...props}/>)
	}
}

export default Car2()