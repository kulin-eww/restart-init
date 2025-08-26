import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/solid";

type Crumb = { label: string; to?: string };

const breadcrumbMap: Record<string, Crumb[]> = {
  "/users": [{ label: "Users" }],
  "/users/add": [{ label: "Users", to: "/users" }, { label: "Add" }],
  "/users/edit": [{ label: "Users", to: "/users" }, { label: "Edit" }],
  "/add-edit-user": [{ label: "Users", to: "/users" }, { label: "Edit" }],
  "/cms": [{ label: "CMS Management" }],
  "/edit-cms": [{ label: "CMS Management", to: "/cms" }, { label: "Edit" }],
  "/faq": [{ label: "FAQ" }],
  "/faq/add": [{ label: "FAQ", to: "/faq" }, { label: "Add" }],
  "/faq/edit": [{ label: "FAQ", to: "/faq" }, { label: "Edit" }],
  "/contact-us": [{label: "Contact Us"}],
  "/contact-us/:id": [{label: "Contact Us Details", to:"/contact-us"}, {label: "Contact Us Details"}]
};

const BreadcrumbsNav: React.FC = () => {
  const location = useLocation();
  const crumbs = breadcrumbMap[location.pathname];

  if (!crumbs) return null;

  return (
    <div className="mb-3">
      <Breadcrumbs
        separator="/"
        aria-label="breadcrumb"
        sx={{ fontSize: "0.875rem", display: "flex", alignItems: "center" }}
      >
        {/* Home breadcrumb item */}
        <Link
          component={RouterLink}
          to="/"
          color="inherit"
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.875rem",
          }}
        >
          <HomeIcon className="h-4 w-4" />
        </Link>

        {/* Mapped crumbs */}
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          if (isLast || !crumb.to) {
            return (
              <Typography key={`${crumb.label}-${index}`} color="text.primary" sx={{ fontSize: "0.875rem" }}>
                {crumb.label}
              </Typography>
            );
          }
          return (
            <Link
              key={`${crumb.label}-${index}`}
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={crumb.to}
              sx={{ fontSize: "0.875rem" }}
            >
              {crumb.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsNav;
