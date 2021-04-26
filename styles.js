import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 

  },

  logo: {
    margin:30,
  },

  picker: {
    marginTop: 10,
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
  },

    questionPageContainer:{
        width:"100%",
        height:"85%",
        flexDirection:"row",
    },

    questionContainer:{
        width:"70%",
        height:"100%",
    },

    answerContainer:{
        width:"30%",
        height:"100%",
    },

    processBarContainer:{
        width:"18%", 
        height:"100%", 
        flexDirection:"column", 
        alignItems:"center", 
        paddingRight:"8%",
        paddingTop:5
    },

    partAButton:{
        width:"6%",
        height:"85%",
        backgroundColor:"#00205B",
        borderRadius:8,
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    },

    questionSentence:{
        width:"70%", 
        fontSize:"1em", 
        paddingRight:"1%",
        fontSize:"1.5em"
    },

    tickContianer:{
        width:"18%", 
        fontSize:"1em", 
        flexDirection:"row", 
        justifyContent:"space-between",
    },

    tickBox:{
        minWidth:25,
        minHeight:25,
        maxHeight:25,
        maxWidth:25,
        backgroundColor:"white",
        borderColor:"grey",
        borderWidth:2,
        borderRadius:25
    },

    hightlightTickBox:{
        minWidth:25,
        minHeight:25,
        maxHeight:25,
        maxWidth:25,
        backgroundColor:"#00205B",
        borderColor:"grey",
        borderWidth:2,
        borderRadius:25
    },

    item:{
        width:"100%", 
        flexDirection:"row", 
        justifyContent:"space-between", 
        paddingBottom:"2%", 
        paddingLeft:"2%", 
        paddingRight:"2%",
    },

    partABTitleBar:{
        backgroundColor:"white", 
        flexDirection:"row", 
        alignContent:"center", 
        alignItems:"center", 
        height:"10%", 
        width:"100%",
        justifyContent:"space-between", 
        paddingRight:"2%", 
    },

    partABTitleText:{
        color: "#00205B", 
        fontSize: "1.5em", 
        alignContent:"center", 
        alignItems:"center",
        justifyContent:"center",
        paddingLeft:"7%"
    },

    partABTitleYesNo:{
        flexDirection:"row", 
        alignContent:"center", 
        alignItems:"center", 
        width:"17%", 
        justifyContent:"space-between",
    },

    processBarCircle:{
        borderColor:"grey", 
        borderWidth:1, 
        borderRadius:20, 
        width:20, 
        height:20
    },

    processBarPole:{
        width:4, 
        height:"20%", 
        borderColor:"grey", 
        borderWidth:1
    },

    questionnaireButton:{
        width:"35%", 
        height:"100%",
        borderRadius:8, 
        alignContent:"center", 
        alignItems:"center", 
        justifyContent:"center"
    },

    extraInformation: {
        width:"100%",
        height:"20%", 
        alignContent:"center", 
        alignItems:"center", 
        justifyContent:"space-around"
    },

    buttonContainer: {
        width:"20%", 
        height:"35%", 
        flexDirection:"row", 
    },

    titleInfoP1: {
        color: "#707070", 
        fontSize: "3em", 
        fontWeight:"bold", 
        paddingLeft:"4%", 
        alignSelf:"flex-end"
    },

    titleInfoP2: {
        color: "#707070", 
        fontSize: "2em", 
        paddingLeft: "2%", 
        alignSelf:"flex-end", 
        fontWeight:"bold"
    },

    processBarText: {
        position:"absolute", 
        paddingLeft:30, 
        color:"#00205B", 
        top:-10
    },

    scrollBarContainer:{
        width:"2%", 
        alignContent:"center", 
        alignItems:"center", 
        justifyContent:"center"
    },

    scrollBarOutside:{
        width:"40%", 
        height:"95%", 
        borderRadius:8, 
        borderColor:"grey", 
        borderWidth:1
    },

    scrollBarInside:{
        width:"100%",
        borderRadius:8, 
        backgroundColor:"#00205B"
    }



})