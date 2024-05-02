import Matter from 'matter-js';
import React from 'react';
import { View, Image } from 'react-native';

const Obstacle = props => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <View
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        overflow: 'hidden', 
        borderRadius: 10, 
      }}>
      {/* Render the obstacle image */}
      <Image
        source={require('../assets/tile24.png')} 
        style={{ flex: 1, width: '100%', height: '100%', borderRadius: 10 }} 
        resizeMode="cover"
      />
    </View>
  );
};

export default (world, label, color, pos, size) => {
  const { width, height } = size;
  const cornerRadius = 10; 

 
  const adjustedWidth = width - 2 * cornerRadius;
  const adjustedHeight = height - 2 * cornerRadius;

  
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x, 
    pos.y, 
    adjustedWidth, 
    adjustedHeight, 
    {
      label,
      isStatic: true,
      chamfer: { radius: cornerRadius } 
    }
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
};
