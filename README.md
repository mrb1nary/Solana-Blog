<h1>Blog DApp Project</h1>

<p>This is a decentralized blog application built on the Solana blockchain using the Anchor framework. Users can create, view, and manage their blog posts directly on the Solana blockchain. This project leverages Chakra UI for a clean and responsive UI, along with the Solana Wallet Adapter for seamless wallet integration.</p>

<h2>Features</h2>
<ul>
  <li><strong>Create Blog Posts</strong>: Users can create blog posts that are stored on the Solana blockchain.</li>
  <li><strong>Fetch and Display Posts</strong>: Automatically fetch and display all posts created by the connected wallet.</li>
  <li><strong>Responsive Design</strong>: Uses Chakra UI to ensure the application looks great on all devices.</li>
</ul>

<h2>Live Demo</h2>
<p>🚀 <strong>Live Application</strong>: <a href="#">Coming Soon</a></p>


<h2>Prerequisites</h2>
<p>Before you begin, ensure you have met the following requirements:</p>
<ul>
  <li>Node.js (v14 or higher) and npm installed on your machine.</li>
  <li>Solana CLI and Anchor CLI installed.</li>
  <li>A local Solana blockchain running or access to a Solana devnet/testnet.</li>
  <li>A wallet like Phantom, configured with Solana.</li>
</ul>

<h2>Setup Instructions</h2>
<p>Follow these steps to set up and run the project locally.</p>

<h3>1. Clone the Repository</h3>
<pre><code>git clone https://github.com/yourusername/solana-blog-dapp.git
cd solana-blog-dapp
</code></pre>

<h3>2. Install Dependencies</h3>
<pre><code>npm install
</code></pre>

<h3>3. Set Up the Local Solana Environment</h3>
<p>Ensure that your local Solana blockchain is running. If you don't have it running yet, you can start it with:</p>
<pre><code>solana-test-validator
</code></pre>
<p>Airdrop some SOL to your local wallet for testing:</p>
<pre><code>solana airdrop 5
</code></pre>

<h3>4. Build and Deploy the Anchor Program</h3>
<p>Navigate to the <code>anchor</code> directory where the smart contract is located:</p>
<pre><code>cd anchor
anchor build
anchor deploy
</code></pre>
<p>Copy the deployed program ID and update it in the frontend code if necessary.</p>

<h3>5. Configure Frontend</h3>
<p>In the project directory, create a <code>.env</code> file and add the following environment variables:</p>
<pre><code>REACT_APP_SOLANA_NETWORK=http://localhost:8899
REACT_APP_PROGRAM_ID=YourDeployedProgramID
</code></pre>

<h3>6. Run the Application</h3>
<p>Go back to the root of the project directory and start the development server:</p>
<pre><code>npm start
</code></pre>
<p>The app should now be running locally at <code>http://localhost:3000</code>.</p>

<h3>7. Connect Your Wallet</h3>
<p>Make sure you have a wallet (like Phantom) set up and connected to the local Solana network. Once connected, you can start creating and managing your blog posts.</p>

<h2>Directory Structure</h2>
<ul>
  <li><strong><code>src/</code></strong>: Contains the frontend React code.</li>
  <li><strong><code>anchor/</code></strong>: Contains the Solana Anchor program and smart contract code.</li>
  <li><strong><code>public/</code></strong>: Public assets and the HTML template.</li>
  <li><strong><code>README.md</code></strong>: Documentation for the project.</li>
</ul>

<h2>Future Enhancements</h2>
<ul>
  <li><strong>User Profile</strong>: Add user profiles with avatars and descriptions.</li>
  <li><strong>Comments</strong>: Enable commenting on blog posts.</li>
  <li><strong>Search</strong>: Implement search functionality to find posts by title or content.</li>
</ul>

<h2>Contributing</h2>
<p>Contributions are welcome! Please fork the repository and create a pull request with your changes.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License. See the <a href="LICENSE">LICENSE</a> file for details.</p>

<hr>
<p>Feel free to reach out if you have any questions or need help setting up the project!</p>
