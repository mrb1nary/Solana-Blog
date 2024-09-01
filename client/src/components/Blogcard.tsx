import React from 'react';
import { Box, Heading, Text, Stack, Flex, Badge, Button } from '@chakra-ui/react';

interface BlogCardProps {
  title: string;
  body: string;
  owner: string; // PublicKey as string
  date?: string; // Optional: Date the post was created
  tags?: string[]; // Optional: Tags related to the blog post
  currentUserPublicKey: string; // Current user's public key
  onDelete?: () => void; // Optional: Callback function for delete action
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  body,
  owner,
  date,
  tags,
  currentUserPublicKey,
  onDelete
}) => {
  const isOwner = owner === currentUserPublicKey;
  console.log(owner, currentUserPublicKey);
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
            <Button colorScheme="red" onClick={onDelete}>
              Delete
            </Button>
          )}
        </Flex>
      </Stack>
    </Box>
  );
};

export default BlogCard;
