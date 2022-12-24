import { Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaPen, FaTrashAlt, FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getContactById } from "./network";
import {getContactById} from "./network";

const Contact = () =>{

const [contact,setContact] = useState();


const params = useParams();

useEffect(()=>{


const fetchContact = async () => {
 const data =   await getContactById(params.id);

 setContact(data);

};

fetchContact();

},[])

return (

<>
{contact && <Flex m={"4"} bg={"blue.300"} p={"4"} borderRadius={"xl"} justify={"space-between"} boxShadow={"xl"}

mb={"4"}
>
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
    
    
    
    
    
    </Flex>}

</>


);


};

export default Contact;