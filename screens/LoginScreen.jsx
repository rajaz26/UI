import { StyleSheet, Text, TouchableOpacity, View,Image, TextInput} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionic from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/theme/index.js';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex:1,marginTop:10}}>
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
          <TouchableOpacity style={styles.arrowLeftContainer} onPress={()=> navigation.goBack()}>
            <Ionic size={24} style={{right:5}}color={COLORS.primary} name ='chevron-back-outline'/>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image  style={styles.imageStyle} source={require('../assets/images/login.png')}/>
        </View>
       
      </SafeAreaView>
      <View style={styles.formContainer}> 
       <View style={styles.form}>
        <Text style={styles.formText}>Email Address</Text>
        <TextInput style={styles.formInput}/>
        <Text style={styles.formText}>Password</Text>
        <TextInput secureTextEntry style={[styles.formInput, styles.passwordInput]} />
        <Text style={styles.forgetText}>Forget Password ?</Text>
       </View>
       <View style={styles.loginButtonContainer}>
       <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
       </TouchableOpacity>
       </View >
       <View style={styles.orContainer}>
        <Text style={styles.orText}>Or</Text>
       </View>
        <View style={styles.logosContainer}>
          <TouchableOpacity style={styles.socialIcons}><Image style={styles.icon} source={require("../assets/icons/google.png")}/></TouchableOpacity>
          <TouchableOpacity style={styles.socialIcons}><Image style={styles.icon} source={require("../assets/icons/apple.png")}/></TouchableOpacity>
          <TouchableOpacity style={styles.socialIcons}><Image style={styles.icon} source={require("../assets/icons/facebook.png")}/></TouchableOpacity>
        </View>
        <View style={styles.noAccountContainer}>
          <Text style={{color:'black', fontFamily:'Poppins-Regular',fontSize:13}}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
            <Text style={{color:'#ffc200', marginLeft:5,fontWeight:'500', fontFamily:'Poppins-Medium',fontSize:13}}>Sign Up</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#044244',
  },
  arrowLeftContainer:{
    padding: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor:'#FFD700',
  },
  imageContainer:{
    justifyContent:'flex-start'
    ,alignItems:'center', 
    marginTop:15,
  },
  imageStyle:{
    height:170,width:170
  },
  formContainer:{
    flex:1.8,
    backgroundColor:'white',
    padding:8,
    borderTopRightRadius:50,
    borderTopLeftRadius:50
  },
  form:{
    paddingTop:30,
    paddingHorizontal:30,
    paddingBottom:20,
  },
  formText:{
    color:'black',
    marginBottom:5,
    fontFamily:'Poppins-Regular',
    fontSize:13.5,
  },
  formInput:{
    height:45,
    backgroundColor:'rgba(180, 180, 180,0.4)',
    borderRadius:10,
    marginBottom:12,
    paddingLeft:10,
    bottom:3,
    color:'black'
},
passwordInput: {
  marginBottom: 5, 
},
forgetText:{
  textAlign:'right',
  color:'black',
  fontFamily:'Poppins-Regular',
  fontSize:13,
  color:COLORS.primary,
},
loginButtonContainer:{
  flex:0,
  alignItems:'center',
},
loginButton:{
  justifyContent: 'center',
  alignItems: 'center',
  height: 46,
  backgroundColor: '#FFD700',
  width: '85%',
  marginHorizontal:20,
  borderRadius: 13,
},
loginText:{
  fontSize:16,
  fontFamily:'Poppins-Medium',
  top:2,
  color:'#044244',
},
orContainer:{
  flex:0,
  alignItems:'center',
  marginTop:14,
  marginBottom:14,

},
orText:{
  fontSize:20,
  fontFamily:'Poppins-Medium',
  color:'black',
  top:1,
},
logosContainer:{
  flex:0,
  flexDirection:'row',
  justifyContent:'space-evenly',
  alignItems:'center',
  marginBottom:20,
},
socialIcons:{
  padding:6,
  backgroundColor:'rgba(180, 180, 180,0.3)',
  borderRadius:10,
},
icon:{
  height:36,
  width:36
},
noAccountContainer:{
  flexDirection:'row',
  justifyContent:'center',
}
})