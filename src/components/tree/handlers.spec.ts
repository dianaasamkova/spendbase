import {searchFolders} from "./handlers";

describe("searchFolders", () => {
    it("search folders correctly", () => {
        const folders = [
            {
                id: "1",
                name: "Some Folder 1",
                children: [
                    {
                        id: "2",
                        name: "Some File 1",
                        size: "10 KB",
                        type: "file",
                        fileType: "jpeg",
                        url: "s3_bucket_url",
                    },
                ],
            },
            {
                id: "3",
                name: "Some Folder 2",
                children: [
                    {
                        id: "4",
                        name: "searched Some File 2",
                        size: "10 KB",
                        type: "file",
                        fileType: "jpeg",
                        url: "s3_bucket_url"
                    },
                ],
            },
        ];

        const foundFolders = searchFolders(folders, "searched");
        expect(foundFolders).toEqual([folders[1]]);
    });
});
