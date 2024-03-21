import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"

export const Contador=()=>{

    const [cont,setcont]=useState(0)

    return(
        <View>
            <Text style={estilo.texto}>Hola soy el componente...</Text>
            <Button title="Incremento" onPress={()=>setcont(cont+1)} />
            <Text style={estilo.texto}>Contador : {cont} </Text>
            <Button title="Decremento" onPress={()=> setcont(cont-1)}/>
            <TextInput placeholder="Valor" onChangeText={(x)=>setcont( parseInt(x) )}/>
        </View>
    )
}

const estilo= StyleSheet.create({
    texto:{
        fontSize:30
    }
})