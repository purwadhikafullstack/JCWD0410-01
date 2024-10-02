"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventCard from "@/components/EventCard";
import Pagination from "@/components/Pagination";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import Link from "next/link";
// import useGetCategories from "@/hooks/api/category/useGetCategories";
import EventCardSkeleton from "@/components/EventCardSkeleton";
import useGetCustomers, { UserWithAddress } from "@/hooks/api/admin/useGetCustomers";
import Image from "next/image";
import UsersHeader from "./components/UsersHeader";
import { DataTable } from "@/components/DataTable";
import { userColumns } from "./components/UserColumns";

const DashboardUsersPage = () => {
  const searchParams = useSearchParams();

  // const category = searchParams.get("category");

  const [searchValue, setSearchValue] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState(category || "");
  // const [selectedLocation, setSelectedLocation] = useState("");
  const [page, setPage] = useState(1);

  const { data, isPending } = useGetCustomers({
    page,
    take: 8,
    sortBy: "name",
    sortOrder: "desc",
    search: searchValue,
  });

  const onChangePage = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchValue(value);
      }, 300),
    [setSearchValue],
  );

  const handleInputChange = (user: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(user.target.value);
  };

  // const handleSelectCategory = (value: string) => {
  //   if (value === "all") {
  //     return setSelectedCategory("");
  //   }
  //   setSelectedCategory(value);
  // };

  // const handleSelectLocation = (value: string) => {
  //   if (value === "all") {
  //     return setSelectedLocation("");
  //   }
  //   setSelectedLocation(value);
  // };

  return (
    // <div>
    //   {data?.data.length}
    //   {data?.data?.map((customer, index: number) => {
    //     return (
    //       <div key={customer.id}>
    //         key={customer.id}
    //         name={customer.name}
    //         email={customer.email}
    //         profilePic={customer.profilePic}
    //       </div>
    //     );
    //   })}
    // </div>

    <div>
      <UsersHeader />
      <div className="text-md md: mx-auto h-[2400px] bg-white p-4 pt-24">
        <div>
          {data?.data.length}
          {data?.data?.map((customer, index: number) => {
            return (
              <div
                key={customer.id}
                className="my-2 flex h-16 items-center gap-2 rounded-lg bg-sky-500 px-2 shadow"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-[1px] border-neutral-200">
                  {customer.profilePicture && (
                    <Image
                      src={customer.profilePicture}
                      alt="concert"
                      fill
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                key={customer.id}
                name={customer.name}
                email={customer.email}
                profilePic=
              </div>
            );
          })}
        </div>
        {isPending ? null : <DataTable columns={userColumns} data={data?.data!}/>}
        {/* <div className="flex flex-col gap-2 sm:flex-row">
          <div className="text-sm">
            <input
              className="block w-full rounded-md border-[1px] border-neutral-300 py-[9px] pl-3 pr-3 shadow-sm placeholder:text-sm placeholder:text-black focus:border-color1 focus:bg-white focus:outline-none sm:w-[200px] sm:text-sm"
              placeholder="Search Event"
              type="text"
              name="search"
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select
              onValueChange={handleSelectCategory}
              defaultValue={category || ""}
            >
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  {item?.map((categories, index: number) => {
                    return (
                      <SelectItem value={categories.title} key={index}>
                        {categories.title.charAt(0).toUpperCase() +
                          categories.title.slice(1).toLowerCase()}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select onValueChange={handleSelectLocation}>
              <SelectTrigger className="sm:w-[200px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="bali">Bali</SelectItem>
                  <SelectItem value="bandung">Bandung</SelectItem>
                  <SelectItem value="bogor">Bogor</SelectItem>
                  <SelectItem value="jakarta">Jakarta</SelectItem>
                  <SelectItem value="medan">Medan</SelectItem>
                  <SelectItem value="palembang">Palembang</SelectItem>
                  <SelectItem value="surabaya">Surabaya</SelectItem>
                  <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {isPending && (
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          )}
          {data?.data?.map((customer, index: number) => {
            return (
              <Link href={`/dashboard/users/${customer.id}`} key={customer.id}>
                <EventCard
                  key={index}
                  name={customer.name}
                  email={customer.email}
                  profilePic={customer.profilePic}
                />
              </Link>
            );
          })}
        </div>

        <div>
          TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
        </div>

        <div className="flex justify-center">
          <Pagination
            total={data?.meta?.total || 0}
            limit={data?.meta?.take || 0}
            onChangePage={onChangePage}
            page={page}
          />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardUsersPage;
