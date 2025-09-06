import { cn } from "@/lib/utils/cn";
import type { FuseIndex } from "@/pages/fuse.json";
import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";
import { useStore } from "@nanostores/react";
import { fuseIndexList, showSearch } from "@/store/searchBarStore";
import Typo from "../typo/Typo";

const fuseOptions = {
  keys: ["title", "description"],
};

export default function SearchBar() {
  const $showSearch = useStore(showSearch);
  const $fuseIndexList = useStore(fuseIndexList);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fuse = useMemo(
    () => new Fuse($fuseIndexList, fuseOptions),
    [$fuseIndexList]
  );

  useEffect(() => {
    fetch("/fuse.json")
      .then((res) => res.json())
      .then((data: FuseIndex[]) => {
        fuseIndexList.set(data);
      });
  }, []);

  useEffect(() => {
    if (keyword.trim() === "") {
      setResults($fuseIndexList);
    } else {
      const found = fuse.search(keyword);
      setResults(found.map((res) => res.item));
    }
  }, [keyword, fuse]);

  useEffect(() => {
    if (showSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSearch]);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch, inputRef]);

  useEffect(() => {
    if (!showSearch) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        showSearch.set(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSearch]);

  return (
    <div
      className={cn(
        "h-dvh gap-x-4 p-4 bg-black/50 backdrop-blur-sm fixed inset-0 z-[1001] ease-in-out transition-opacity duration-300",
        $showSearch ? "opacity-100 visible" : "opacity-0 invisible"
      )}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-stretch justify-start h-auto max-h-full bg-white border-primary border-1 rounded-md">
        <div className="p-4 pb-0">
          <div className="flex items-center gap-x-4 mb-2">
            <input
              ref={inputRef}
              className="border-1 w-full px-4 py-2 rounded-md flex-1 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
            <button onClick={() => showSearch.set(false)}>
              <X />
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <>
            <ul className="flex-grow flex flex-col gap-4 list-none overflow-y-auto px-4 py-2">
              {results.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.url}
                    className="block w-full px-4 py-2 rounded-md bg-primary/10 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-primary/20"
                  >
                    <Typo variant="normal" className="!mb-0">
                      {item.title}
                    </Typo>
                    <Typo variant="small" className="!mb-0">
                      {item.description}
                    </Typo>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="px-4 pb-4">
          <Typo variant="small" className="!mb-0">
            {results.length > 0
              ? `Found ${results.length} results`
              : "No results found"}
          </Typo>
        </div>
      </div>
    </div>
  );
}
