import { useState } from 'react';
import { BsSearch } from "react-icons/bs";

type SearchProps = {
  // Define the prop type for onSearch function
  onSearch: (title: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {

  const [searchTerm, setSearchTerm] = useState('');

  // Event handler for input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // Update the searchTerm state with the new input value
    setSearchTerm(e.target.value);

    // Call the onSearch function with the new search term
    onSearch(e.target.value);
  };

  return (
    <div className="search">
      <form>
        <div className="search-container">
          <input type='text' placeholder=' Search...' size={100} value={searchTerm} onChange={handleChange} />
          <span className="search-icon"><BsSearch /></span>
        </div>
      </form>
    </div>
  );
};

export default Search;
