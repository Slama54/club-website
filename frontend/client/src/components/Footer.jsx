import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter,BsGithub} from "react-icons/bs"


export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                            <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                            <img  className='h-22 w-22 object-cover rounded-full' src="https://firebasestorage.googleapis.com/v0/b/mern-club.appspot.com/o/images-Photoroom.png?alt=media&token=c10c778d-13e2-4526-b3bc-b3d3cd3841b5" alt="logo" />
                            
                           
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                    <div>

                        <Footer.Title title="About"/>
                        <Footer.LinkGroup col>
                            <Footer.Link 
                            href="https://www.test.com"
                            target="_blank"
                            rel="noopener noreferrer">
                                100 js project
                            </Footer.Link>
                            <Footer.Link 
                            href="/about"
                            target="_blank"
                            rel="noopener noreferrer">
                                about as
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    
                            <div>

                        <Footer.Title title="Follow us"/>
                        <Footer.LinkGroup col>
                            <Footer.Link 
                            href="https://www.github.com"
                            target="_blank"
                            rel="noopener noreferrer">
                                github
                            </Footer.Link>
                            <Footer.Link 
                            href="https://www.discord.com"
                            target="_blank"
                            rel="noopener noreferrer">
                                discord
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                        <div>

                            <Footer.Title title="Legal"/>
                            <Footer.LinkGroup col>
                                <Footer.Link 
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer">
                                    Privacy poliocy
                                </Footer.Link>
                                <Footer.Link 
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer">
                                    terms & conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                </div>
            </div>
            <Footer.Divider/>
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href="#" by="wael" year={new Date().getFullYear()}/>
            
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="#" icon={BsFacebook} />
                <Footer.Icon href="#" icon={BsInstagram} />
                <Footer.Icon href="#" icon={BsTwitter} />
                <Footer.Icon href="#" icon={BsGithub} />

            </div>
            </div>
        </div>

    </Footer>
  )
}
