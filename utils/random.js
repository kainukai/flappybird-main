import {Dimensions} from "react-native"

const windowHeight = Dimensions.get("window").height
const windowWidht = Dimensions.get("window").width

export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max -min +1) + min)
}
export const getPipeSizePosPair =(addToPosX = 0) => {
    let yPosTop = -getRandom (300, windowHeight - 100 )

    const pipeTop ={pos :{x: windowWidht + addToPosX, y:yPosTop }, size: {height: windowHeight * 2, width:75 } }
    const pipeBottom ={pos :{x: windowWidht + addToPosX, y: windowHeight * 2 + 200 + yPosTop }, size: {height: windowHeight * 2, width:75 } }

    return { pipeTop, pipeBottom}

}