import React, { useEffect, useState } from 'react';
import Cards from "../../components/Cards"; // Sesuaikan path jika perlu
import { FaFilter } from "react-icons/fa";

const Produk = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/menu.json");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filtered);
        setSelectedCategory(category);
        setcurrentPage(1);
    };

    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
        setcurrentPage(1);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedItems = [...filteredItems];
        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        setFilteredItems(sortedItems);
        setcurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setcurrentPage(pageNumber);

    return (
        <div className='bg-white'>
            <div className="section-container">
                <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-10'>
                    <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap mt-20">
                        <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
                        <button onClick={() => filterItems("bento")} className={selectedCategory === "bento" ? "active" : ""}>Bento Cake</button>
                        <button onClick={() => filterItems("cake")} className={selectedCategory === "cake" ? "active" : ""}>Cake</button>
                        <button onClick={() => filterItems("half")} className={selectedCategory === "half" ? "active" : ""}>Half Cake</button>
                    </div>
                    <div className='flex justify-end mb-4 rounded-sm mt-20'>
                        
                        <select name='sort' id='sort' onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className='bg-[#EFEFEF] text-[#535353] px-2 py-1 rounded-sm'>
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Low to High</option>
                            <option value="high-to-low">High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {currentItems.map((item) => (
                        <Cards key={item._id} item={item} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center pb-10 pt-10">
                {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-[#FE8A8A] text-white" : "bg-gray-200"}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Produk;