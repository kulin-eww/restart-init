import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import FAQDetails from "../pages/Faq/FAQDetails";
import ViewContent from "../pages/CMS/ViewContent";
import EditContent from "../pages/CMS/EditContent";
import PageNotFound from "../pages/Errors/PageNotFound";

const Login = lazy(() => import("../pages/Auth/Login"));
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Auth/ResetPassword"));

const MainLayout = lazy(() => import("../layouts/Main"));
const AuthLayout = lazy(() => import("../layouts/Auth"));

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Users = lazy(() => import("../pages/Users"));
const Profile = lazy(() => import("../pages/Profile"));
const ViewUser = lazy(() => import("../pages/Users/ViewUser"));

const PrivacyPolicy = lazy(() => import("../pages/CMS/PrivacyPolicy"));
const AboutUs = lazy(() => import("../pages/CMS/AboutUs"));
const Terms = lazy(() => import("../pages/CMS/Terms"));
const Faq = lazy(() => import("../pages/Faq"));
const AddFAQ = lazy(() => import("../pages/Faq/AddFAQ"));
const EditFAQ = lazy(() => import("../pages/Faq/EditFAQ"));
const ReviewRating = lazy(() => import("../pages/ReviewRating"));
const ViewReviewRating = lazy(() => import("../pages/ReviewRating/ViewReviewRating"));
const Vendors = lazy(() => import("../pages/Vendors"));
const ViewVendor = lazy(() => import("../pages/Vendors/ViewVendor"));
const VendorKYC = lazy(() => import("../pages/VendorKYC"));
const ViewVendorKYC = lazy(() => import("../pages/VendorKYC/ViewVendorKYC"));
const ContactUs = lazy(() => import("../pages/ContactUs"));
const ContactMessageDetails = lazy(() => import("../pages/ContactUs/ContactMessageDetails"));
const Tickets = lazy(() => import("../pages/Tickets"));
const TicketSubject = lazy(() => import("../pages/TicketSubject"));
const AddTicketSubject = lazy(() => import("../pages/TicketSubject/AddTicketSubject"));
const ViewTicketSubject = lazy(() => import("../pages/TicketSubject/ViewTicketSubject"));
const EditTicketSubject = lazy(() => import("../pages/TicketSubject/EditTicketSubject"));
const ViewTicket = lazy(() => import("../pages/Tickets/ViewTicket"));
const Notifications = lazy(() => import("../pages/Notifications"));
const SendNotification = lazy(() => import("../pages/Notifications/SendNotification"));
const EarningHistory = lazy(() => import("../pages/EarningHistory"));
const CancellationCharges = lazy(() => import("../pages/CancellationCharges"));
const PromoCode = lazy(() => import("../pages/PromoCode"));
const AddPromoCode = lazy(() => import("../pages/PromoCode/AddPromoCode"));
const ViewPromoCode = lazy(() => import("../pages/PromoCode/ViewPromoCode"));
const EditPromoCode = lazy(() => import("../pages/PromoCode/EditPromoCode"));
const Pricing = lazy(() => import("../pages/Pricing"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/users/view",
        element: <ViewUser />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/faq/add",
        element: <AddFAQ />,
      },
      {
        path: "/faq/edit",
        element: <EditFAQ />,
      },
      {
        path: "/faq/view",
        element: <FAQDetails />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/contact-us/:id",
        element: <ContactMessageDetails />,
      },
      {
        path: "/review-rating",
        element: <ReviewRating />,
      },
      {
        path: "/review-rating/view",
        element: <ViewReviewRating />,
      },
      // Vendor
      {
        path: "/vendors",
        element: <Vendors />,
      },
      {
        path: "/vendors/view",
        element: <ViewVendor />,
      },
      // Vendor KYC
      {
        path: "/vendor-kyc",
        element: <VendorKYC />,
      },
      {
        path: "/vendor-kyc/view",
        element: <ViewVendorKYC />,
      },
      // Ticket
      {
        path: "/tickets",
        element: <Tickets />,
      },
      {
        path: "/tickets/view",
        element: <ViewTicket />,
      },
      // Ticket Subject
      {
        path: "/ticket-subject",
        element: <TicketSubject />,
      },
      {
        path: "/ticket-subject/add",
        element: <AddTicketSubject />,
      },
      {
        path: "/ticket-subject/view",
        element: <ViewTicketSubject />,
      },
      {
        path: "/ticket-subject/edit",
        element: <EditTicketSubject />,
      },
      // Pricing
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/notifications/send-notification",
        element: <SendNotification />,
      },
      {
        path: "/earning-history",
        element: <EarningHistory />,
      },
      // Cancellation Charges
      {
        path: "/cancellation-charges",
        element: <CancellationCharges />,
      },
      // CMS
      {
        path: "/terms/view",
        element: <ViewContent />
      },
      {
        path: "/terms/edit",
        element: <EditContent />
      },
      {
        path: "/about/view",
        element: <ViewContent />
      },
      {
        path: "/about/edit",
        element: <EditContent />
      },
      {
        path: "/privacy-policy/view",
        element: <ViewContent />
      },
      {
        path: "/privacy-policy/edit",
        element: <EditContent />
      },
      // Promo Code
      {
        path: "/promo-code",
        element: <PromoCode />,
      },
      {
        path: "/promo-code/add",
        element: <AddPromoCode />,
      },
      {
        path: "/promo-code/view",
        element: <ViewPromoCode />,
      },
      {
        path: "/promo-code/edit",
        element: <EditPromoCode />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
