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
      <form className="my-8 p-5" onFocus={closeMenu} onSubmit={handleSubmit}>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <button title="searchButton">
              <i className="absolute fa fa-search text-black top-5 left-4"></i>
            </button>
          </div>
          <input
            value={searchInput}
            onFocus={closeMenu}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            id="default-search"
            className="h-14 rounded-sm shadow-xl placeholder-gray-700 block w-full p-4 ps-10 Gelion bg-yellow-400 focus:outline-none text-sm hover:cursor-pointer "
            placeholder="Che evento stai cercando?"
            required
            name="search"
          />
          <span className="absolute top-4 right-5 bg-yellow-400 border-slate-600 border-l pl-4">
            <i className="fa-regular fa-calendar text-black hover:text-gray-100 hover:cursor-pointer"></i>
          </span>
        </div>
      </form>
    </>
  );
};
