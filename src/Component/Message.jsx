import React from 'react'
import {HStack,Avatar,Text} from "@chakra-ui/react"

const 
message = ({text,uri}) => {
  return (
    <HStack>
        <Text>
            {text}
        </Text>
        <Avatar src={uri}></Avatar>
    </HStack>
  )
}

export default 
message