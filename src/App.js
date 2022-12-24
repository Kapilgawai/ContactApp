import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Stack, Text, useDisclosure, useMenuState } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import ContactCard from "./component/ContactCard";
import {addContactOnServer, getAllContacts, updateContactOnServer, deleteContactOnServer} from "./network";
import Kmodal from "./component1/Kmodal";
import ContactForm from "./ContactForm/ContactForm";
import { Link } from "react-router-dom";




const App = ()=>{
  const { isOpen, onOpen, onClose } = useDisclosure();




  const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();
 const [searchData, setSearchData] = useState("");
 


const [contacts,setContacts] = useState ([













]);



const [contactId, setContactsId] = useState();




useEffect(()=>{

  const fetchContacts = async () =>{
  
   const data = await getAllContacts();
  
const tempArray = [];


if (data !== null){

  Object.entries(data).forEach(([key,value]) => {

    tempArray.push({id:key,name:value.name, email:value.email});

  });


}

 
  

setContacts(tempArray);

  };
  fetchContacts();
  
  }, []);

//to add new contact

const addNewContact = async (name, email) =>{


 if(contacts.findIndex((contact)=>contact.email===email)=== -1 && email !=="")

{
 const data =  await addContactOnServer (name,email);


    setContacts([...contacts,{name, email, id: data.name}]);

  
}


};


let searchContacts = contacts.filter((contact)=> contact.name.includes(searchData));

const getContactId = (id)=> {

setContactsId(id);

};



const updateContact = async (name,email,id) =>{

 const data = await updateContactOnServer(name,email,id);


 setContacts((prev) => [
   ...contacts.filter((contact)=> contact.id !== id), 
   {name:data.name, email:data.email, id}
  ] );


};


const deleteContact = async (id)=>{

const data = await deleteContactOnServer(id);

if (data === null){
 
  setContacts((prev) => [
    ...contacts.filter((contact)=> contact.id !== id) 
   
   ] );

}



};






let selectContact = contacts.find((contact)=>contact.id === contactId);






  return ( 

<>  
<Kmodal 

isOpen={isOpen}

title={"ADD NEW CONTACT"}

onOpen={onOpen} 

onClose={onClose}>
  
  <ContactForm  addNewContact={addNewContact} onClose={onClose}/>

   </Kmodal>



   <Kmodal 

isOpen={isOpenEdit}

title={"ADD NEW CONTACT"}

onOpen={onOpenEdit} 

onClose={onCloseEdit}>
  
  <ContactForm 
  
  updateContact={updateContact}

  
  contact={selectContact}

 addNewContact={addNewContact} onClose={onCloseEdit}/>

   </Kmodal>


 

<Box>

<Flex p={"4"} justify={"center"} align={"center"}>

<img src="/pngegg.png" height={"100px"} width="150px"/>
<Heading as={"h1"} textTransform="uppercase">contact manager</Heading>
</Flex>

<Box padding={"4"}>

<Button onClick={onOpen} bg={"blue.100"} 
color={"black"}
colorScheme={"blue"}

w={"full"}
 fontSize={"lx"}
  fontWeight={"bold"}> 
  <FaUserPlus height={"20px"} width={"20px"}
   mr={"4"}


  
   
   />   ADD CONTACT</Button>


</Box>

<Box p={"4"}>

<InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<search2Icon color='gray.500' />
    }
    />
    <Box>
      
    <Input type='tel' placeholder='search contact' 
    
    onChange={(e)=> setSearchData(e.target.value)}
    />

    </Box>
    
  </InputGroup>

</Box>
<Box p={"4"}>
{searchContacts.map((contact)=> (

  
  
  <ContactCard 
getContactId ={getContactId}

 onOpen = {onOpenEdit} 
 contact = {contact} 
 key={contact.id}

 deleteContact ={deleteContact}
 
 

 />
  
  



)
)};



</Box>
  </Box> 

</>

  );
};


export default App;




//<></> fragment