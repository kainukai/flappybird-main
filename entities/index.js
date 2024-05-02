import Matter from "matter-js";
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import Clouds from "../components/Clouds";
import { Text, TouchableOpacity, View, ImageBackground, Alert, Switch, Image } from "react-native";


import { Dimensions } from 'react-native';
import { getPipeSizePosPair } from "../utils/random";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const safeMargin = 100; 

export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0.4;

    const pipeSizePosA = getPipeSizePosPair();
    const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);
    
    return {
        physics: { engine, world },
      
        
       
        Clouds1: Clouds(world, 'Clouds1', { x: windowWidth / 4, y: Math.random() * (windowHeight - safeMargin) + safeMargin / 2 }, { height: 40, width: 80 }, 1),
        Clouds2: Clouds(world, 'Clouds2', { x: windowWidth / 2, y: Math.random() * (windowHeight - safeMargin) + safeMargin / 2 }, { height: 50, width: 120 }, 2),
        Clouds3: Clouds(world, 'Clouds3', { x: windowWidth * 0.75, y: Math.random() * (windowHeight - safeMargin) + safeMargin / 2 }, { height: 50, width: 120 }, 3),
        Clouds4: Clouds(world, 'Clouds4', { x: windowWidth * 1.25, y: Math.random() * (windowHeight - safeMargin) + safeMargin / 2 }, { height: 50, width: 120 }, 4),

        Bird: Bird(world, 'green', { x: 50, y: 300 }, { height: 40, width: 40 }),

        ObstacleTop1: Obstacle(world, 'ObstacleTop1', 'yellow', pipeSizePosA.pipeTop.pos, pipeSizePosA.pipeTop.size),
        ObstacleBottom1: Obstacle(world, 'ObstacleBottom1', 'blue', pipeSizePosA.pipeBottom.pos, pipeSizePosA.pipeBottom.size),

        ObstacleTop2: Obstacle(world, 'ObstacleTop2', 'yellow', pipeSizePosB.pipeTop.pos, pipeSizePosB.pipeTop.size),
        ObstacleBottom2: Obstacle(world, 'ObstacleBottom2', 'blue', pipeSizePosB.pipeBottom.pos, pipeSizePosB.pipeBottom.size),

        Floor: Floor(world, 'green', { x: windowWidth / 2, y: windowHeight * 1 }, { height: 50, width: windowWidth }),

        
    };
    
};

