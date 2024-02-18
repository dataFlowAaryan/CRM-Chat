import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignInPage from "./routes/auth/SignInPage";
import SignUpPage from "./routes/auth/SignUpPage";
import testPage from "./routes/TestPage";
import { UserProvider } from "./providers/UserProvider";
import { MessagesProvider } from "./providers/MessagesProvider";

import Messages from "./routes/Messages/Messages";

function App() {
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/auth/login" />;
    }

    return children;
  };
  return (
    <UserProvider>
      <MessagesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/login" element={<SignInPage />} />
            <Route path="/auth/register" element={<SignUpPage />} />
            <Route path="testpage" element={<testPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </MessagesProvider>
    </UserProvider>
  );
}

export default App;
