import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./routes/auth/SignInPage";
import SignUpPage from "./routes/auth/SignUpPage";
import { UserProvider } from "./providers/UserProvider";
import { MessagesProvider } from "./providers/MessagesProvider";

import Messages from "./routes/Messages/Messages";

function App() {
  return (
    <UserProvider>
      <MessagesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/login" element={<SignInPage />} />
            <Route path="/auth/register" element={<SignUpPage />} />
            <Route path="/" element={<Messages />} />
          </Routes>
        </BrowserRouter>
      </MessagesProvider>
    </UserProvider>
  );
}

export default App;
