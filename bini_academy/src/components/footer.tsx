import { Container, Grid, Text, Image } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import bapaLogoWhite from "../assets/bapalogowhite.svg";

export const Footer = () => {
    return (
        <footer className="bg-[#181a1e] text-white py-6 sm:py-10 w-full">
            <Container>
                <Grid className="justify-center">
                    {/* Left Section - Logo and Socials */}
                    <Grid.Col span={{ base: 12, md: 4 }} className="flex flex-col items-center md:items-start">
                        <Image 
                            src={bapaLogoWhite} 
                            alt="BAPA Logo" 
                            width={100} // Smaller on mobile
                            className="sm:w-[150px]" // Original size on desktop
                        />
                        
                        <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                            {[
                                { icon: IconBrandFacebook, label: 'Facebook' },
                                { icon: IconBrandInstagram, label: 'Instagram' },
                                { icon: IconBrandLinkedin, label: 'LinkedIn' },
                                { icon: IconBrandTwitter, label: 'Twitter' },
                                { icon: IconBrandYoutube, label: 'YouTube' }
                            ].map(({ icon: Icon, label }) => (
                                <a 
                                    key={label}
                                    href="#" 
                                    aria-label={label}
                                    className="p-2 bg-gray-800 rounded-md transition duration-300 hover:bg-orange-600"
                                >
                                    <Icon size={18} className="sm:w-5 sm:h-5" />
                                </a>
                            ))}
                        </div>
                    </Grid.Col>

                    {/* Middle Section - Quick Links */}
                    <Grid.Col span={{ base: 12, md: 4 }} className="text-center mt-6 md:mt-0">
                        <Text className="text-base sm:text-lg font-semibold">QUICK LINKS</Text>
                        <ul className="space-y-2 mt-2">
                            <li>
                                <a href="#" className="text-sm sm:text-base hover:text-orange-500 transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm sm:text-base hover:text-orange-500 transition-colors">
                                    Courses
                                </a>
                            </li>
                            <li>
                                <a href="/events" className="text-sm sm:text-base hover:text-orange-500 transition-colors">
                                    Events
                                </a>
                            </li>
                        </ul>
                    </Grid.Col>

                    {/* Right Section - Support */}
                    <Grid.Col span={{ base: 12, md: 4 }} className="text-center md:text-right mt-6 md:mt-0">
                        <Text className="text-base sm:text-lg font-semibold">SUPPORT</Text>
                        <ul className="space-y-2 mt-2">
                           
                            <li>
                                <a href="/terms-and-conditions" className="text-sm sm:text-base hover:text-orange-500 transition-colors">
                                    Terms & Conditions
                                </a>
                            </li>
                            
                        </ul>
                    </Grid.Col>
                </Grid>
            </Container>
        </footer>
    );
};


