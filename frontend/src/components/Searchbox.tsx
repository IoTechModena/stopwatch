import { useMenu } from "@/hooks/useMenu";

interface searchboxProps {
  searchInput: string;
  setSearchInput: (input: string) => void;
}

export const Searchbox = ({ searchInput, setSearchInput }: searchboxProps) => {
  const { closeMenu } = useMenu();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <form
        className="my-12 p-2 Gelion"
        onFocus={closeMenu}
        onSubmit={handleSubmit}
      >
        <div className="relative max-w-3xl mx-auto flex gap-2 sm:gap-6">
          <div className="absolute flex items-center ps-3 pointer-events-none">
            <i className="absolute fa fa-search text-black top-5 left-4"></i>
          </div>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            id="search-box"
            className="h-14 rounded-sm shadow-xl placeholder-gray-700 block w-full ps-10 bg-yellow-400 focus:outline-none text-sm hover:cursor-pointer "
            placeholder="Che evento stai cercando?"
            name="search-box"
          />
          <select
            id="channels"
            className="shadow-xl text-center bg-yellow-400 text-black text-sm rounded-lg block pl-2 hover:bg-yellow-400"
          >
            <option selected>
              Canale
            </option>
            <option value="0">
              Canale: 0
            </option>
            <option value="1">Canale: 1</option>
          </select>
        </div>
      </form>
    </>
  );
};
