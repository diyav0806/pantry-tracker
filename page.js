
'use client';
import Image from "next/image";
import {useState, useEffect} from 'react';
import {firestore} from '@/firebase';
import { Box } from '@mui/material';
import { query } from 'firebase/firestore';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
      ...doc.data(),
    })

      })
    setInventory(inventoryList)
      
  }

  const removeItem = async (item) =>{
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef); 

    if(docSnap.exist()){
      const {quantity} = docSnap.data()
  }

  useEffect(() => {
    updateInventory()
  }, []
)


  return (
    <Box>
      <Typography variant = "h1">Inventory Management</Typography>
      {
        inventory.forEach((item)=>{
          return(
          <>
            {item.name}
            {item.count}
          </>)
        })
      }
    </Box>
  )

}
