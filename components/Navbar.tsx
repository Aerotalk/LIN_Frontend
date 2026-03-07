"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAffiliate } from "@/hooks/useAffiliate";


const cities: { title: string; href: string; description: string }[] = [
  {
    title: "Mumbai",
    href: "/cities/payday-loan-in-mumbai",
    description: "Avail loans in Mumbai",
  },
  {
    title: "Delhi",
    href: "/cities/payday-loan-in-delhi",
    description: "Avail loans in Delhi",
  },
  {
    title: "Bengaluru",
    href: "/cities/payday-loan-in-bengaluru",
    description: "Avail loans in Bengaluru",
  },
  {
    title: "Hyderabad",
    href: "/cities/payday-loan-in-hyderabad",
    description: "Avail loans in Hyderabad",
  },
  {
    title: "Pune",
    href: "/cities/payday-loan-in-pune",
    description: "Avail loans in Pune",
  },
  {
    title: "Kolkata",
    href: "/cities/payday-loan-in-kolkata",
    description: "Avail loans in Kolkata",
  },
  {
    title: "Chennai",
    href: "/cities/payday-loan-in-chennai",
    description: "Avail loans in Chennai",
  },
];

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  const { getLinkWithRef } = useAffiliate();
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={getLinkWithRef(href)} className="block p-2 rounded-md hover:bg-gray-100">
          <div className="text-sm font-medium">{title}</div>
          <p className="text-xs text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}


export default function Navbar() {
  const pathname = usePathname();
  const { getLinkWithRef } = useAffiliate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [dashboardLink, setDashboardLink] = React.useState("/dashboard");

  React.useEffect(() => {
    const userToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    const partnerToken = typeof window !== 'undefined' ? localStorage.getItem('partnerAuthToken') : null;

    if (userToken) {
      setIsLoggedIn(true);
      setDashboardLink("/dashboard");
    } else if (partnerToken) {
      setIsLoggedIn(true);
      const partnerDataStr = localStorage.getItem('partnerData');
      if (partnerDataStr) {
        try {
          const partnerData = JSON.parse(partnerDataStr);
          const type = partnerData.partnerType;
          // partnerType can be DSA, BC, AFFILIATE
          if (type === 'DSA') setDashboardLink("/dsa-dashboard");
          else if (type === 'BC') setDashboardLink("/bc-dashboard");
          else if (type === 'AFFILIATE') setDashboardLink("/affiliate-dashboard");
          else setDashboardLink("/dashboard");
        } catch (e) {
          console.error("Error parsing partner data", e);
          setDashboardLink("/dashboard");
        }
      } else {
        setDashboardLink("/dashboard");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  return (
    <nav className="w-full mx-auto py-4 px-6 md:px-12 lg:px-24 fixed top-0 left-0 right-0 z-50 bg-red-50 shadow-sm">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href={getLinkWithRef("/")} className="flex items-center">
          <Image src="/lin-logo.png" alt="Logo" width={120} height={40} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <NavigationMenuLink asChild>
                    <Link href={getLinkWithRef("/personal-loan")}>Personal loan</Link>
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-3">
                    <ListItem
                      href="/personal-loan/insta-loan"
                      title="Insta Loan"
                    >
                      Get an instant personal loan with quick approval.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Loan calculators</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4 p-3">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href={getLinkWithRef("/loan-calculators/personal-emi-calculator")}>
                          Personal EMI Calculator
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href={getLinkWithRef("/loan-calculators/eligibility-loan-calculator")}>
                          Eligibility Loan Calculator
                        </Link>
                      </NavigationMenuLink>
                      {/* <NavigationMenuLink asChild>
                        <Link href={getLinkWithRef("/loan-calculators/cibil-score-checker")}>
                          Cibil Score Checker
                        </Link>
                      </NavigationMenuLink> */}
                      <NavigationMenuLink asChild>
                        <Link href={getLinkWithRef("/loan-calculators/loan-comparison-calculator")}>
                          Loan Comparison Calculator
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Cities</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-3 md:grid-cols-2 lg:grid-cols-3 w-[500px]">
                    {cities.map((c) => (
                      <ListItem key={c.title} title={c.title} href={c.href}>
                        {c.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-3">
                    <li>
                      <Link href={getLinkWithRef("/blog")}>Blogs</Link>
                    </li>
                    <li>
                      <Link href={getLinkWithRef("/about-us")}>About us</Link>
                    </li>
                    <li>
                      <Link href={getLinkWithRef("/careers")}>Careers</Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-3">
                    <li>
                      <Link href={getLinkWithRef("/contact-us")}>Contact us</Link>
                    </li>
                    <li>
                      <Link href={getLinkWithRef("/enquire-now")}>Enquire now</Link>
                    </li>
                    <li>
                      <Link href={getLinkWithRef("/track-loan")}>Track loan</Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {isLoggedIn ? (
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={getLinkWithRef(dashboardLink)}>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-semibold shadow-sm">
                        View Dashboard
                      </Button>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={getLinkWithRef("/login")}>Login</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={getLinkWithRef("/apply-now")}>
                    <Button size="default" variant="default" className="text-base">
                      Apply now
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>


        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/lin-logo.png"
                    alt="Logo"
                    width={120}
                    height={40}
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4 px-4">
                <Link href={getLinkWithRef("/apply-loan")}>Personal Loan</Link>
                <Link href={getLinkWithRef("#")}>Loan Calculators</Link>
                <Link href={getLinkWithRef("/loan/mumbai")}>Cities</Link>
                <Link href={getLinkWithRef("/blog")}>Learn</Link>
                <Link href={getLinkWithRef("/contact")}>Support</Link>
                {isLoggedIn ? (
                  <Link href={getLinkWithRef("/dashboard")}>
                    <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">View Dashboard</Button>
                  </Link>
                ) : (
                  <Link href={getLinkWithRef("/login")}>Login</Link>
                )}
                <Link href={getLinkWithRef("/apply-now")} className="w-full">
                  <Button variant="default" className="w-full">Apply now</Button>
                </Link>
              </div>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
