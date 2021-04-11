import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 

  },

  logo: {
    margin:30,
  },

  picker: {
    margin: 25,
    width:190
  },

  inputView:{
    borderRadius:2,
    borderWidth:1,
    borderColor: "rgb(30, 50, 120)",
    height:10,
    width: 190,
    marginBottom:20,
    justifyContent:"center",
    padding:10
  },
 
  inputText:{
    height:50,
    color:"black"
  },

  partDropdown: {
    padding: 20
  },
  partPiker: {
    width: 150,
  },
  checkBox: {
    paddingRight: 15,
    paddingLeft: 20
  },

  loginBtn:{
    width:"20%",
    backgroundColor:"rgb(224, 35, 68)",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"black"
  }
  


})