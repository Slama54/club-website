import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link , useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';
import {FaMoon , FaSun} from 'react-icons/fa'
import {useSelector , useDispatch} from "react-redux"
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from "react";

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation()
    const dispatch =useDispatch();   
    const navigate = useNavigate() 
    const {currentUser}= useSelector(state=> state.user)
    const {theme} = useSelector((state)=> state.theme)
    const [searchTerm, setSearchTerm] = useState('');

    
    useEffect(()=>{
        const urlPramas = new URLSearchParams(location.search)
        const searchTermFromUrl = urlPramas.get('searchTerm')
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search])
    
    
    
    const handleSignout = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      const handleSubmit = (e)=>{
        e.preventDefault()
        const urlPramas = new URLSearchParams(location.search)
        urlPramas.set('searchTerm', searchTerm)
        const searchQuery = urlPramas.toString()
        navigate(`/search?${searchQuery}`)

      }
  return (
    <Navbar className="border-b-2">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white flex items-center gap-1">
            
            <img  className='h-20 w-20 object-cover rounded-full' src="https://firebasestorage.googleapis.com/v0/b/mern-club.appspot.com/o/images-Photoroom.png?alt=media&token=c10c778d-13e2-4526-b3bc-b3d3cd3841b5" alt="logo" />
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500  to-indigo-500 rounded-lg text-white'>
                    Club de pétanque
                             </span>
                              Monastir
        </Link>
        <form onSubmit={handleSubmit}>
          <TextInput  type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline' 
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)} />
        </form>
        <Button className="w-12 h-10 lg:hidden "color='gray' pill>
            <AiOutlineSearch/>
        </Button>
        <div className="flex gap-2  md:order-2">
            <Button className="w-12 h-10 hidden  sm:inline " color='gray' pill onClick={
                ()=> dispatch(toggleTheme())
            }>
                {theme === 'light' ? <FaMoon/> : <FaSun/>}
                
            </Button>
            {
                currentUser ? (
                    <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar 
                        alt="user"
                        img={currentUser.profilePicture}
                        rounded/>
                    }>
                        <Dropdown.Header>
                            <span className="block text-sm">@{currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">{currentUser.email}</span>

                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>

                    </Dropdown>
                ):(

                    <Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>

                )
            }
            <Navbar.Toggle />
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path=="/"} as={"div"}>
                    <Link to='/'>
                         Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path=="/about"} as={"div"}>
                    <Link to='/about'>
                         About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path=="/projects"} as={"div"}>
                    <Link to='/projects'>
                         Projects
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path=="/gallery"} as={"div"}>
                    <Link to='/gallery'>
                         Gallery
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>


    </Navbar>
  )
}
