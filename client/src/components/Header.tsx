import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Header() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white flex items-center justify-between px-10 py-2 shadow-lg rounded-lg">
      <div className="flex space-x-8 cursor-pointer">
        <h4 className="text-2xl hover:scale-105 transition-transform duration-300">
          Solana Blog
        </h4>
      </div>

      <WalletMultiButton className="hover:opacity-90 transition-opacity duration-300 rounded-lg shadow-md" />
    </div>
  );
}

export default Header;
