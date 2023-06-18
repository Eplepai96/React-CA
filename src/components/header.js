import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { BASEURL } from '../api';
import { useLocalStorage } from '../storage';

export function SearchBar({ onSearch, results, onItemClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="searchContainer">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {results.map((item) => (
        <div className='searchResults' key={item.id} onClick={() => onItemClick(item)}>
          {item.title}
        </div>
      ))}
    </div>
  );
}

export const Header = () => {
  const [allItems, setAllItems] = useState([]);
  const [suggestedResults, setSuggestedResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(BASEURL);
        const data = await response.json();

        console.log(data);

        if (!data || data.length === 0) {
          setAllItems([]);
          return;
        }

        setAllItems(data);
      } catch (error) {
        console.error(error);
        setAllItems([]);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = useCallback(
    (query) => {
      if (!query) {
        setSuggestedResults([]);
        return;
      }

      const filteredResults = allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestedResults(filteredResults);
    },
    [allItems]
  );

  const handleItemClick = (item) => {
    navigate(`/product/${item.id}`);
    setSuggestedResults([]);
  };

  const DisplayQuantity = () => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
      const updateQuantity = () => {
        const selectedItems = JSON.parse(localStorage.getItem('selected_items')) || {};
        const itemCount = Object.values(selectedItems).reduce(
          (total, item) => total + item.quantity,
          0
        );
        setQuantity(itemCount);
      };

      updateQuantity();

      window.addEventListener('storage', updateQuantity);

      return () => {
        window.removeEventListener('storage', updateQuantity);
      };
    }, []);

    return (
      <div className="displayQuantity">
        {quantity > 0 && <span className="quantity">{quantity}</span>}
      </div>
    );
  };

  return (
    <div className="header">
      <div className="headerItems">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="cartContainer">
        <Link to="/shopping-cart">
          <FaShoppingCart />
        </Link>
        <DisplayQuantity />
      </div>
      <SearchBar
        onSearch={handleSearch}
        results={suggestedResults}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default Header;
