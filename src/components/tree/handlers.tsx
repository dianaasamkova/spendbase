import {File, Folder} from "./definitions";
import {TreeItem} from "@mui/x-tree-view/TreeItem";

export function buildTree(tree: (File | Folder)[]) {
    return tree.map((folder: File | Folder) => {
        const children = 'children' in folder && folder.children.length > 0 && buildTree(folder?.children);
        return (
            <TreeItem key={folder.id} itemId={folder.id} label={folder.name}>
                {children}
            </TreeItem>
        );
    });
}
