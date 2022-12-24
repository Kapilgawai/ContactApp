import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaPen, FaTrashAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContactCard = ({contact, onOpen, getContactId, deleteContact }) => {


const updateHandler = (id) => {
  getContactId(id);
  onOpen();

};

const deleteContactHandler = (id)=>{
  deleteContact (id);
};



return (

<Flex bg={"blue.300"} p={"4"} borderRadius={"xl"} justify={"space-between"} boxShadow={"xl"}

mb={"4"}
>


<Link to={`/contact/${contact.id}`}>

<Flex align={"center"}>
    <Box mr={"4"}>
    <FaUserAlt size={"30"}
   
    />
    </Box>
    <Stack>
    
    <Text>
    
    {contact.name}
    </Text>
    <Text>
    {contact.email}
      </Text>
    
    </Stack>
    </Flex>

</Link>

    
    
    
    
    <Flex align={"center"}
    justifySelf={"flex-end"}
    >
      <Box mr={"4"}>


      <Box mr={"4"} onClick={()=>updateHandler(contact.id)} cursor={"pointer"}>

        <FaPen size={"22"}/>
        </Box>
      
      
    
      </Box >
      <Box color={"red.500"}  onClick={()=>deleteContactHandler(contact.id)} cursor={"pointer"}  >
      <FaTrashAlt size={"25"}/>

      </Box>
    
    </Flex>
    <Box>

        
    </Box>
    
    
    </Flex>

);
};

export default ContactCard;