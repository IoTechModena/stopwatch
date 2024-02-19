// Author: Reda
// Props: datePickerIcon (boolean) - se true, mostra il datepicker

import React from "react";

import { useMenu } from "@/hooks/useMenu";
type SearchBoxProps = { datepickerIcon?: boolean };

export const Searchbox = (
  props: SearchBoxProps & { onSearch: (searchTerm: string) => void }
) => {
  const { closeMenu } = useMenu();
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchValue = formData.get("search") as string;
    props.onSearch(searchValue);
  };
  return (
    <>
      <form className="my-8 p-5" onSubmit={handleSearch} onFocus={closeMenu}>
        <div className="relative max-w-3xl  mx-auto">
          <div className="absolute inset-y-0 start-0  flex items-center ps-3 pointer-events-none">
            <button title="searchButton">
              <i className="absolute fa fa-search text-black top-5 left-4"></i>
            </button>
          </div>
          <input
            onFocus={closeMenu}
            type="search"
            id="default-search"
            className="h-14 rounded-sm shadow-xl placeholder-gray-700 block w-full p-4 ps-10  Gelion bg-yellow-400  focus:outline-none text-sm   hover:cursor-pointer "
            placeholder={
              props.datepickerIcon
                ? "Che evento stai cercando?"
                : "Che telecamera stai cercando?"
            }
            required
            name="search"
          />
          {props.datepickerIcon && (
            <span className="absolute top-4 right-5 bg-yellow-400 border-slate-600 border-l pl-4">
              <i className="fa-regular fa-calendar text-black hover:text-gray-100 hover:cursor-pointer"></i>
            </span>
          )}
        </div>
      </form>
    </>
  );
};
