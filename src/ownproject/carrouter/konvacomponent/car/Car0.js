/**
 * Created by admin on 2018/11/20.
 */
import Car from '../Car'
import React from 'react';
const animations={
	"day-down": [
		296, 321, 266, 188
		],
	"day-right": [
		10, 321, 266, 188
		],

	"evening-down":[
		582, 321, 266, 188
		],
	"evening-right": [
		297, 529, 266, 187
		],
	"night-down":[
		446, 10, 416, 291
		],
	"night-right": [
		10, 10, 416, 291
		],

	"opendoor":[
		10, 529, 267, 187
		]
}
const carbg="./res/car.png";
const Car0=()=>{
	return (props)=>{
		return (<Car carwidth={266} carheight={188} animations={animations} carbg={carbg} {...props}/>)
	}
}

export default Car0()