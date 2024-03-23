import React, {useEffect, useMemo, useState} from 'react';
import {SimpleTreeView} from "@mui/x-tree-view";
import data from './response.json'
import {buildTree} from "./handlers";
import {BackendResponse, Folder} from "./definitions";
import {Box} from "@mui/material";

const TreeView: React.FC = () => {
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const [folders, setFolders] = useState<Folder[]>([]);

    const tree = useMemo(() => {
        return buildTree(folders)
    }, [folders]);

    const handleSelectedItemsChange = (event: React.SyntheticEvent, ids: string[]) => {
        setSelectedItems(ids);
    };
    const handleExpandedItemsChange = (event: React.SyntheticEvent, itemIds: string[]) => {
        setExpandedItems(itemIds);
    };


    const getMockData = () => {
        const backendResponse: BackendResponse = data
        setFolders(backendResponse.folders);
    }

    useEffect(() => {
        getMockData()
    }, [])
    return (
        <Box>
            <SimpleTreeView
                expandedItems={expandedItems}
                onExpandedItemsChange={handleExpandedItemsChange}
                selectedItems={selectedItems}
                onSelectedItemsChange={handleSelectedItemsChange}
                aria-label="file system navigator"
                sx={{flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
                multiSelect
            >
                {tree}
            </SimpleTreeView>
        </Box>

    )
}

export default TreeView

