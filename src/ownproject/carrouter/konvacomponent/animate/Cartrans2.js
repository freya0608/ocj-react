/**
 * Created by admin on 2018/11/26.
 */
import React from 'react';
import BaseMoveReplay from './BaseMoveReplay'
const animations={
	"default": [
		896 ,1237, 296, 245,
		598 ,1237, 296, 245,
		2 ,990, 296, 245,
		598 ,249, 296, 245,
		300 ,249, 296, 245,
		2 ,249, 296, 245,
		896 ,2, 296, 245,
		598 ,2, 296, 245,
		300 ,2, 296, 245,
		2 ,2, 296, 245,
		896 ,990, 296, 245,
		598 ,990, 296, 245,
		300 ,1484, 296, 245,
		300 ,1237, 296, 245,
		300 ,990, 296, 245,
		896 ,743, 296, 245,
		598 ,743, 296, 245,
		300 ,743, 296, 245,
		2 ,1484, 296, 245,
		2 ,1237, 296, 245,
		2 ,743, 296, 245,
		896 ,496, 296, 245,
		598 ,496, 296, 245,
		300 ,496, 296, 245,
		2 ,496, 296, 245,
		896 ,249, 296, 245,
	]
}
const Cartrans0=()=>{
	return (props)=>{
		return (<BaseMoveReplay
			width={296}
			scale={2/3}
			togoframe={animations.default.length/4-1}
			height={245}
			frameRate={10}
			bgurl="./res/effect/bieke.png"
			animations={animations} {...props}/>)
	}
}
export default Cartrans0()