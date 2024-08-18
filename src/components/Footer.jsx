import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black p-8 max-w-screen-2xl mx-auto text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
                {/* Bagian Kiri */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="font-bold text-lg">Dicompos Capstone Design</p>
                    <p className="text-sm">Author: Dicompos Team</p>
                    <p>
                        <a href="mailto:dicompostelkomuniversity@gmail.com" className="text-green hover:underline">
                        dicompostelkomuniversity@gmail.com
                        </a>
                    </p>
                </div>

                {/* Bagian Kanan */}
                <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
                </div>
            </div>

            {/* Bagian Bawah */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
                <p>&copy; 2024 Dicompos. All rights reserved.</p>
            </div>
        </footer>
    );
}
