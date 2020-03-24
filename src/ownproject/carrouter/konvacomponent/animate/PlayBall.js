/**
 * Created by admin on 2018/11/26.
 */
import React from 'react';
import BaseMove from '../roadeffect/BaseMove'
const animations={
	"default": [
		1, 1, 110, 110,
		1, 1, 110, 110,
		1, 1, 110, 110,
		1, 1, 110, 110,
		1, 1, 110, 110,
		561, 1, 110, 110,
		673, 1, 110, 110,
		785, 1, 110, 110,
		897, 1, 110, 110,
		1009, 1, 110, 110,
		113, 1, 110, 110,
		225, 1, 110, 110,
		337, 1, 110, 110,
		449, 1, 110, 110,
	]
}
const PlayBall=()=>{
	return (props)=>{
		return (<BaseMove
			width={110}
			height={110}
			x={3514}
			frameRate={10}
			y={2296}
			bgurl="./res/move/playball.png"
			animations={animations} {...props}/>)
	}
}
export default PlayBall()