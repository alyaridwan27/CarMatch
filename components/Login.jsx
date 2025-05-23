import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from './../constants/Colors'
import {useNavigation, useRouter} from 'expo-router'

export default function Login() {
    const navgation=useNavigation();
    useEffect(()=>{
        navgation.setOptions({
          headerShown:false
        })
      },[]);
    const router=useRouter();
  return (
    <View>
      <Image source={require('../assets/images/landing page.png')} 
      style={{ 
        width:'100%', 
        height: 650 }} />
        <View style={styles.container}>
        <Text style={{
            fontSize:25,
            fontFamily:'outfit-bold',
            textAlign:'center',
            marginTop:10
        }}>CarMatch</Text>

        <Text style={{
            fontFamily:'outfit',
            fontSize:17,
            textAlign:'center',
            color:Colors.GRAY,
            marginTop:20
        }}>With our app, you can now easily buy and sell cars</Text>

        <TouchableOpacity style={styles.button}
            onPress={()=>router.push('auth/sign-in')}
        >
            <Text style={{color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit',
                fontSize:17
            }}>Get Started</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:'100%',
        padding:25
    },
    button:{
        padding:15,
        backgroundColor:Colors.primary,
        borderRadius:99,
        marginTop:'10%'
    }
})