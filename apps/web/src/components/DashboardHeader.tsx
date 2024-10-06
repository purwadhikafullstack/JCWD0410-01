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
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  // const router = useRouter();
  const refs = window.location.pathname.split("/").map((ref) => {
    return "/" + ref;
  });
  let hrefs = "";
  return (
    <nav className="fixed z-50 h-20 w-full content-center bg-blue-200 p-3 font-semibold text-black md:w-[calc(100%-256px)]">
      <Breadcrumb className="pl-2">
        <BreadcrumbList>
          {refs.map((ref, index) => {
            if (index === 0) {
              return (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={window.location.host + hrefs}>Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              );
            }
            if (index === refs.length - 1) {
              hrefs += ref;
              return (
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold first-letter:capitalize">
                    {ref.replace("/", "")}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            hrefs += ref;
            return (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={window.location.host + hrefs}
                      className="first-letter:capitalize"
                    >
                      {ref.replace("/", "")}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default DashboardHeader;
