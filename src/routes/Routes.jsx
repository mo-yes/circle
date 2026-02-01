{/* BrowserRouter */}
import { createBrowserRouter } from "react-router-dom";

{/* Auth Layout Page*/}
import Auth from "../layouts/Auth";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

{/* Main Layout Page*/}
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import PostDetails from "../pages/PostDetails/PostDetails";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import NoteFound from "../pages/Not-Found/NoteFound";

{/* Protected Route */}
import ProtectedAuth from "../ProtectedRoutes/Auth/ProtectedAuth";
import ProtectedMain from "../ProtectedRoutes/Main/ProtectedMain";


  const router = createBrowserRouter([
  
  {path:'',element:<Auth/> , children:[
    {path:'login', element:<ProtectedAuth> <Login /> </ProtectedAuth>},
    {path:'register', element:<ProtectedAuth> <Register /> </ProtectedAuth>},
  ]},

  {path:'',element:<Main />, children:[
    {index:true , element:<ProtectedMain> <Home /> </ProtectedMain>},
    {path:'profile', element:<ProtectedMain> <Profile /> </ProtectedMain>},
    {path:'settings', element:<ProtectedMain> <Settings /> </ProtectedMain>},
    {path:'post-details', element:<ProtectedMain> <PostDetails /> </ProtectedMain>},
    {path:'*' , element:<NoteFound />},
  ]}
 ]);
 export default router