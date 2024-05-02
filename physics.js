import Matter from "matter-js";
import { getPipeSizePosPair } from "./utils/random";
import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  
  touches
    .filter((t) => t.type === "press")
    .forEach((t) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -5,
      });
    });

 
  Matter.Engine.update(engine, time.delta);

  
  for (let index = 1; index <= 2; index++) {
    if (
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${index}`].point
    ) {
      entities[`ObstacleTop${index}`].point = true;
      dispatch({ type: "new_point" });
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);
      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      );
      entities[`ObstacleTop${index}`].point = false;
    }

    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
      x: -3,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -3,
      y: 0,
    });

// Check if the clouds have hit the screen border
if (entities[`Clouds${index}`]) {
  const cloudBody = entities[`Clouds${index}`].body;
  if (cloudBody.bounds.min.x <= -cloudBody.width) {
    // Set a timer to remove the clouds after they hit the left screen border
    setTimeout(() => {
      Matter.World.remove(engine.world, cloudBody);
      delete entities[`Clouds${index}`];
    }, POP_DELAY);
  }
}

  }

  // Handle collisions
  Matter.Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;

    pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      // Check if either body is the Bird or a Cloud
      if (bodyA.label === "Bird" && bodyB.label.startsWith("Cloud")) {
        // Handle collision with clouds (if needed)
      } else if (bodyB.label === "Bird" && bodyA.label.startsWith("Cloud")) {
        // Handle collision with clouds (if needed)
      } else if (bodyA.label === "Bird" || bodyB.label === "Bird") {
        // Handle collision with obstacles or other entities
        dispatch({ type: "game_over" });
      }
    });
  });

  // Update cloud positions
  for (let index = 1; index <= 4; index++) {
    const cloudEntity = entities[`Clouds${index}`]; 
    if (cloudEntity) {
      const cloudBody = cloudEntity.body;
      // Move clouds horizontally with a constant velocity
      Matter.Body.translate(cloudBody, { x: -1, y: 0 });

      
      const cloudOpacity = Math.max(
        0,
        1 - (windowWidth - cloudBody.position.x) / (windowWidth / 2)
      );
      cloudEntity.opacity = cloudOpacity;

// Check if the cloud has moved out of the screen
if (cloudBody.bounds.max.x < 0) {
  // Reset cloud position to the right side of the screen above 300 pixels
  Matter.Body.setPosition(cloudBody, {
    x: windowWidth + cloudBody.bounds.max.x - cloudBody.bounds.min.x,
    y: Math.max(300, Math.random() * windowHeight), // Ensure y-position is above 300 pixels
  });

      }
    }
  }

  return entities;
};

export default Physics;
