
import FileService from './../../services/file.service';

jest.mock('./../../services/firebase.service');
jest.mock('./../../services/data.service');

const TEST_FILES = [
  { name: 'file1',
    metadata: { name: 'file1', size: 500, contentType: 'audio/mpeg', customMetadata: { realName: 'File 1.mp3', folder: null } },
    downloadURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=' },


  { name: 'file2',
    metadata: { name: 'file2', size: 200, contentType: 'application/pdf', customMetadata: { realName: 'File 2.pdf', folder: 'folder_id' } },
    downloadURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=' },

    
  { name: 'file3', 
    metadata: { name: 'file3', size: 250, contentType: 'image/gif', customMetadata: { realName: 'File 3.gif', folder: 'child_folder_id' } },
    downloadURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=' }
];

const TEST_STRUCTURE = {
  'folder_id': { name: 'folder', parent: null },
  'folder_id2': { name: 'folder 2', parent: null },
  'child_folder_id': { name: 'child', parent: 'folder_id' }
};

beforeAll(() => {
  // manually set structure, as if it was fetched
  FileService._structure = TEST_STRUCTURE;

  // manually set files, as if they were fetched
  FileService._personalFiles = TEST_FILES;
});

afterAll(() => {
  // Resetting files
  FileService._personalFiles = [];

  // Resetting structure
  FileService._structure = {};
});

test('Verify DataService mock', () => {
  expect(FileService.getPersonalFiles()).rejects.toBeDefined();
  expect(FileService.getStructure()).rejects.toBeDefined();
});

test('FileService.getFilesForNode', () => {
  expect(FileService.getFilesForNode(null)).toEqual([ TEST_FILES[0] ]);
  expect(FileService.getFilesForNode('folder_id')).toEqual([ TEST_FILES[1] ]);
  expect(FileService.getFilesForNode('child_folder_id')).toEqual([ TEST_FILES[2] ]);
});

test('FileService.getActionsForFile', () => {
  expect(FileService.getActionsForFile(TEST_FILES[0])).toEqual([
    expect.objectContaining({ title: 'Download' }),
    expect.objectContaining({ title: 'View' }),
    expect.objectContaining({ title: 'Delete' })
  ]);

  
  expect(FileService.getActionsForFile(TEST_FILES[1])).toEqual([
    expect.objectContaining({ title: 'Download' }),
    expect.objectContaining({ title: 'Delete' })
  ]);

  
  expect(FileService.getActionsForFile(TEST_FILES[2])).toEqual([
    expect.objectContaining({ title: 'Download' }),
    expect.objectContaining({ title: 'View' }),
    expect.objectContaining({ title: 'Delete' })
  ]);
});

test('FileService.getFoldersForNode', () => {
  expect(FileService.getFoldersForNode(null)).toMatchObject({
    'folder_id': expect.anything(),
    'folder_id2': expect.anything()
  });

  expect(FileService.getFoldersForNode('folder_id')).toMatchObject({
    'child_folder_id': expect.anything()
  });
  
  expect(FileService.getFoldersForNode('folder_id2')).toMatchObject({});
});

test('FileService.getActionsForFolder', () => {
  expect(FileService.getActionsForFolder('folder_id')).toEqual([
    expect.objectContaining({ title: 'Delete' })
  ]);
});

test('FileService.getQuota', () => {
  expect(FileService.getQuota(TEST_FILES)).toMatchObject({
    totalSize: expect.any(Number),
    authorizedQuota: expect.any(Number),
    totalReadableSize: expect.any(String),
    authorizedReadableQuota: expect.any(String),
    percentageUsed: expect.any(Number),
    exceeded: expect.any(Boolean)
  });

  expect(FileService.getQuota(TEST_FILES)).toHaveProperty('totalReadableSize', '950 B');

  expect(FileService.getQuota(TEST_FILES)).toHaveProperty('totalSize', 950);
});

test('FileService.getReadableSize', () => {
  expect(FileService.getReadableSize(20)).toBe('20 B');
  expect(FileService.getReadableSize(5387)).toBe('5 KB');
  expect(FileService.getReadableSize(23567825)).toBe('22 MB');
});
