'use client'
import Image from "next/image";
import { useState,useEffect } from "react";
import {firestore} from "@/firebase";
import { Box, Button, Modal, Stack, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { collection, deleteDoc, doc, getDocs, query, setDoc, getDoc} from "firebase/firestore";
import SearchIcon from '@mui/icons-material/Search';
import { LocalDining } from "@mui/icons-material";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [search, setSearch] = useState('');

  // By doing this we prevent the website from freezing while fetching data ("async")
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    const {quantity} = docSnap.data()
    if(quantity === 1) {
      await deleteDoc(docRef)
    }
    else{
      await setDoc(docRef, {quantity: quantity - 1})    
    }
  }

  await updateInventory()
}

const addItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    const {quantity} = docSnap.data()
    await setDoc(docRef, {quantity: quantity + 1})    
  }
  else {
    await setDoc(docRef, {quantity: 1})
  }

  await updateInventory()
}

  useEffect(()=> {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundImage: 'url(https://i.imgur.com/LFLs6z4.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1, // This makes sure the image is behind other components
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#333', // Header background color
          padding: '10px 20px',
        }}
      >
        {/* Logo/Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalDining sx={{ color: '#8A9A5B' }}/>
          <Typography variant="h6" sx={{ ml: 1, color: '#8A9A5B' }}>
            Pantry Tracker
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ width: 300 }}>
          <TextField
            variant="outlined"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#8A9A5B' }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slightly transparent background
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)', // Change background on focus
                  // boxShadow: '0 0 5px #8A9A5B', // Optional: add a shadow to indicate focus
                  borderColor: '#8A9A5B', // Optional: change border color on focus
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.3)', // Border color when not focused
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#8A9A5B', // Border color when focused
                },
              },
              
            }}
          />
        </Box>
      </Box>
    <Box 
      width="100wh" 
      height="100vh" 
      display="flex"
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      gap={2}
    >
      <Modal open={open} onClose={handleClose}> 
        <Box
          position="absolute" 
          top="50%"
          left="50%"
          width={400}
          bgcolor="#333"
          border="2px solid #000"
          boxShadow={24}
          p={4} //padding
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography 
          variant="h6" 
          sx={{
            color: '#ffff', // Replace with your desired text color
          }}
          > Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}> 

            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value) 
              }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ffff', // Text color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#070205', // Border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#8A9A5B', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8A9A5B', // Border color when focused
                  },
                },
              }}
            />

            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
              sx={{
                borderColor: '#8A9A5B', // Color for the button border
                color: '#8A9A5B', // Color for the button text
                '&:hover': {
                  borderColor: '#8A9A5B', // Background color on hover
                  color: '#8A9A5B', // Text color on hover
                  },
              }}    
            > Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button 
        variant="contained"
        sx={{
          backgroundColor: '#333', // Color for the button border
          color: '#8A9A5B', // Color for the button text
          '&:hover': {
          backgroundColor: '#8A9A5B', // Background color on hover
          color: '#333', // Text color on hover
          },
        }}  
        onClick={() => {
        handleOpen()
      }}> 
      Add New Item
      </Button>


      <Box border="1px solid #8A9A5B">
        <Box
          width="800px"
          height="100px"
          bgcolor="#333"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" color="#8A9A5B">
            Inventory Items 
          </Typography>
        </Box>
      <Stack width="800px" height="300px"  overflow="auto"> 
        { inventory
          .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
          .map(({name, quantity}) => (
            <Box 
              key={name} 
              width="100%" 
              minHeight="150px" 
              display="flex" 
              alignItems="center" 
              justifyContent="space-between"
              bgcolor="#333"
              padding={5}
            > 
              <Typography variant="h3" color="#8A9A5B" textAlign="center"> 
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#8A9A5B" textAlign="center"> 
                {quantity}
              </Typography>

              <Stack direction="row" spacing={2}> 
              <Button 
                variant="outlined" 
                sx={{
                  borderColor: '#8A9A5B', // Color for the button border
                  color: '#8A9A5B', // Color for the button text
                  '&:hover': {
                  borderColor: '#ffff', // Background color on hover
                  color: '#8A9A5B', // Text color on hover
                  },
                }} 
                onClick={() => {
                  addItem(name)
              }}> 
                Add
              </Button>   
              <Button 
                variant="outlined"
                sx={{
                  borderColor: '#8A9A5B', // Color for the button border
                  color: '#8A9A5B', // Color for the button text
                  '&:hover': {
                    borderColor: '#ffff', // Background color on hover
                    color: '#8A9A5B', // Text color on hover
                    },
                }} 
                onClick={() => {
                  removeItem(name)
              }}> 
                Remove 
              </Button>
              </Stack>
            </Box>                                    
          ))
        }
        </Stack>
      </Box>
    </Box>
    </Box>
  )
}
