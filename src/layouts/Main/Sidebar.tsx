import { Dialog } from "@mui/material";
import React, { useState, useEffect, useRef, type SetStateAction, Children } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Squares2X2Icon, // Dashboard
  UsersIcon, // Admin Management
  Cog6ToothIcon, // CMS Management
  DocumentTextIcon, //terms
  ShieldCheckIcon, //privacy
  UserCircleIcon, //about us
  ArrowLeftStartOnRectangleIcon,
  QuestionMarkCircleIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleLeftRightIcon,
  
  StarIcon,
  TruckIcon,
  TicketIcon,
  BellIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ClipboardDocumentIcon,
  DocumentCurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import LogoutModal from "../../components/modal/LogoutModal";
import { HEADER_HEIGHT } from "./Header";
import SidebarNavItem from "./SidebarNavItem";
import { useDispatch } from "react-redux";
import { setAnchorElId } from "../../redux/slices/uiSlice";
import useAppSelector from "../../hooks/useAppSelector";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const navigationPaths: any[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: Squares2X2Icon,
    },
    // {
    //   label: "Users",
    //   path: "/users",
    //   icon: UsersIcon,
    // },
    // {
    //   label: "Vendors",
    //   icon: TruckIcon,
    //   isDisclosure: true,
    //   children: [
    //     {
    //       label: "Vendors",
    //       path: "/vendors",
    //       icon: TruckIcon,
    //     },
    //     {
    //       label: "KYC Management",
    //       path: "/vendor-kyc",
    //       icon: DocumentTextIcon,
    //     },
    //   ],
    // },
    // {
    //   label: "Tickets",
    //   icon: TicketIcon,
    //   isDisclosure: true,
    //   children: [
    //     {
    //       label: "Tickets",
    //       path: "/tickets",
    //       icon: TicketIcon,
    //     },
    //     {
    //       label: "Tickets Subject",
    //       path: "/ticket-subject",
    //       icon: DocumentTextIcon,
    //     },
    //   ],
    // },
    // {
    //   label: "Pricing",
    //   path: "/pricing",
    //   icon: DocumentCurrencyDollarIcon,
    // },
    // {
    //   label: "Cancellation Charges",
    //   path: "/cancellation-charges",
    //   icon: BanknotesIcon,
    // },
    // {
    //   label: "Promo Code",
    //   path: "/promo-code",
    //   icon: ClipboardDocumentIcon,
    // },
    // {
    //   label: "Notifications",
    //   path: "/notifications",
    //   icon: BellIcon,
    // },
    // {
    //   label: "Earning History",
    //   path: "/earning-history",
    //   icon: CurrencyDollarIcon,
    // },
    // {
    //   label: "FAQ",
    //   path: "/faq",
    //   icon: QuestionMarkCircleIcon,
    // },
    // {
    //   label: "Review & Ratings",
    //   path: "/review-rating",
    //   icon: StarIcon,
    // },
    // {
    //   label: "Contact Us",
    //   path: "/contact-us",
    //   icon: ChatBubbleLeftRightIcon,
    // },
    {
      label: "CMS Management",
      icon: Cog6ToothIcon,
      isDisclosure: true,
      children: [
        {
          label: "Terms & Conditions",
          path: "/terms",
          icon: DocumentTextIcon,
        },
        {
          label: "Privacy Policy",
          path: "/privacy-policy",
          icon: ShieldCheckIcon,
        },
        {
          label: "About Us",
          path: "/about",
          icon: UserCircleIcon,
        },
      ],
    },
  ];

  const isPathActive = (path?: string) => path && location.pathname === path;

  const isSubmenuActive = (sub?: any) => {
    return (sub?.path && isPathActive(sub?.path)) || sub?.submenu?.some((subItem: any) => isPathActive(subItem?.path));
  };

  // Ref for sidebar for outside click
  const sidebarRef = useRef<HTMLDivElement>(null);
  const anchorElId = useAppSelector((state) => state.ui.anchorElId);

  // Helper: is sidebar open in mobile?
  const isSidebarOpen = anchorElId === "mobile-sidebar";

  // Open sidebar handler (for menu icon)
  const dispatch = useDispatch();
  const closeSidebar = () => dispatch(setAnchorElId(null));

  // Close sidebar on route change (mobile)
  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line
  }, [location.pathname]);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    if (!isSidebarOpen) return;
    function handleClickOutside(event: MouseEvent) {
      // Prevent closing if click is on the Bars3Icon/menu button
      const menuBtn = document.getElementById("mobile-sidebar");
      if (menuBtn && (menuBtn === event.target || menuBtn.contains(event.target as Node))) {
        return;
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Blur overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden" aria-hidden="true" />
      )}
      <div className={`relative mt-16`}>
        <div
          ref={sidebarRef}
          className={`block px-4 py-2 bg-layout-bg h-full overflow-y-auto md:hidden sidebar-scroll absolute top-${HEADER_HEIGHT} left-0 z-48 w-64 transition-transform duration-300 ease-in-out transform pt-4 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {navigationPaths.map(({ icon, label, path, onclick, isDisclosure, children }, index) => (
            <SidebarNavItem
              icon={icon}
              label={label}
              path={path}
              key={index}
              onClick={onclick}
              isDisclosure={isDisclosure}
              children={children}
            />
          ))}
        </div>
      </div>

      <div className="hidden w-[300px] px-2 md:block bg-layout-bg mt-18  overflow-y-auto sidebar-scroll">
        {navigationPaths.map(({ icon, label, path, onclick, isDisclosure, children }, index) => (
          <SidebarNavItem
            icon={icon}
            label={label}
            path={path}
            key={index}
            onClick={onclick}
            isDisclosure={isDisclosure}
            children={children}
          />
        ))}
      </div>

      {openLogoutModal && <LogoutModal open={openLogoutModal} setOpen={setOpenLogoutModal} />}
    </>
  );
};

export default Sidebar;
