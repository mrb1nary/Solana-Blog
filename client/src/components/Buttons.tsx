import { useEffect, useState } from 'react';
import {
  Button,
  useDisclosure,
  useToast,
  Input,
  Textarea,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { web3, Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import idl from '../../../anchor/target/idl/blog.json';
import { WalletContextState } from "@solana/wallet-adapter-react";
import Blogcard from './Blogcard'; // Import the BlogCard component

function Buttons() {
  const programID = new PublicKey(idl.address);
  const localNetworkUrl = 'http://localhost:8899'; // Local network URL
  const opts: web3.ConnectionConfig = { commitment: 'processed' };
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const wallet = useWallet();
  const [pda, setPda] = useState<PublicKey | null>(null);

  // State to store fetched blogs
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  type SolanaWallet = WalletContextState & {
    publicKey: PublicKey;
    signTransaction(tx: web3.Transaction): Promise<web3.Transaction>;
    signAllTransactions(txs: web3.Transaction[]): Promise<web3.Transaction[]>;
  };

  const connection = new Connection(localNetworkUrl, opts.commitment);
  const provider = new AnchorProvider(
    connection,
    wallet as SolanaWallet,
    {
      preflightCommitment: opts.commitment,
      commitment: opts.commitment
    }
  );
  const program = new Program<Idl>(idl as Idl, provider);

  // Function to fetch all blogs for the user
  async function fetchAllBlogsForUser(walletPublicKey: PublicKey) {
    try {
      //@ts-ignore
      const blogAccounts = await program.account.blogAccount.all([
        {
          memcmp: {
            offset: 8, // Discriminator is 8 bytes
            bytes: walletPublicKey.toBase58(), // Filter by the user's public key
          },
        },
      ]);
      return blogAccounts;
    } catch (err) {
      console.error("Error fetching all blogs:", err);
      return [];
    }
  }

  // Function to create a new blog post
  const createBlogPost = async () => {
    if (wallet.publicKey && title) {
      const [derivedPda] = PublicKey.findProgramAddressSync(
        [wallet.publicKey.toBuffer(), Buffer.from(title)],
        programID
      );
      setPda(derivedPda);
      console.log("Derived PDA:", derivedPda.toBase58());

      try {
        await program.methods.createBlog(title, body)
          .accounts({
            blogPost: pda,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        toast({
          title: "Blog post created.",
          description: "Your blog post has been successfully created!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        onClose(); // Close the modal on success

        // Refresh the blog list after creation
        fetchPost();
      } catch (err) {
        console.error("Error creating blog post:", err);
        toast({
          title: "Error",
          description: "There was an error creating your blog post.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  //Function to delete a blog post
  const deleteBlog = async (title: string) => {
    if (wallet.publicKey && title) {
      const [derivedPda] = PublicKey.findProgramAddressSync(
        [wallet.publicKey.toBuffer(), Buffer.from(title)],
        programID
      );
      setPda(derivedPda);
      console.log("Derived PDA:", derivedPda.toBase58());

      try {
        await program.methods.deleteBlog(title)
          .accounts({
            blogPost: pda,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        toast({
          title: "Blog post Deleted.",
          description: "Your blog post has been successfully deleted!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        onClose(); // Close the modal on success

        // Refresh the blog list after creation
        fetchPost();
      } catch (err) {
        console.error("Error deleting blog post:", err);
        toast({
          title: "Error",
          description: "There was an error deleting your blog post.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // Function to update an existing blog post
  const editBlog = async (newBody: string, title: string) => {
    if (wallet.publicKey && title) {
      const [derivedPda] = PublicKey.findProgramAddressSync(
        [wallet.publicKey.toBuffer(), Buffer.from(title)],
        programID
      );
      setPda(derivedPda);
      console.log("Derived PDA:", derivedPda.toBase58());

      try {
        await program.methods.updateBlog(title, newBody)
          .accounts({
            blogPost: derivedPda,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();

        toast({
          title: "Blog post updated.",
          description: "Your blog post has been successfully updated!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Refresh the blog list after updating
        fetchPost();
      } catch (err) {
        console.error("Error updating blog post:", err);
        toast({
          title: "Error",
          description: "There was an error updating your blog post.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // Function to fetch all blog posts for the user
  const fetchPost = async () => {
    if (!wallet.publicKey) {
      toast({
        title: "Wallet not connected.",
        description: "Please connect your wallet to fetch blogs.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const blogData = await fetchAllBlogsForUser(wallet.publicKey);
      const blogsFetched = blogData.map((account) => account.account);
      setBlogs(blogsFetched);
      console.log("Blogs fetched:", blogsFetched);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast({
        title: "Error",
        description: "There was an error fetching your blogs.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch posts on page load
  useEffect(() => {
    if (wallet.publicKey) {
      fetchPost();
    }
  }, [wallet.publicKey]);

  return (
    <Box p={6}>
      {/* Enhanced Buttons Section */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-r, gray.400, gray.500, gray.600)"
        h="24"
        p={6}
        rounded="lg"
        shadow="lg"
        mb={6}
      >
        <HStack spacing={4}>
          <Button
            onClick={onOpen}
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500)"
            _hover={{ bgGradient: 'linear(to-r, teal.500, teal.600)' }}
            shadow="md"
            size="lg"
          >
            Create Post
          </Button>

          {/* Modal for Creating a New Post */}
          <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInRight" size="xl">
            <ModalOverlay backdropFilter="auto" backdropInvert="30%" backdropBlur="3px" />
            <ModalContent>
              <ModalHeader>Create a new Post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box mb={4}>
                  <Text fontWeight="bold" mb={2}>Title of Post</Text>
                  <Input
                    placeholder="Make it interesting!"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </Box>
                <Box>
                  <Text fontWeight="bold" mb={2}>Content of the post</Text>
                  <Textarea
                    placeholder="Describe your post"
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                  />
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={createBlogPost}
                  bgGradient="linear(to-r, teal.400, teal.500)"
                  _hover={{ bgGradient: 'linear(to-r, teal.500, teal.600)' }}
                  shadow="md"
                >
                  Post
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
      </Flex>

      {/* Blogs Display Section */}
      <Box>
        {blogs.length === 0 ? (
          <Text>No blogs found. Create one!</Text>
        ) : (
          <VStack spacing={6} align="stretch">
            {blogs.map((blog, index) => (
              <Blogcard
                key={index}
                title={blog.title}
                body={blog.body}
                owner={blog.owner.toBase58()}
                w="full"
                bg="white"
                rounded="md"
                shadow="md"
                p={4}
                onEdit={(newBody: string, title: string) => editBlog(newBody, title)}
                onDelete={(title: string)=> deleteBlog(title)}
                currentUserPublicKey={wallet.publicKey?.toBase58() || ''}
                border="1px"
                borderColor="gray.200"
                _hover={{ shadow: 'lg' }}
              />
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default Buttons;
