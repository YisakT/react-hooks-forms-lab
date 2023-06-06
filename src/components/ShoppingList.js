// ShoppingList.js
import React from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [searchText, setSearchText] = React.useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All" && !searchText) return true;

    const itemName = item.name.toLowerCase();
    const search = searchText.toLowerCase();

    return (
      (selectedCategory === "All" || item.category === selectedCategory) &&
      itemName.includes(search)
    );
  });

  const handleItemFormSubmit = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        search={searchText} // Pass the searchText state as the search prop
        onSearchChange={handleSearchChange} // Pass the handleSearchChange function as the onSearchChange prop
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
