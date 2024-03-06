import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getDatabase, ref, onValue, off, remove } from "firebase/database";

const Datalist = ({ navigation }) => {
  const [nodata, setnodata]=useState(false);
  const [data, setData] = useState({});
  const deleterow=(key)=>{
    const db = getDatabase();
    const itemRef = ref(db, 'users/' + key);
    remove(itemRef)
        .then(() => {
            console.log('Data removed successfully');
            setData((prevData) => {
              const newData = { ...prevData };
              delete newData[key];
              return newData;
            });
        })
        .catch((error) => {
            console.error('Failed to remove data', error);
        });
  }
  useEffect(() => {
    const db = getDatabase();
    const dataRef = ref(db, "users/");
    onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        setnodata(false);
        setData(snapshot.val());
      } else {
        setnodata(true);
      }
    });

    return () => {
      off(dataRef, "value");
    };
  }, []);

  return (
    <View style={{padding:10, height:'100%'}}>
    <StatusBar style="auto" />
     <Text style={{padding:20, fontSize:30, fontWeight:'bold', textAlign:'center' , marginTop:20}}>CRUD Application</Text>
     <TouchableOpacity onPress={()=>{navigation.navigate('Create')}} style={{display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#864AF9' , marginTop:30, marginBottom:30, borderRadius:20 , height:50}}>
     <Text style={{textAlign:'center', color:'white', fontSize:20, fontWeight:'bold'}}>Create Data</Text>
     </TouchableOpacity>
     <ScrollView>
       <Text style={{textAlign:'center'}}>{nodata == true ? "No data available" : ""}</Text>
       {Object.entries(data).map(([key, value])=>(
         <View key={key} style={styles.row}>
            <View>
              <Text style={[{fontWeight:'bold', fontSize:20},styles.cell]}>Name - {value.name}</Text>
              <Text style={styles.cell}>Designation - {value.designation}</Text>
              <Text style={styles.cell}>Father Name - {value.fatherName}</Text>
              <Text style={styles.cell}>Mother Name - {value.motherName}</Text>
            </View>
              <View style={{flexDirection:'row', position:'absolute', right:10, top:25}}>
                <TouchableOpacity onPress={()=>{deleterow(key)}} ><FontAwesomeIcon icon={ faTrash }  /></TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Update',{key})}}><FontAwesomeIcon icon={ faPen } style={{marginLeft:10}} /></TouchableOpacity>
              </View>
            </View>
       ))}
     </ScrollView>
   
 </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // Changed from 'col' to 'row'
    marginBottom: 5,
    borderBottomWidth: 1,
  },
  cell: {
    padding: 5,
  },
});

export default Datalist;
