// container is similar to div
import {Button,Box,Container,VStack, Input, HStack} from "@chakra-ui/react"
import Message from "./Component/Message";
function App() {
  return (
   <Box  bg={"red.50"}>
    <Container bg={"white"} h={"100vh"}>

      {/* Display:flex  flex-direction:column*/}
    <VStack  h={"full"} paddingY={"4"}>

      <Button  colorScheme="red" w={"full"}>Logout</Button>
      {/* Message holder */}

      <VStack  h={"full"} w={"full"}>
     <Message  text={"sample one"}/>
      
      </VStack>
      {/* form */}

      <form   style={{width:"100%"}}>
      <HStack>
      <Input placeholder="Enter a Message...." colorScheme="white" w={"full"}></Input>
      <Button type="submit" colorScheme="purple">Send</Button>
      
      </HStack>
      </form>
      
    </VStack>
    
    </Container>

   </Box>
  );
}

export default App;
