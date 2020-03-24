/**
 * Created by admin on 2018/11/26.
 */
import React from 'react';
import BaseMove from '../roadeffect/BaseMove'
const animations={
	"default": [
		0, 0, 33, 62,
	]
}
const people=()=>{
	return (props)=>{
		return (<BaseMove
			width={33}
			height={62}
			x={1450}
			frameRate={10}
			y={5960}
			bgurl="./res/peoplehb.png"
			animations={animations} {...props}/>)
	}
}
export default people()