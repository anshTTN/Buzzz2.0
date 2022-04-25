import "./App.css";
import "./css/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FeedsPage from "./components/FeedsPage";
import FriendList from "./components/FriendList";
import FriendRequests from './components/FriendRequests';
import Signup from "./components/Signup";
import UserResults from "./components/UserResults";
import AllFriends from './components/AllFriends';
import Login from "./components/Login";
import AuthRoute from "./components/AuthRoute";
import MyProfile from "./components/MyProfile";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* AuthRoutes */}
        <Route
          path="/feedsPage"
          element={
            <AuthRoute>
              <FeedsPage />
            </AuthRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <AuthRoute>
              <MyProfile />
            </AuthRoute>
          }
        />
         {/*  Search Friends  */}
     <Route path='/searchfriends' element={
     <AuthRoute>
     <AllFriends />
     </AuthRoute>
     }
     />


         {/* search suggestions */}
         <Route path='/suggestions' element={
         <AuthRoute>
         <UserResults />
         </AuthRoute>
         }
         />


        {/* Friend Requests */}
        <Route path='/friendRequests' element={
        <AuthRoute>
        <FriendRequests />
        </AuthRoute>
        }
        />
        <Route path="/forgotpswd" element={<ForgotPassword />} />
        <Route path="/users/:name" element={<UserResults />} />
        <Route path="/friendList" element={<FriendList />} />
      </Routes>
    </Router>
  );
}

export default App;
