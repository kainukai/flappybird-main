import Matter from "matter-js";
import React from "react";
import { View, Image } from "react-native";

const Clouds = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      pointerEvents="none" // Make the clouds non-interactive
      style={{
        position: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    >
      {/* Render the cloud image */}
      <Image
        source={getImageSource(props.imageIndex)} 
        style={{ flex: 1, width: "100%", height: "80%" }}
        resizeMode="cover"
      />
    </View>
  );
};


const getImageSource = (imageIndex) => {
  switch (imageIndex) {
    case 1:
      return require("../assets/cloud1.png");
    case 2:
      return require("../assets/cloud4.png");
    case 3:
      return require("../assets/cloud3.png");
    case 4:
      return require("../assets/cloud3.png");
    // Add more cases for additional cloud images
    default:
      return require("../assets/cloud1.png");
  }
};

export default (world, label, pos, size, imageIndex) => {
  const initialCloud = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      label,
      isStatic: true,
      isSensor: true, // Make the clouds non-collidable
    }
  );
  Matter.World.add(world, initialCloud);

  return {
    body: initialCloud,
    pos,
    imageIndex,
    renderer: <Clouds imageIndex={imageIndex} />, 
  };
};
