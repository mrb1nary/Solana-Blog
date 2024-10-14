import React, { useState } from 'react';
import {
  Box, Heading, Text, Stack, Flex, Badge, Button,
  useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea
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
  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setNewBody] = useState(body);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    onOpen(); // Ensure the modal opens when edit mode is triggered
  };

  const handleSave = () => {
    if (onEdit && currentUserPublicKey === owner) {
      onEdit(newBody, title);
      setIsEditing(false);
      onClose();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(title);
      onClose();
    }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4} // Make padding smaller for compact cards
      boxShadow="lg" // Keep shadow for depth
      bgGradient="linear(to-b, gray.800, black)" // Dark gradient from gray to black
      color="white"
      w="full"
      maxW="4xl" // Set a smaller width
      _hover={{ boxShadow: "xl", transform: "translateY(-4px)", transition: "0.3s ease-in-out" }}
      onClick={onOpen}
      cursor="pointer"
    >
      <Stack spacing={3}>
        <Heading size="md">{title}</Heading>
        {tags && (
          <Flex wrap="wrap" gap={2}>
            {tags.map((tag, index) => (
              <Badge key={index} colorScheme="purple">{tag}</Badge>
            ))}
          </Flex>
        )}
        <Text noOfLines={3}>{body.split(" ").slice(0, 50).join(" ") + "..."}</Text>
        <Flex align="center" justify="space-between" mt={2}>
          <Text fontSize="xs" color="gray.400">
            {owner.slice(0, 4)}...{owner.slice(-4)}
          </Text>
          {date && (
            <Text fontSize="xs" color="gray.500">
              {new Date(date).toLocaleDateString()}
            </Text>
          )}
          {isOwner && (
            <Flex gap={2}>
              <Button size="sm" colorScheme="blue" onClick={handleEdit}>
                Edit
              </Button>
              <Button size="sm" colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </Flex>
          )}
        </Flex>
      </Stack>

      {/* Modal for Viewing/Editing the Blog Post */}
      <Modal isOpen={isOpen} onClose={() => { setIsEditing(false); onClose(); }} isCentered size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEditing ? (
              <Textarea
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Edit your post"
                size="sm"
              />
            ) : (
              <Text>{body}</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => { setIsEditing(false); onClose(); }}>Cancel</Button>
            {isEditing && (
              <Button colorScheme="blue" onClick={handleSave}>
                Save
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BlogCard;
