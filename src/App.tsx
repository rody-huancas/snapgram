import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import { AuthLayout } from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { SinginForm } from './_auth/forms/SigninForm';
import { SingupForm } from "./_auth/forms/SingupForm";
import { Home } from "./_root/pages";
import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SinginForm />} />
          <Route path="/sign-up" element={<SingupForm />} />
        </Route>

        {/* privete routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
