import { Container, Grid, Text, Image } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import bapaLogoWhite from "../assets/bapalogowhite.svg";

export const Footer = () => {
    return (
        <div className="bg-[#181a1e] text-white py-10 w-full">
            <Container>
                <Grid className="justify-center">
                    {/* Left Section - Logo and Socials */}
                    <Grid.Col span={{ base: 12, md: 4 }} className="flex flex-col items-center md:items-start">
                        <Image src={bapaLogoWhite} alt="BAPA Logo" width={150} />
                        
                        <div className="flex flex-wrap space-x-3 mt-4 justify-center md:justify-start">
                            <a href="#" className="p-2 bg-gray-800 rounded-md transition duration-300 hover:bg-orange-600">
                                <IconBrandFacebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-md transition duration-300 hover:bg-orange-600">
                                <IconBrandInstagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-md transition duration-300 hover:bg-orange-600">
                                <IconBrandLinkedin size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-md transition duration-300 hover:bg-orange-600">
                                <IconBrandTwitter size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-md transition duration-300 hover:bg-orange-600">
                                <IconBrandYoutube size={20} />
                            </a>
                        </div>
                    </Grid.Col>

                    {/* Middle Section - Quick Links */}
                    <Grid.Col span={{ base: 12, md: 4 }} className="text-center">
                        <Text className="text-lg font-semibold">QUICK LINKS</Text>
                        <ul className="space-y-2 mt-2">
                            <li><a href="#" className="hover:underline">About</a></li>
                            <li><a href="#" className="hover:underline">Courses →</a></li>
                            <li><a href="#" className="hover:underline">Contact</a></li>
                            <li><a href="#" className="hover:underline">Events</a></li>
                        </ul>
                    </Grid.Col>

                    {/* Right Section - Support */}
                    <Grid.Col span={{ base: 12, md: 4 }} className="text-center md:text-right">
                        <Text className="text-lg font-semibold">SUPPORT</Text>
                        <ul className="space-y-2 mt-2">
                            <li><a href="#" className="hover:underline">Help Center</a></li>
                            <li><a href="#" className="hover:underline">FAQs</a></li>
                            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        </ul>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    );
};


