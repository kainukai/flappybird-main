import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  pauseButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    
  },
  modalTextone: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    
  }
});

export default styles;
