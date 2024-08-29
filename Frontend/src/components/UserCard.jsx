import { Box, Button, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const UserCard = ({user, onDelete}) => {
  return (
    <>
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg="white" boxShadow="md">

        <VStack spacing={2} align="start">

            <Text fontWeight="bold">{user.firstName} {user.lastName}</Text>

            <Text>Email:{user.email}</Text>

            <Button colorScheme='red' onClick={onDelete}>Delete</Button>

        </VStack>

    </Box>
    </>
  )
}
