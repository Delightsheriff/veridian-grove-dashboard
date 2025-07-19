import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import PageNotFound from "./pages/404";
import Login from "./pages/Login";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import AppLayout from "./components/AppLayout";
import Suites from "./pages/Suites";
import Bookings from "./pages/Bookings";
import BookingDetails from "./features/bookings/BookingDetails";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import User from "./pages/User";
import Checkin from "./pages/Checkin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<div>Home Page</div>} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/suites" element={<Suites />} />
                <Route
                  path="bookings/:bookingId"
                  element={<BookingDetails />}
                />
                <Route path="checkin/:bookingId" element={<Checkin />} />
                <Route path="/users" element={<User />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-center" richColors />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
