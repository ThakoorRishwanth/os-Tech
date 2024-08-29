import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

export const UserModel = ({ isOpen, onClose, addUser }) => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(formData);
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add User</ModalHeader>
                <ModalBody>
                    <VStack spacing={4}>
                        <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                        <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                        <Input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                        <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Add</Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
