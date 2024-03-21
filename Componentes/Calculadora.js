import {View } from 'react-native'
import React from 'react'
import { Boton, Caja } from './Atomicos'
import { estilos } from './Estilos'

export const Calculadora = () => {
  return (
    <View>
      <View>
        <Caja valor={'55'}/>
      </View>
      <View style={estilos.botonescontainer}>
        <Boton texto={' % '}/>
        <Boton texto={'ce'}/>
        <Boton texto={' c '}/>
        <Boton texto={'<-'}/>
        <Boton texto={'1/x'}/>
        <Boton texto={'x² '}/>
        <Boton texto={' R '}/>
        <Boton texto={' / '}/>
        <Boton texto={' 7 '}/>
        <Boton texto={' 8 '}/>
        <Boton texto={' 9 '}/>
        <Boton texto={' * '}/>
        <Boton texto={' 4 '}/>
        <Boton texto={' 5 '}/>
        <Boton texto={' 6 '}/>
        <Boton texto={' - '}/>
        <Boton texto={' 1 '}/>
        <Boton texto={' 2 '}/>
        <Boton texto={' 3 '}/>
        <Boton texto={' + '}/>
        <Boton texto={'+/-'}/>
        <Boton texto={' 0 '}/>
        <Boton texto={' . '}/>
        <Boton texto={' = '}/>
      </View>
    </View>
  )
}


