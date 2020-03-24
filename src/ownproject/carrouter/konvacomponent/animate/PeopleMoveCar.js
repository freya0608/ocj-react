/**
 * Created by admin on 2018/11/26.
 */
import React from 'react';
import BaseMove from '../roadeffect/BaseMove'
const animations={
	"default": [
		0, 0, 33, 80,
	]
}
const people=()=>{
	return (props)=>{
		return (<BaseMove
			width={33}
			height={80}
			frameRate={10}
			scale={.7}
			bgurl="./res/effect/peoplegx.png"
			animations={animations} {...props}/>)
	}
}
export default people()