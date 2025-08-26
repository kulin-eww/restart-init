// src/components/SidebarNavItem.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import type { ComponentType, SVGProps } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline"; // or wherever your icon is
import { useState, useRef, useEffect } from "react";

type SidebarNavItemProps = {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path?: string;
  isDisclosure?: boolean;
  children?: any[];
  onClick?: (e: any) => void;
};

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  label,
  path,
  icon: Icon,
  onClick,
  isDisclosure,
  children,
}) => {
  const content = (isActive: boolean = false) => (
    <div
      className={`flex gap-3 items-center my-1 py-2 hover:[background:linear-gradient(90deg,#8B0000_0%,#2A0B0A_145.34%)] cursor-pointer px-2 transition-colors duration-200 rounded-md hover:text-white  font-semibold  ${
        isActive ? "sidebar-active" : ""
      }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
      <span>{label}</span>
    </div>
  );

  if (isDisclosure) {
    return (
      <Disclosure>
        {({ open }) => (
          <span>
            {/* <NavLink to={path ? path : " "}> */}
            <Disclosure.Button className="flex items-center justify-between w-full py-2 px-2 hover:[background:linear-gradient(90deg,#8B0000_0%,#2A0B0A_145.34%)] hover:text-white rounded-md font-semibold cursor-pointer">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </div>
              <div className="flex items-center gap-2">
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
              </div>
            </Disclosure.Button>
            {/* </NavLink> */}
            <Disclosure.Panel static>
              {({ open }) => {
                const [maxHeight, setMaxHeight] = useState(open ? "1000px" : "0px");
                const ref = useRef<HTMLDivElement>(null);
                useEffect(() => {
                  if (open && ref.current) {
                    setMaxHeight(ref.current.scrollHeight + "px");
                  } else {
                    setMaxHeight("0px");
                  }
                }, [open]);
                return (
                  <div
                    ref={ref}
                    style={{
                      maxHeight,
                      transition: "max-height 0.3s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    className="overflow-hidden pl-5"
                  >
                    {children?.length &&
                      children?.map(({ path, label, icon: Icon }) => {
                        return (
                          <NavLink key={label} to={path}>
                            {({ isActive }) => (
                              <div
                                className={`flex gap-3 hover:[background:linear-gradient(90deg,#8B0000_0%,#2A0B0A_145.34%)] hover:text-white items-center py-2 cursor-pointer px-2 transition-colors duration-200 rounded-md font-semibold  my-0.5 ${
                                  isActive ? "sidebar-active" : ""
                                }`}
                              >
                                <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                                <span>{label}</span>
                              </div>
                            )}
                          </NavLink>
                        );
                      })}
                  </div>
                );
              }}
            </Disclosure.Panel>
          </span>
        )}
      </Disclosure>
    );
  }

  if (path) {
    return (
      <NavLink to={path} className={({ isActive }) => ""}>
        {({ isActive }) => content(isActive)}
      </NavLink>
    );
  }

  return <div onClick={onClick}>{content(false)}</div>;
};

export default SidebarNavItem;
