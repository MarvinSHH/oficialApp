import { View, Text, Alert, ActivityIndicator, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const Clima = () => {
    const [data,setData]=useState(null)
    const [load,setLoad]=useState(false)

    useEffect(()=>{
        fetch('https://api.weatherapi.com/v1/forecast.json?key=5a492ff34efa492b91a172441211110%20&q=huejutla&days=10&aqi=no&alerts=no&lang=es')
        .then(res=>res.json())
        .then(obj=>{
            setData(obj)
            setLoad(true)
        })
        .catch(err=>Alert.alert('Error inesperado : '+err))
    },[])

    const Card=({fecha,iko,min,max})=>{
        return(
            <View style={{flexDirection:'row'}}>
                <Text>{fecha} </Text>
                <Image style={{height:50,width:50}}
                source={{uri:'https:'+iko}}/>
                <Text> {max}°C </Text>
                <Text> {min}°C </Text>
            </View>

        )
    }

    const LScreen=()=>{
        return(
            <View>
                <Text>{data.location.name}</Text>
                <Text>{data.current.temp_c}°C</Text>
                <Text>{data.current.condition.text} *
                max {data.forecast.forecastday[0].day.maxtemp_c} °C 
                min {data.forecast.forecastday[0].day.mintemp_c} °C </Text>

                <FlatList
                data={data.forecast.forecastday}
                renderItem={({item})=><Card fecha={item.date}
                iko={item.day.condition.icon}
                max={item.day.maxtemp_c}
                min={item.day.mintemp_c}/> }/>
            </View>
        )
    }

    const Uscreen=()=>{
        return(
            <View>
                <ActivityIndicator size={'large'} color={'darkblue'}/>
                <Text>Cargando datos...</Text>
            </View>
        )
    }

  return (
    <View>
      <Text>Clima</Text>
      {load?LScreen():Uscreen()}
    </View>
  )
}

export default Clima