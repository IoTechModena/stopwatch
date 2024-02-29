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
        className="my-8 p-5 Gelion"
        onFocus={closeMenu}
        onSubmit={handleSubmit}
      >
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <button title="searchButton">
              <i className="absolute fa fa-search text-black top-5 left-4"></i>
            </button>
          </div>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            id="search-box"
            className="h-14 rounded-sm shadow-xl placeholder-gray-700 block w-full p-4 ps-10 bg-yellow-400 focus:outline-none text-sm hover:cursor-pointer "
            placeholder="Che evento stai cercando?"
            name="search-box"
          />
        </div>
      </form>
    </>
  );
};
