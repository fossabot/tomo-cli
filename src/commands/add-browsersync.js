import {
    PackageJsonEditor,
    install,
    uninstall
} from '../utils';
import {allDoExist, someDoExist, someDoExistSync} from '../utils/common';

const BROWSERSYNC_DEPENDENCIES = [
    'browser-sync',
    'npm-run-all'
];
/**
 * @type {task[]}
 * @see https://www.browsersync.io/docs/command-line
 */
export const addBrowsersync = [
    {
        text: 'Add Browsersync tasks to package.json',
        task: async ({outputDirectory, useReact}) => {
            const scripts = {
                prestart: 'npm run build',
                start: `npm-run-all --parallel ${useReact ? 'watch:assets ' : ''}build:watch watch:css serve`,
                serve: `browser-sync start --server ${outputDirectory} --files ${outputDirectory}`
            };
            await (new PackageJsonEditor())
                .extend({scripts})
                .commit();
        },
        condition: ({useParcel}) => allDoExist('package.json', 'postcss.config.js') && (someDoExistSync('webpack.config.js', 'rollup.config.js') || useParcel) // eslint-disable-line max-len
    },
    {
        text: 'Install Browsersync dependencies',
        task: ({skipInstall}) => install(BROWSERSYNC_DEPENDENCIES, {dev: true, skipInstall}),
        condition: ({isNotOffline}) => isNotOffline && someDoExist('package.json')
    }
];
export const removeBrowsersync = [
    {
        text: 'Remove Browsersync tasks from package.json',
        task: async () => {
            const scripts = {
                prestart: undefined,
                start: undefined,
                serve: undefined
            };
            await (new PackageJsonEditor())
                .extend({scripts})
                .commit();
        },
        condition: () => allDoExist('package.json')
    },
    {
        text: 'Uninstall Browsersync dependencies',
        task: () => uninstall(BROWSERSYNC_DEPENDENCIES),
        condition: ({skipInstall}) => !skipInstall && someDoExist('package.json') && (new PackageJsonEditor()).hasAll(...BROWSERSYNC_DEPENDENCIES),
        optional: ({skipInstall}) => !skipInstall
    }
];
export default addBrowsersync;