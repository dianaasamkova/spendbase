export interface File {
    id: string;
    name: string;
    size: string;
    type: string;
    fileType: string;
}

export interface Folder {
    id: string;
    name: string;
    children: (File | Folder)[];
}

export interface BackendResponse {
    folders: Folder[];
}
