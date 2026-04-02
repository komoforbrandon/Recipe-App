import {Search } from 'lucide-react'
import { useState } from 'react';
export default function SearchBar() {
    const [search, setSearch] = useState('');
    return (
        <div className="flex items-center bg-gray-100 rounded-4xl px-3 py-2 w-54">
            <Search size={28} color='gray' className="cursor-pointer hover:text-orange-500"/>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes..."
                className="outline-none border-none text-lg bg-transparent ml-2 w-full"
            />
        </div>
    );
}
