import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import Add from "./pages/Add";
import Gig from "./pages/Gig";
import Gigs from "./pages/Gigs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import MyGigs from "./pages/MyGigs";
import Order from "./pages/Order";
import Register from "./pages/Register";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import Protected from "./Routes/Protected";
import Explore from "./pages/Explore";
import UpgradeToSeller from "./pages/UpgradeToSeller";
import ActivateSellerAccount from "./pages/ActivateSellerAccount";



function App() {
  const queryClient = new QueryClient();

return (
   <div className="">
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="gigs"
            element={
              <Protected>
                <Gigs />
              </Protected>
            }
          />
          <Route
            path="gig/:id"
            element={
              <Protected>
                <Gig />
              </Protected>
            }
          />
          <Route
            path="orders"
            element={
              <Protected>
                <Order />
              </Protected>
            }
          />
          <Route
            path="add"
            element={
              <Protected>
                <Add />
              </Protected>
            }
          />
          <Route
            path="messages"
            element={
              <Protected>
                <Messages />
              </Protected>
            }
          />
          <Route
            path="message/:id"
            element={
              <Protected>
                <Message />
              </Protected>
            }
          />
          <Route path="explore" element={<Explore />} />
          <Route
            path="mygigs"
            element={
              <Protected>
                <MyGigs />
              </Protected>
            }
          />

          <Route path="upgrade-to-seller" element={<UpgradeToSeller />}/>
          <Route path="activate-seller-account" element={<ActivateSellerAccount />} />
               
          <Route
            path="pay/:id"
            element={
              <Protected>
                <Pay />
              </Protected>
            }
          />
          <Route
            path="success"
            element={
              <Protected>
                <Success />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </QueryClientProvider>
   </div>
  );
}

export default App;
