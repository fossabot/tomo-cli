import {
    getDirectoryTree,
    run,
    useTemporaryDirectory
} from './tomo-test';
import addEslint from '../src/commands/add-eslint';
import addMarionette from '../src/commands/add-marionette';
import addWebpack from '../src/commands/add-webpack';

describe('Commands', () => {
    let tempDirectory;
    const skipInstall = true;
    const [setTempDir, cleanupTempDir] = useTemporaryDirectory();
    beforeEach(async () => {
        tempDirectory = await setTempDir();
        process.chdir(tempDirectory);
    });
    afterEach(async () => {
        await cleanupTempDir();
    });
    test('add-eslint', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory};
        await run(addEslint, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
    });
    test('add-marionette', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory};
        await run(addMarionette, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
    });
    test('add-webpack', async () => {
        const sourceDirectory = 'src';
        const options = {skipInstall, sourceDirectory};
        await run(addWebpack, options);
        const tree = getDirectoryTree(tempDirectory);
        expect(tree).toMatchSnapshot();
    });
});
