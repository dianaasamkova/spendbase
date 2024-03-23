import React, {useCallback, useEffect, useMemo, useState} from "react";
import {SimpleTreeView} from "@mui/x-tree-view";
import data from "./response.json"
import {buildTree, searchFolders, getFoldersAndFilesIds} from "./handlers";
import {BackendResponse, Folder} from "./definitions";
import {Box, Typography} from "@mui/material";
import Search from "../search";
import debounce from "lodash.debounce";

const TreeView: React.FC = () => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    const allFoldersAndFilesIds = useMemo(() => getFoldersAndFilesIds(folders), [folders]);
    const tree = useMemo(() => {
        const filteredFolders = search ? searchFolders(folders, search) : folders
        return buildTree(filteredFolders)
    }, [folders, search]);

    const handleSelectedItemsChange = (event: React.SyntheticEvent, ids: string[]) => {
        setSelectedItems(ids);
    };
    const handleExpandedItemsChange = (event: React.SyntheticEvent, itemIds: string[]) => {
        setExpandedItems(itemIds);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debounceSearch = useCallback(debounce((inputValue: any) => {
        setSearch(inputValue)
        // automatically expand the tree while a search is in progress
        setExpandedItems(allFoldersAndFilesIds)
    }, 1000), [allFoldersAndFilesIds, setSearch]);


    function handleChange(event: any) {
        setInputValue(event.target.value);
        debounceSearch(event.target.value);
    }

    const getMockData = () => {
        /**
         * Regarding the data structure, I believe it's preferable to store data in separate tables for folders and files within the database, it may provide better data organization, query optimization, and maintenance.
         * */
        const backendResponse: BackendResponse = data
        setFolders(backendResponse.folders);
    }

    useEffect(() => {
        getMockData()
    }, [])

    /**
     * Vulnerability: Tree isn't optimized and may cause performance issues with large amounts of data.
     * Solution: Implement virtualization. Consider using libraries such as react-sortable-tree, react-virtualized, or react-beautiful-dnd.
     * These libraries also provide solutions for moving (dragging and dropping) folders.
     * I'd also consider handling search on the backend.
     */

    return (
        <Box>
            <Box sx={{mb: 1}}>
                <Search
                    value={inputValue}
                    onFocus={() => {
                        // clear selection for better ux
                        if (selectedItems.length) {
                            setSelectedItems([])
                        }
                    }}
                    onChange={handleChange}
                />
            </Box>
            <SimpleTreeView
                expandedItems={expandedItems}
                onExpandedItemsChange={handleExpandedItemsChange}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
                aria-label="file system navigator"
                sx={{flexGrow: 1, maxWidth: 400, overflowY: "auto"}}
                multiSelect
            >
                {tree}
            </SimpleTreeView>
            {search && !tree.length && <Typography variant="caption" m={2}>Nothing found</Typography>}
        </Box>

    )
}

export default TreeView

