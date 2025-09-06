import { showSearch } from "@/store/searchBarStore";
import { Search } from "lucide-react";

export default function SearchBtn() {
  return (
    <button
      onClick={() => {
        showSearch.set(true);
      }}
    >
      <Search />
    </button>
  );
}
