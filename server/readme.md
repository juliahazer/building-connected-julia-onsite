# API Documentation

## POST /api/files

Upload a new file.

#### Query Parameters
Name | Type | Description
:--- | :--- | :---------
`parentId` | `ObjectId` | ID of this file's parent (optional)

#### Body Parameters

Name | Type | Description
:--- | :--- | :---------
`file` | `Multipart` | The actual file to be uploaded (required).
`filename` | `String` | The name of the file (required).
`size` | `Number` | The size of the file in bytes.

#### Example Response (Status: 200)

```js
{
  _id: '524641ff6673e40400000012',
  name: 'File A',
  size: 10000,
  parentId: '524641ff6673e40400000010',
}
```

## GET /api/files/

Gets all files and folders at the root.

#### Example Response (Status: 200)

```js
[
  {
    _id: '524641ff6673e40400000014',
    dateModified: '2013-09-28T02:42:07Z',
    name: 'FileBar.pdf',
    parentId: null,
    size: 10000,
    type: 'FILE',
  },
  {
    _id: '524641ff6673e40400000014',
    dateModified: '2013-09-28T02:42:07Z',
    name: 'Folder Foo',
    parentId: null,
    size: '',
    type: 'FOLDER',
  }
]
```

## GET /api/files/{fileId}/content

Downloads the actual contents of a file.

#### Example Response (Status: 302)

Browser should be automatically redirected to an S3 endpoint.  That endpoint should cease to function after 60 seconds.

## POST /api/folders

Creates a new folder.

#### Query Parameters
Name | Type | Description
:--- | :--- | :---------
`parentId` | `ObjectId` | ID of this folders's parent (optional)

#### Body Parameters

Name | Type | Description
:--- | :--- | :---------
`name` | `String` | The name of the folder (required).

#### Example Response (Status: 200)

```js
{
  _id: '524641ff6673e40400000012',
  name: 'Folder A',
  size: '',
  parentId: '524641ff6673e40400000010',
}
```

## GET /api/folders/{folderId}/items

Gets all files and folders within a given `folderId`.

#### Example Response (Status: 200)

```js
[
  {
    _id: '524641ff6673e40400000014',
    dateModified: '2013-09-28T02:42:07Z',
    name: 'FileBar.pdf',
    parentId: '524641ff6673e40400000015',
    size: 10000,
    type: 'FILE',
  },
  {
    _id: '524641ff6673e40400000014',
    dateModified: '2013-09-28T02:42:07Z',
    name: 'Folder Foo',
    parentId: '524641ff6673e40400000015',
    size: '',
    type: 'FOLDER',
  }
]
```
