import { useContext, useRef } from "react";
import { ChannelContext } from "@/context/ChannelContext";
import { useClickOutside } from "@/hooks/useClickOutside";

<i className="fa-solid fa-caret-down"></i>;

interface SearchboxProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
}

export const Searchbox: React.FC<SearchboxProps> = ({
  searchInput,
  setSearchInput,
}) => {
  const { selectedChannel, setSelectedChannel } = useContext(ChannelContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleSelectChange = (value: number | null) => {
    setSelectedChannel(value);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(menuRef, () => {});

  return (
    <>
      <form className="my-12 p-2 Gelion" onSubmit={handleSubmit}>
        <div className="relative max-w-3xl mx-auto flex gap-2 sm:gap-6">
          <div className="absolute flex items-center ps-3 pointer-events-none">
            <i className="absolute fa fa-search text-black top-5 left-4"></i>
          </div>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            id="search-box"
            className="h-14 rounded-sm shadow-xl placeholder-gray-700 block w-full ps-10 bg-yellow-400 focus:outline-none text-sm hover:cursor-pointer"
            placeholder="Che evento stai cercando?"
            name="search-box"
          />

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="shadow-xl bg-gray-400 text-sm rounded-lg h-14 w-24 hover:bg-gray-300"
            >
              {selectedChannel === null
                ? "Tutti"
                : `Canale: ${selectedChannel}`}
              <i
                className={` ${
                  isMenuOpen
                    ? "fa-solid fa-caret-up pl-1"
                    : "fa-solid fa-caret-down pl-1"
                }`}
              ></i>
            </button>

            {isMenuOpen && (
              <ul className="absolute z-10 mt-2 w-full bg-gray-400 shadow-lg rounded-md text-center">
                <li
                  className="my-2 hover:bg-gray-300 rounded-lg py-1"
                  onClick={() => handleSelectChange(null)}
                >
                  Tutti
                </li>
                <li
                  className="my-2 hover:bg-gray-300 rounded-lg py-1"
                  onClick={() => handleSelectChange(0)}
                >
                  Canale: 0
                </li>
                <li
                  className="mb-2 hover:bg-gray-300 rounded-md py-1"
                  onClick={() => handleSelectChange(1)}
                >
                  Canale: 1
                </li>
              </ul>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
