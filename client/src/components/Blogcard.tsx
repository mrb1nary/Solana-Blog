import React from 'react';
import { Box, Heading, Text, Stack, Avatar, Flex } from '@chakra-ui/react';

interface BlogCardProps {
  title: string;
  body: string;
  owner: string; // PublicKey as string
}

const BlogCard: React.FC<BlogCardProps> = ({ title, body, owner }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      boxShadow="md"
      bg="white"
      maxW="md"
    >
      <Stack spacing={4}>
        <Heading size="md">{title}</Heading>
        <Text noOfLines={4}>{body}</Text>
        <Flex align="center" mt={2}>
          <Text ml={2} fontSize="sm" color="gray.600">
            {owner.slice(0, 4)}...{owner.slice(-4)}
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default BlogCard;
