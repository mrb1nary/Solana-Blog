import React, { useState } from 'react';
import {
  Box, Heading, Text, Stack, Flex, Badge, Button,
  useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea
} from '@chakra-ui/react';

interface BlogCardProps {
  title: string;
  body: string;
  owner: string; // PublicKey as string
  date?: string; // Optional: Date the post was created
  tags?: string[]; // Optional: Tags related to the blog post
  currentUserPublicKey: string; // Current user's public key
  onDelete?: (title: string) => void; // Optional: Callback function for delete action
  onEdit?: (newBody: string, title: string) => void; // Optional: Callback function for edit action
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  body,
  owner,
  date,
  tags,
  currentUserPublicKey,
  onDelete,
  onEdit,
}) => {
  const isOwner = owner === currentUserPublicKey;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBody, setNewBody] = useState(body);

  const handleEdit = () => {
    if (onEdit && currentUserPublicKey === owner) {
      onEdit(newBody, title);
      onClose();
    }
  };

  const handleDelete = () =>{
    if(onDelete){
      onDelete(title);
      onClose();
    }
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      boxShadow="md"
      bg="white"
      w="full" // Takes full width
      maxW="full" // Maximum width of the card
      _hover={{ boxShadow: "lg", transform: "translateY(-4px)", transition: "0.3s ease-in-out" }}
    >
      <Stack spacing={4}>
        <Heading size="lg">{title}</Heading>
        {tags && (
          <Flex wrap="wrap" gap={2}>
            {tags.map((tag, index) => (
              <Badge key={index} colorScheme="blue">{tag}</Badge>
            ))}
          </Flex>
        )}
        <Text noOfLines={4}>{body}</Text>
        <Flex align="center" justify="space-between" mt={2}>
          <Text fontSize="sm" color="gray.600">
            {owner.slice(0, 4)}...{owner.slice(-4)}
          </Text>
          {date && (
            <Text fontSize="sm" color="gray.500">
              {new Date(date).toLocaleDateString()}
            </Text>
          )}
          {isOwner && (
            <Flex gap={2}>
              <Button colorScheme="blue" onClick={onOpen}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </Flex>
          )}
        </Flex>
      </Stack>

      {/* Modal for Editing the Blog Post */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Blog Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Edit your post"
              size="sm"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleEdit}>Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BlogCard;
