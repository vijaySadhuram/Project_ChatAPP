// container is similar to div
import { Button, Box, Container, VStack, Input, HStack } from "@chakra-ui/react"
import Message from "./Component/Message"
import {onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { app } from "./Firebase"
import { useState ,useEffect,useRef} from "react"
import {getFirestore,addDoc, collection, serverTimestamp,onSnapshot,query,orderBy} from "firebase/firestore"

const auth = getAuth(app);
const database=getFirestore(app);





// login Handler function
const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
}
// logout hander function
const logoutHandler=()=>{
  signOut(auth);
}
function App() {

  // sort the messages


  const [user, setUser] = useState(false);
  const [message,setmessage]=useState("");
  const [messages,setMessages]=useState([]);
  const divForScrollBar=useRef(null);


  const submitHandler=async (e)=>{
    e.preventDefault();
   try {
    await addDoc(collection(database,"Messagess"),{
      text:message,
      uid: user.uid,
      uri:user.photoURL,
      createdAt:serverTimestamp()
    });
    setmessage("");
    divForScrollBar.current.scrollIntoView({behavior:"smooth"});

   } catch (error) {

    alert(error)
    
   }
  
  }

  useEffect(() => {
    const quer=query(collection(database,"Messagess"),orderBy("createdAt","asc"))
const unsubsribe  = onAuthStateChanged(auth,(data)=>{
      
      setUser(data);  
    });
    const unsubscribebeformessage= onSnapshot(quer,(snap)=>{
     setMessages(snap.docs.map((item)=>{
      const id=item.id;
      return {id,...item.data()};
     }));
      });
  
    return()=>{
      unsubsribe();
      unsubscribebeformessage();
    }
  },[]);

  
  return (
    <Box bg={"red.50"}>
      {
        user ? (
          <Container bg={"white"} h={"100vh"}>

            {/* Display:flex  flex-direction:column*/}
            <VStack h={"full"} paddingY={"4"}>

              <Button onClick={logoutHandler} colorScheme="red" w={"full"}>Logout</Button>
              {/* Message holder */}

              <VStack h={"full"} w={"full"} overflowY={"auto"}   css={{"&::-webkit-scrollbar":{
                display:"none",
              }}} >
                {
                messages.map(item=>(

              <Message 
              key={item.id}
              text={item.text} uri={item.uri} user={item.uid===user.uid?"me" : "other"} />
              ))
                }

<div ref={divForScrollBar}></div>
              </VStack>
              {/* form */}
             

              <form style={{ width: "100%" }}   onSubmit={submitHandler}>
                <HStack>
                  <Input value={message} onChange={(e)=>setmessage(e.target.value)} placeholder="Enter a Message...." colorScheme="white" w={"full"}></Input>
                  <Button type="submit" colorScheme="purple">Send</Button>

                </HStack>
              </form>

            </VStack>

          </Container>

        ) :
          (<VStack alignItems={"center"} h={"100vh"} justifyContent={"center"}>
            <Button colorScheme="blue" onClick={loginHandler}>Sign In With Google</Button>
          </VStack>
          )
      }
    </Box>
  );
}

export default App;
