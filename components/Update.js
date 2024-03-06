import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, update, get } from 'firebase/database';

const Forms=({route, navigation })=>{
    const [username, setuserName]=useState('');
    const [fatherName, setfatherName]=useState('');
    const [motherName, setmotherName]=useState('');
    const [designation, setDesignation]=useState('');
    const [userData, setUserdata]=useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError]=useState(true);
    const userID=route.params.key;
  
    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + userID);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setuserName(data.name); // Set initial state
                setfatherName(data.fatherName);
                setmotherName(data.motherName);
                setDesignation(data.designation);
            } else {
                console.warn('No data available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [userID]);
    const handleUpdate=()=>{
        const db=getDatabase();
        const updates={};
        if(username!=""&&fatherName!=""&&motherName!=""&&designation!="")
        {
        updates['users/'+userID+'/name']=username;
        updates['users/'+userID+'/fatherName']=fatherName;
        updates['users/'+userID+'/motherName']=motherName;
        updates['users/'+userID+'/designation']=designation;
        update(ref(db), updates).then(()=>{
            setModalVisible(true);
        }).catch((error)=>{
            console.error(error);
        });
        } else{
            setError(false);
          }
    };
    return (
        <View style={{padding:10}}>
             <Modal animationType='fade' transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert("Modal has been closed."); setModalVisible(!modalVisible);}}>
              <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(52, 52, 52, 0.8)', height:'100%'}}>
                <View style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',backgroundColor:'#F3F8FF', height:200, width:200, borderRadius:15}}>
                <Image source={require('../assets/Success.gif')} resizeMode='center' style={{ height:100, width:100 }} />
                  <Text style={{color:'black', fontSize:20, fontWeight:'bold', marginBottom:12}}>Data Updated</Text>
                  <TouchableOpacity style={{backgroundColor:'#864AF9', width:100, height:40, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:10}}  onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Ok</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Text style={{padding:20, fontSize:30, fontWeight:'bold', textAlign:'center', marginTop:20}}>Update Data</Text>
            <TextInput value={username} onChangeText={setuserName}  style={{borderWidth:1, borderColor:error?'grey':'red', paddingLeft:5, borderRadius:5, height:50, fontSize:20}}></TextInput>
            <TextInput value={fatherName} onChangeText={setfatherName}  style={{borderWidth:1, borderColor:error?'grey':'red', paddingLeft:5, borderRadius:5, height:50, fontSize:20, marginTop:15}}></TextInput>
            <TextInput value={motherName} onChangeText={setmotherName}  style={{borderWidth:1, borderColor:error?'grey':'red', paddingLeft:5, borderRadius:5, height:50, fontSize:20, marginTop:15}}></TextInput>
            <TextInput value={designation} onChangeText={setDesignation}  style={{borderWidth:1, borderColor:error?'grey':'red', paddingLeft:5, borderRadius:5, height:50, fontSize:20 , marginTop:15}}></TextInput>
            <TouchableOpacity onPress={handleUpdate} style={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#864AF9' , marginTop:30, borderRadius:20 , height:50}}>
               <Text style={{textAlign:'center', color:'white', fontSize:20, fontWeight:'bold'}}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.goBack();}} style={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#FF004D' , marginTop:30, borderRadius:20 , height:50}}>
               <Text style={{textAlign:'center', color:'white', fontSize:20, fontWeight:'bold'}}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};
export default Forms;