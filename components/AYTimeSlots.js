import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import AYTimeSlot from './AYTimeSlot';
export default class AYTimeSlots extends React.Component{

    slotsSelected = [];
    slots;
    
    constructor(props){
        super(props);
        
    }

    addSlot(id){
        let index = this.slotsSelected.indexOf(id);
        if(index == -1){
            this.slotsSelected.push(id);
        }
        this.props.onChange(this.slotsSelected);
    }

    removeSlot(id){
        let index = this.slotsSelected.indexOf(id);
        if(index > -1){
            this.slotsSelected.splice(index, 1);
        }
        this.props.onChange(this.slotsSelected);
    }

    render(){
        return (
            <View>
                {Object.keys(this.props.slots).length == 0 && !this.props.loading? 
                    <Text style={{textAlign:"center"}}>
                    Por el momento no hay horarios disponibles de entrega, puede continuar con el proceso y 
                    se contactarán con usted para definir el horario de entrega.</Text>: undefined
                }
                { Object.keys(this.props.slots).map((horario, i)=>{
                    return (
                        <View key={i}>
                            <Text>{horario}</Text>
                            <View style={{flex:1, flexDirection:'row', flexWrap: 'wrap'}}>
    
                                    {this.props.slots[horario].map((slot, i)=>{
                                        return (
                                            <AYTimeSlot 
                                                key={i} 
                                                label={slot.obs}
                                                id={slot.id}
                                                onActivate={(id)=>{ this.addSlot(id); }}
                                                onDeactivate={(id)=>{ this.removeSlot(id); }}
                                            />
                                        );
                                    })}
                                    
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }

}