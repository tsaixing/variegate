import {Component} from "react";

export default class SearchBar extends Component {
  render() {
    return (
      <div className="mb-5 pt-2 relative mx-auto text-gray-600 focus:ring-2 focus:ring-blue-600">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
          type="search" name="search" placeholder="Search Plants"/>
        <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
          <svg className="text-gray-600 h-4 w-4 fill-current" version="1.1" id="Capa_1" x="0px" y="0px"
               viewBox="0 0 56.966 56.966" width="512px" height="512px">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
      </div>
    );
  }
}
