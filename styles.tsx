import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    input: {
      flex: 2,
      height: 40,
      marginHorizontal: 20,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    label: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
      height: 40,
      marginBottom: 20,
    },
    button: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#007AFF',
      borderRadius: 30,
      margin: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      width: '100%',
    },
    blueLine: {
      height: 2,
      backgroundColor: '#007AFF',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menu: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 5,
      elevation: 5,
    },
    menuItem: {
      paddingVertical: 10,
      fontSize: 16,
    },
    closeButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 10,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    menuItemButton: {
      paddingVertical: 10,
    },
    menuItemText: {
      fontSize: 16,
    },
  });

  export default styles