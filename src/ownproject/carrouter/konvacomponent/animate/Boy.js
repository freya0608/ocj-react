/**
 * Created by admin on 2018/11/26.
 */
import React from 'react';
import BaseMove from '../roadeffect/BaseMove'
const animations={
	"default": [
		1, 1, 110, 110,
		113, 1, 110, 110,
		673, 1, 110, 110,
		785, 1, 110, 110,
		897, 1, 110, 110,
		1009, 1, 110, 110,
		1121, 1, 110, 110,
		1233, 1, 110, 110,
		1345, 1, 110, 110,
		1457, 1, 110, 110,
		225, 1, 110, 110,
		337, 1, 110, 110,
		449, 1, 110, 110,
		561, 1, 110, 110,
	]
}
const Girl=()=>{
	return (props)=>{
		return (<BaseMove
			width={110}
			height={110}
			x={3320}
			frameRate={10}
			y={2209}
			bgurl="./res/move/boy.png"
			animations={animations} {...props}/>)
	}
}
export default Girl()