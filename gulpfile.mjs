import {execa} from 'execa';
import {rimraf} from 'rimraf';
// import {gulp as i18nextParser} from 'i18next-parser';
import gulp from 'gulp';

let {parallel, series} = gulp;

let jsFiles = [
    'src',
];

let scssFiles = [
    'src/**/*.scss',
];

let defaultExec = {
    preferLocal: true,
};

/** @type {string|null} */
let currentMode = null;

function rimrafPromise(path, options = {}) {
    return new Promise((resolve, reject) => {
        rimraf(path, options, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

/**
 * @param {string} mode
 *
 * @return {Function}
 */
function setMode(mode) {
    if (currentMode !== null) {
        throw new Error('Cannot set mode a second time, it is not safe!');
    }
    currentMode = mode;
}

function production(done) {
    setMode('production');
    done();
}

function development(done) {
    setMode('development');
    done();
}

/**
 * @return {string}
 */
function getMode() {
    if (currentMode === null) {
        throw new Error('No mode has been set');
    }
    return currentMode;
}

async function npmInstall() {
    await execa('npm', ['install', '--frozen-lockfile', '--silent'], {...defaultExec, stdio: 'inherit'});
}

async function runDevelopmentServer() {
    await execa('webpack', ['server', '--mode=development', '--progress'], {...defaultExec, stdio: 'inherit'});
}

async function createStats() {
    await execa('webpack', ['--mode=production', '--profile', '--json', 'stats.json'], defaultExec);
    await execa('webpack-bundle-analyzer', ['-m', 'static', '-O', '-r', 'stats.html', 'stats.json'], defaultExec);
}

async function eslint() {
    await execa('eslint', ['--max-warnings', '0', '--color', ...jsFiles], defaultExec);
}

async function eslintFix() {
    await execa('eslint', ['--fix', '--max-warnings', '0', '--color', ...jsFiles], defaultExec);
}

async function stylelint() {
    await execa('stylelint', ['--color', '--report-needless-disables', '--report-invalid-scope-disables', ...scssFiles], defaultExec);
}

async function stylelintFix() {
    await execa('stylelint', ['--fix', '--color', '--report-needless-disables', '--report-invalid-scope-disables', ...scssFiles], defaultExec);
}

async function spellcheck() {
    await execa('cspell', ['--no-progress', '--color'], defaultExec);
}

async function testWatch() {
    await execa('jest', ['--watchAll'], {...defaultExec, stdio: 'inherit'});
}

async function rimrafAll() {
    await rimrafPromise('dist');
    await rimrafPromise('node_modules');
}

async function bumpVersion() {
    await execa('node', ['bump-version.js'], {...defaultExec, stdio: 'inherit'});
}

// Generic building of webpack bundle, these are sensitive to BROWSERSLIST_ENV

async function buildWebpack() {
    await execa('webpack', ['--mode=' + getMode()], defaultExec);
}

// For i18next-parser, enable this task to extract translations

// function i18nextExtract() {
//     return gulp
//         .src('src/**')
//         .pipe(
//             new i18nextParser({
//                 locales: ['de', 'en'],
//                 output:  'src/translation/$LOCALE-$NAMESPACE.json',
//             }),
//         )
//         .pipe(gulp.dest('./'));
// };

// Dev tools
gulp.task('npm:install', npmInstall);
gulp.task('start', series(npmInstall, runDevelopmentServer));
gulp.task('stats', series(npmInstall, createStats));
gulp.task('eslint', eslint);
gulp.task('eslint:fix', eslintFix);
gulp.task('stylelint', stylelint);
gulp.task('stylelint:fix', stylelintFix);
gulp.task('spellcheck', spellcheck);
gulp.task('check:all', series(npmInstall, parallel(eslint, stylelint, spellcheck)));
gulp.task('bump-version', bumpVersion);
gulp.task('reset', series(rimrafAll, npmInstall));

// gulp.task('i18next', i18nextExtract);

// Build tools
gulp.task('build:dev', series(npmInstall, development, buildWebpack));
gulp.task('build:prod', series(npmInstall, production, buildWebpack));
