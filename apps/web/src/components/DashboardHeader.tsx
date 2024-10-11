"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const DashboardHeader = () => {
  const pathname = usePathname();
  const refs = pathname.split("/").map((ref) => {
    return "/" + ref;
  });
  let hrefs = "";
  return (
    <nav className="h-20 content-center rounded-md px-6 py-4 font-semibold text-black">
      <Breadcrumb>
        <BreadcrumbList>
          {refs.map((ref, index) => {
            if (index === 0) {
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link href={ref}>Home {" >"}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            }
            if (index === refs.length - 1) {
              hrefs += ref;
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage className="font-semibold first-letter:capitalize">
                    {ref.replace("/", "")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            hrefs += ref;
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink asChild>
                  <Link href={hrefs} className="first-letter:capitalize">
                    {ref.replace("/", "") + " >"}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default DashboardHeader;
