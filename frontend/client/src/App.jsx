import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignUp from "./pages/SignUp"

import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"

import FooterCom from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute"
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute "
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost"
import PostPage from "./pages/PostPage"
import ScrollToTop from "./components/ScrollToTop"
import Search from "./pages/Search"
import CreateDocument from "./pages/CreateDocument"
import DocumentPage from "./pages/DocumentPage"
import CreateChampion from "./pages/CreateChampion"
import ChampionPage from "./pages/ChampionPage"
import UpdateDocument from "./pages/UpdateDocument"


export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/about" element={<About />}/>
        
        <Route path="/sign-up" element={<SignUp />}/>

        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/search" element={<Search />}/>

        <Route element={<PrivateRoute/>}>

           <Route path="/dashboard" element={<Dashboard />}/>
           <Route path="/document/:documentSlug" element={<DocumentPage/>}/>
        </Route>

        <Route element={<OnlyAdminPrivateRoute/>}>
              <Route path="/create-post" element={<CreatePost />}/>
              <Route path="/update-post/:postId" element={<UpdatePost />}/>
              <Route path="/create-document" element={<CreateDocument />}/>
              <Route path="/update-document/:documentId" element={<UpdateDocument />}/>
              <Route path="/create-champion" element={<CreateChampion />}/>

        </Route>

        <Route path="/projects" element={<Projects />}/>
        <Route path="/post/:postSlug" element={<PostPage/>}/>
        <Route path="/champion/:championSlug" element={<ChampionPage/>}/>

      </Routes>
      <FooterCom/>
    
    </BrowserRouter>
  )
}
