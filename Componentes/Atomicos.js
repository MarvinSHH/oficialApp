import {Pressable,Image,Text, View} from 'react-native'
import { estilos } from './Estilos'

export const Boton=({texto,logo,accion,colorA='#995599',colorB='#004470'})=>{
    return(
      <Pressable
        style={({pressed})=>[{
          backgroundColor:pressed?colorB:colorA,
          margin: pressed?10:5
        },estilos.boton]}
        onPress={accion}
        >
        <Image 
        style={estilos.logoB}
        source={logo}
        />
        <Text style={estilos.textoB} >{texto}</Text>
      </Pressable>
    )
  }

  export const Caja=({valor})=>{
    return(
        <View style={estilos.boxContainer}>
            <Text style={estilos.TextBox}>{valor}</Text>
        </View>
    )
  }