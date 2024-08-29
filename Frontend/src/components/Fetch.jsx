import { Box, Button, Heading, SimpleGrid, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { UserCard } from './UserCard';
import { UserModel } from './UserModel';
import axios from 'axios';

export const Fetch = () => {
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const fetchData = async () => {
        try {
            const response = await axios.get("https://os-tech.onrender.com/api/users");
            setUsers(response.data);
        } catch (err) {
            console.error(err);
            toast({
                title: "Error fetching users.",
                description: "There was an issue fetching the users.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const handleAddUser = async (user) => {
        try {
            await axios.post('https://os-tech.onrender.com/api/users', user);
            setRefresh(!refresh);
            toast({
                title: "User added.",
                description: "The user was added successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Error adding user.",
                description: "There was an issue adding the user.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`https://os-tech.onrender.com/api/user/${id}`);
            setRefresh(!refresh);
            toast({
                title: "User deleted.",
                description: "The user was deleted successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Error deleting user.",
                description: "There was an issue deleting the user.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4}>
            <Heading mb={4}>User Management</Heading>
            <Button onClick={onOpen} colorScheme='teal' mb={4}>Add User</Button>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {users.map(user => (
                    <UserCard key={user._id} user={user} onDelete={() => handleDeleteUser(user._id)} />
                ))}
            </SimpleGrid>
            <UserModel isOpen={isOpen} onClose={onClose} addUser={handleAddUser} />
        </Box>
    );
};
