/*eslint-env node */
const { string: PluginString } = require("rollup-plugin-string");
const FilesAsStrings = PluginString({ include: "**/*.svg" });

let zipUtils = require("./tools/modules/zip-helper");
let gruntUtils = require("./tools/modules/grunt-utils");
let gruntWebPack = require("./tools/modules/grunt-webpack");
let swag = require("@ephox/swag");
let path = require("path");

let plugins = [
  "accordion",
  "advlist",
  "anchor",
  "autolink",
  "autoresize",
  "autosave",
  "charmap",
  "code",
  "codesample",
  "directionality",
  "emoticons",
  "help",
  "fullscreen",
  "image",
  "importcss",
  "insertdatetime",
  "link",
  "lists",
  "media",
  "nonbreaking",
  "pagebreak",
  "preview",
  "save",
  "searchreplace",
  "table",
  "visualblocks",
  "visualchars",
  "wordcount",
  "quickbars",
];

let theme = ["silver"];

let models = ["dom"];

let oxideUiSkinMap = {
  dark: "oxide-dark",
  default: "oxide",
  "sseeditor-5": "sseeditor-5",
  "sseeditor-5-dark": "sseeditor-5-dark",
};

const stripSourceMaps = function (data) {
  const sourcemap = data.lastIndexOf("/*# sourceMappingURL=");
  return sourcemap > -1 ? data.slice(0, sourcemap) : data;
};

module.exports = function (grunt) {
  const packageData = grunt.file.readJSON("package.json");

  // Determine the release date
  const dateRe = new RegExp(
    "^##\\s+" +
      packageData.version.toString().replace(/\./g, "\\.") +
      "\\s+\\-\\s+([\\d-]+)$",
    "m"
  );
  const changelog = grunt.file.read("CHANGELOG.md").toString();
  const dateMatch = dateRe.exec(changelog);
  if (dateMatch !== null) {
    packageData.date = dateMatch[1];
  } else {
    packageData.date = "TBD";
  }

  grunt.initConfig({
    pkg: packageData,

    shell: {
      prismjs: { command: "node ./bin/build-prism.js", cwd: "../../" },
      tsc: { command: "tsc -b" },
      moxiedoc: {
        command:
          'moxiedoc "src/core/main/ts" -t sseeditornext --fail-on-warning --dry',
      },
    },

    eslint: {
      options: {
        maxWarnings: 0,
        fix: grunt.option("fix"),
      },
      target: ["src/**/*.ts"],
    },

    globals: {
      options: {
        configFile: "src/core/main/json/globals.json",
        outputDir: "lib/globals",
        templateFile: "src/core/main/js/GlobalsTemplate.js",
      },
    },

    rollup: Object.assign(
      {
        core: {
          options: {
            treeshake: true,
            format: "iife",
            onwarn: swag.onwarn,
            plugins: [
              FilesAsStrings,
              swag.nodeResolve({
                basedir: __dirname,
                prefixes: {
                  "sseeditor/core": "lib/core/main/ts",
                },
              }),
              swag.remapImports(),
            ],
          },
          files: [
            {
              src: "lib/core/main/ts/api/Main.js",
              dest: "js/sseeditor/sseeditor.js",
            },
          ],
        },
        "core-types": {
          options: {
            treeshake: true,
            format: "es",
            onwarn: (warning) => {
              // Ignore circular deps in types
              if (warning.code !== "CIRCULAR_DEPENDENCY") {
                swag.onwarn(warning);
              }
            },
            plugins: [
              FilesAsStrings,
              swag.dts({
                respectExternal: true,
                keepVariables: ["sseeditor"],
                keepComments: false,
              }),
            ],
          },
          files: [
            {
              src: "lib/core/main/ts/api/PublicApi.d.ts",
              dest: "js/sseeditor/sseeditor.d.ts",
            },
          ],
        },
      },
      gruntUtils.generate(plugins, "plugin", (name) => {
        return {
          options: {
            treeshake: true,
            format: "iife",
            onwarn: swag.onwarn,
            plugins: [
              FilesAsStrings,
              swag.nodeResolve({
                basedir: __dirname,
                prefixes: gruntUtils.prefixes(
                  {
                    "sseeditor/core": "lib/globals/sseeditor/core",
                  },
                  [[`sseeditor/plugins/${name}`, `lib/plugins/${name}/main/ts`]]
                ),
                mappers: [
                  swag.mappers.replaceDir(
                    "./lib/core/main/ts/api",
                    "./lib/globals/sseeditor/core/api"
                  ),
                  swag.mappers.invalidDir("./lib/core/main/ts"),
                ],
              }),
              swag.remapImports(),
            ],
          },
          files: [
            {
              src: `lib/plugins/${name}/main/ts/Main.js`,
              dest: `js/sseeditor/plugins/${name}/plugin.js`,
            },
          ],
        };
      }),
      gruntUtils.generate(themes, "theme", (name) => {
        return {
          options: {
            treeshake: true,
            format: "iife",
            onwarn: swag.onwarn,
            plugins: [
              FilesAsStrings,
              swag.nodeResolve({
                basedir: __dirname,
                prefixes: gruntUtils.prefixes(
                  {
                    "sseeditor/core": "lib/globals/sseeditor/core",
                  },
                  [
                    [
                      `sseeditor/themes/${name}/resources`,
                      `src/themes/${name}/main/resources`,
                    ],
                    [`sseeditor/themes/${name}`, `lib/themes/${name}/main/ts`],
                  ]
                ),
                mappers: [
                  swag.mappers.replaceDir(
                    "./lib/core/main/ts/api",
                    "./lib/globals/sseeditor/core/api"
                  ),
                  swag.mappers.invalidDir("./lib/core/main/ts"),
                ],
              }),
              swag.remapImports(),
            ],
          },
          files: [
            {
              src: `lib/themes/${name}/main/ts/Main.js`,
              dest: `js/sseeditor/themes/${name}/theme.js`,
            },
          ],
        };
      }),
      gruntUtils.generate(models, "model", (name) => {
        return {
          options: {
            treeshake: true,
            format: "iife",
            onwarn: swag.onwarn,
            plugins: [
              FilesAsStrings,
              swag.nodeResolve({
                basedir: __dirname,
                prefixes: gruntUtils.prefixes(
                  {
                    "sseeditor/core": "lib/globals/sseeditor/core",
                  },
                  [[`sseeditor/models/${name}`, `lib/models/${name}/main/ts`]]
                ),
                mappers: [
                  swag.mappers.replaceDir(
                    "./lib/core/main/ts/api",
                    "./lib/globals/sseeditor/core/api"
                  ),
                  swag.mappers.invalidDir("./lib/core/main/ts"),
                ],
              }),
              swag.remapImports(),
            ],
          },
          files: [
            {
              src: `lib/models/${name}/main/ts/Main.js`,
              dest: `js/sseeditor/models/${name}/model.js`,
            },
          ],
        };
      })
    ),

    emojis: {
      twemoji: {
        base: "",
        ext: ".png",
      },
    },

    terser: Object.assign(
      {
        options: {
          ecma: 2018,
          output: {
            comments: "all",
            ascii_only: true,
          },
          compress: {
            passes: 2,
          },
        },
        core: {
          files: [
            {
              src: "js/sseeditor/sseeditor.js",
              dest: "js/sseeditor/sseeditor.min.js",
            },
            {
              src: "js/sseeditor/icons/default/icons.js",
              dest: "js/sseeditor/icons/default/icons.min.js",
            },
          ],
        },
        // very similar to the emoticons plugin, except mangle is off
        "emoticons-raw": {
          options: {
            mangle: false,
            compress: false,
            output: {
              indent_level: 2,
            },
          },
          files: [
            {
              src: "src/plugins/emoticons/main/js/emojis.js",
              dest: "js/sseeditor/plugins/emoticons/js/emojis.js",
            },
            {
              src: "src/plugins/emoticons/main/js/emojiimages.js",
              dest: "js/sseeditor/plugins/emoticons/js/emojiimages.js",
            },
          ],
        },
      },
      gruntUtils.generate(plugins, "plugin", (name) => {
        var pluginExtras = {
          emoticons: [
            {
              src: "src/plugins/emoticons/main/js/emojis.js",
              dest: "js/sseeditor/plugins/emoticons/js/emojis.min.js",
            },
            {
              src: "src/plugins/emoticons/main/js/emojiimages.js",
              dest: "js/sseeditor/plugins/emoticons/js/emojiimages.min.js",
            },
          ],
        };
        return {
          files: [
            {
              src: `js/sseeditor/plugins/${name}/plugin.js`,
              dest: `js/sseeditor/plugins/${name}/plugin.min.js`,
            },
          ].concat(pluginExtras.hasOwnProperty(name) ? pluginExtras[name] : []),
        };
      }),
      gruntUtils.generate(themes, "theme", (name) => {
        return {
          files: [
            {
              src: `js/sseeditor/themes/${name}/theme.js`,
              dest: `js/sseeditor/themes/${name}/theme.min.js`,
            },
          ],
        };
      }),
      gruntUtils.generate(models, "model", (name) => {
        return {
          files: [
            {
              src: `js/sseeditor/models/${name}/model.js`,
              dest: `js/sseeditor/models/${name}/model.min.js`,
            },
          ],
        };
      })
    ),

    "webpack-dev-server": {
      everything: () => gruntWebPack.all(plugins, themes, models),
      options: {
        devServer: {
          port:
            grunt.option("webpack-port") !== undefined
              ? grunt.option("webpack-port")
              : 3000,
          host: "0.0.0.0",
          allowedHosts: "all",
          static: {
            publicPath: "/",
            directory: path.join(__dirname),
          },
          hot: false,
          liveReload: false,
          setupMiddlewares: (middlewares, devServer) => {
            gruntWebPack.generateDemoIndex(
              grunt,
              devServer.app,
              plugins,
              themes,
              models
            );
            return middlewares;
          },
        },
      },
    },

    concat: Object.assign(
      {
        options: {
          process: function (content) {
            return content
              .replace(/@@version@@/g, packageData.version)
              .replace(/@@releaseDate@@/g, packageData.date);
          },
        },
        core: {
          src: ["src/core/text/build-header.js", "js/sseeditor/sseeditor.js"],
          dest: "js/sseeditor/sseeditor.js",
        },
      },
      gruntUtils.generate(plugins, "plugin", function (name) {
        return {
          src: [
            "src/core/text/build-header.js",
            `js/sseeditor/plugins/${name}/plugin.js`,
          ],
          dest: `js/sseeditor/plugins/${name}/plugin.js`,
        };
      }),
      gruntUtils.generate(themes, "theme", function (name) {
        return {
          src: [
            "src/core/text/build-header.js",
            `js/sseeditor/themes/${name}/theme.js`,
          ],
          dest: `js/sseeditor/themes/${name}/theme.js`,
        };
      }),
      gruntUtils.generate(models, "model", function (name) {
        return {
          src: [
            "src/core/text/build-header.js",
            `js/sseeditor/models/${name}/model.js`,
          ],
          dest: `js/sseeditor/models/${name}/model.js`,
        };
      })
    ),

    copy: {
      core: {
        options: {
          process: function (content) {
            return content
              .replace("@@majorVersion@@", packageData.version.split(".")[0])
              .replace(
                "@@minorVersion@@",
                packageData.version.split(".").slice(1).join(".")
              )
              .replace("@@releaseDate@@", packageData.date);
          },
        },
        files: [
          {
            src: "js/sseeditor/sseeditor.js",
            dest: "js/sseeditor/sseeditor.js",
          },
          {
            src: "js/sseeditor/sseeditor.min.js",
            dest: "js/sseeditor/sseeditor.min.js",
          },
          {
            src: "src/core/main/text/readme_lang.md",
            dest: "js/sseeditor/langs/README.md",
          },
          {
            src: "../../LICENSE.md",
            dest: "js/sseeditor/license.md",
          },
          {
            src: "../../README.md",
            dest: "js/sseeditor/README.md",
          },
        ],
      },
      "default-icons": {
        files: [
          {
            expand: true,
            cwd: "../oxide-icons-default/dist/icons/default",
            src: "**",
            dest: "js/sseeditor/icons/default",
          },
        ],
      },
      "ui-skins": {
        files: gruntUtils.flatMap(oxideUiSkinMap, function (name, mappedName) {
          return [
            {
              expand: true,
              cwd: "../oxide/build/skins/ui/" + name,
              src: "**",
              dest: "js/sseeditor/skins/ui/" + mappedName,
            },
          ];
        }),
      },
      "content-skins": {
        files: [
          {
            expand: true,
            cwd: "../oxide/build/skins/content",
            src: "**",
            dest: "js/sseeditor/skins/content",
          },
        ],
      },
      "visualblocks-plugin": {
        files: [
          {
            src: "src/plugins/visualblocks/main/css/visualblocks.css",
            dest: "js/sseeditor/plugins/visualblocks/css/visualblocks.css",
          },
        ],
      },
      "html-i18n": {
        files: [
          {
            expand: true,
            cwd: "src/plugins/help/main/js/i18n/keynav",
            src: "**",
            dest: "js/sseeditor/plugins/help/js/i18n/keynav",
          },
        ],
      },
    },

    moxiezip: {
      production: {
        options: {
          baseDir: "sseeditor",
          excludes: [
            "js/**/plugin.js",
            "js/**/theme.js",
            "js/**/model.js",
            "js/**/icons.js",
            "js/**/*.map",
            "js/sseeditor/sseeditor.full.min.js",
            "js/sseeditor/plugins/moxiemanager",
            "js/sseeditor/plugins/visualblocks/img",
            "js/sseeditor/README.md",
            "README.md",
          ],
          to: "dist/sseeditor_<%= pkg.version %>.zip",
          dataFilter: (args) => {
            if (args.filePath.endsWith(".min.css")) {
              args.data = stripSourceMaps(args.data);
            }
          },
        },
        src: [
          "js/sseeditor/langs",
          "js/sseeditor/plugins",
          "js/sseeditor/skins/**/*.js",
          "js/sseeditor/skins/**/*.min.css",
          "js/sseeditor/skins/**/*.woff",
          "js/sseeditor/icons",
          "js/sseeditor/themes",
          "js/sseeditor/models",
          "js/sseeditor/sseeditor.d.ts",
          "js/sseeditor/sseeditor.min.js",
          "js/sseeditor/license.md",
          "CHANGELOG.md",
          "LICENSE.md",
          "README.md",
        ],
      },

      development: {
        options: {
          baseDir: "sseeditor",
          excludes: [
            "../../modules/*/dist",
            "../../modules/*/build",
            "../../modules/*/scratch",
            "../../modules/*/lib",
            "../../modules/*/tmp",
            "../../modules/sseeditor/js/sseeditor/sseeditor.full.min.js",
            "../../scratch",
            "../../node_modules",
          ],
          to: "dist/sseeditor_<%= pkg.version %>_dev.zip",
        },
        files: [
          {
            expand: true,
            cwd: "../../",
            src: [
              "modules/*/src",
              "modules/*/CHANGELOG.md",
              "modules/*/Gruntfile.js",
              "modules/*/gulpfile.js",
              "modules/*/README.md",
              "modules/*/README.md",
              "modules/*/package.json",
              "modules/*/tsconfig*.json",
              "modules/*/.eslint*.json",
              "modules/*/webpack.config.js",
              "modules/*/.stylelintignore",
              "modules/*/.stylelintrc",
              "modules/sseeditor/tools",
              "bin",
              "patches",
              ".yarnrc",
              "LICENSE.md",
              "README.md",
              "lerna.json",
              "package.json",
              "tsconfig*.json",
              ".eslint*.json",
              "yarn.lock",
            ],
          },
          {
            expand: true,
            cwd: "../../",
            src: "modules/sseeditor/js",
            dest: "/",
            flatten: true,
          },
        ],
      },

      cdn: {
        options: {
          onBeforeSave: function (zip) {
            zip.addData("dist/version.txt", packageData.version);
          },
          pathFilter: function (zipFilePath) {
            return zipFilePath.replace("js/sseeditor/", "dist/");
          },
          dataFilter: (args) => {
            if (args.filePath.endsWith(".min.css")) {
              args.data = stripSourceMaps(args.data);
            }
          },
          onBeforeConcat: function (destPath, chunks) {
            // Strip the license from each file and prepend the license, so it only appears once
            var license = grunt.file
              .read("src/core/text/build-header.js")
              .replace(/@@version@@/g, packageData.version)
              .replace(/@@releaseDate@@/g, packageData.date);
            return [license].concat(
              chunks.map(function (chunk) {
                return chunk.replace(license, "").trim();
              })
            );
          },
          excludes: [
            "js/**/config",
            "js/**/scratch",
            "js/**/classes",
            "js/**/lib",
            "js/**/dependency",
            "js/**/src",
            "js/**/*.less",
            "js/**/*.dev.js",
            "js/**/*.dev.svg",
            "js/**/*.map",
            "js/sseeditor/sseeditor.full.min.js",
            "js/sseeditor/plugins/moxiemanager",
            "js/sseeditor/plugins/visualblocks/img",
            "js/sseeditor/README.md",
            "README.md",
            "js/tests/.jshintrc",
          ],
          concat: [
            {
              src: [
                "js/sseeditor/sseeditor.d.ts",
                "js/sseeditor/sseeditor.min.js",
                "js/sseeditor/themes/*/theme.min.js",
                "js/sseeditor/models/*/model.min.js",
                "js/sseeditor/plugins/*/plugin.min.js",
                "!js/sseeditor/plugins/example/plugin.min.js",
                "!js/sseeditor/plugins/example_dependency/plugin.min.js",
              ],

              dest: ["js/sseeditor/sseeditor.min.js"],
            },
          ],
          to: "dist/sseeditor_<%= pkg.version %>_cdn.zip",
        },
        src: [
          "js/sseeditor/sseeditor.js",
          "js/sseeditor/langs",
          "js/sseeditor/plugins",
          "js/sseeditor/skins",
          "js/sseeditor/icons",
          "js/sseeditor/themes",
          "js/sseeditor/models",
          "js/sseeditor/license.md",
        ],
      },

      component: {
        options: {
          excludes: [
            "js/**/config",
            "js/**/scratch",
            "js/**/classes",
            "js/**/lib",
            "js/**/dependency",
            "js/**/src",
            "js/**/*.less",
            "js/**/*.dev.svg",
            "js/**/*.dev.js",
            "js/**/*.map",
            "js/sseeditor/sseeditor.full.min.js",
            "js/sseeditor/plugins/moxiemanager",
            "js/sseeditor/plugins/example",
            "js/sseeditor/plugins/example_dependency",
            "js/sseeditor/plugins/visualblocks/img",
          ],
          pathFilter: function (zipFilePath) {
            if (zipFilePath.indexOf("js/sseeditor/") === 0) {
              return zipFilePath.substr("js/sseeditor/".length);
            }

            return zipFilePath;
          },
          onBeforeSave: function (zip) {
            function jsonToBuffer(json) {
              return new Buffer(JSON.stringify(json, null, "\t"));
            }

            const keywords = [
              "wysiwyg",
              "sseeditor",
              "richtext",
              "javascript",
              "html",
              "text",
              "rich editor",
              "rich text editor",
              "rte",
              "rich text",
              "contenteditable",
              "editing",
            ];

            zip.addData(
              "bower.json",
              jsonToBuffer({
                name: "sseeditor",
                description:
                  "Web based JavaScript HTML WYSIWYG editor control.",
                license: "GPL-2.0-or-later",
                keywords: keywords,
                homepage: "https://www.tiny.cloud/",
                ignore: [
                  "README.md",
                  "composer.json",
                  "package.json",
                  ".npmignore",
                  "CHANGELOG.md",
                ],
              })
            );

            zip.addData(
              "package.json",
              jsonToBuffer({
                name: "sseeditor",
                version: packageData.version,
                repository: {
                  type: "git",
                  url: "https://github.com/sseeditor/sseeditor.git",
                  directory: "modules/sseeditor",
                },
                description:
                  "Web based JavaScript HTML WYSIWYG editor control.",
                author: "Ephox Corporation DBA Tiny Technologies, Inc",
                main: "sseeditor.js",
                types: "sseeditor.d.ts",
                license: "GPL-2.0-or-later",
                keywords: keywords,
                homepage: "https://www.tiny.cloud/",
                bugs: { url: "https://github.com/sseeditor/sseeditor/issues" },
              })
            );

            zip.addData(
              "composer.json",
              jsonToBuffer({
                name: "sseeditor/sseeditor",
                version: packageData.version,
                description:
                  "Web based JavaScript HTML WYSIWYG editor control.",
                license: ["GPL-2.0-or-later"],
                keywords: keywords,
                homepage: "https://www.tiny.cloud/",
                type: "component",
                extra: {
                  component: {
                    scripts: [
                      "sseeditor.js",
                      "plugins/*/plugin.js",
                      "themes/*/theme.js",
                      "models/*/model.js",
                      "icons/*/icons.js",
                    ],
                    files: [
                      "sseeditor.min.js",
                      "plugins/*/plugin.min.js",
                      "themes/*/theme.min.js",
                      "models/*/model.min.js",
                      "skins/**",
                      "icons/*/icons.min.js",
                    ],
                  },
                },
                archive: {
                  exclude: [
                    "README.md",
                    "bower.js",
                    "package.json",
                    ".npmignore",
                    "CHANGELOG.md",
                  ],
                },
              })
            );

            var getDirs = zipUtils.getDirectories(grunt, this.excludes);

            zipUtils.addIndexFiles(
              zip,
              getDirs("js/sseeditor/plugins"),
              zipUtils.generateIndex("plugins", "plugin")
            );
            zipUtils.addIndexFiles(
              zip,
              getDirs("js/sseeditor/themes"),
              zipUtils.generateIndex("themes", "theme")
            );
            zipUtils.addIndexFiles(
              zip,
              getDirs("js/sseeditor/models"),
              zipUtils.generateIndex("models", "model")
            );
            zipUtils.addIndexFiles(
              zip,
              getDirs("js/sseeditor/icons"),
              zipUtils.generateIndex("icons", "icons")
            );
          },
          to: "dist/sseeditor_<%= pkg.version %>_component.zip",
          dataFilter: (args) => {
            if (args.filePath.endsWith(".min.css")) {
              args.data = stripSourceMaps(args.data);
            }
          },
        },
        src: [
          "js/sseeditor/skins",
          "js/sseeditor/icons",
          "js/sseeditor/plugins",
          "js/sseeditor/themes",
          "js/sseeditor/models",
          "js/sseeditor/sseeditor.js",
          "js/sseeditor/sseeditor.d.ts",
          "js/sseeditor/sseeditor.min.js",
          "js/sseeditor/license.md",
          "CHANGELOG.md",
          "js/sseeditor/README.md",
        ],
      },
    },

    nugetpack: {
      main: {
        options: {
          id: "SSEEditor",
          version: packageData.version,
          authors: "Ephox Corporation DBA Tiny Technologies, Inc",
          owners: "Ephox Corporation DBA Tiny Technologies, Inc",
          description:
            "The best WYSIWYG editor! SSEEditor is a platform independent web based Javascript HTML WYSIWYG editor " +
            "control released as Open Source under GNU General Public License Version 2 or later by Tiny Technologies, Inc. SSEEditor has the ability to convert HTML " +
            "TEXTAREA fields or other HTML elements to editor instances. SSEEditor is very easy to integrate " +
            "into other Content Management Systems.",
          releaseNotes: "Release notes for my package.",
          summary:
            "SSEEditor is a platform independent web based Javascript HTML WYSIWYG editor " +
            "control released as Open Source under GNU General Public License Version 2 or later by Tiny Technologies, Inc.",
          projectUrl: "https://www.tiny.cloud/",
          license: "GPL-2.0-or-later",
          licenseUrl: "https://licenses.nuget.org/GPL-2.0-or-later",
          requireLicenseAcceptance: true,
          tags: "Editor SSEEditor HTML HTMLEditor",
          excludes: [
            "js/**/config",
            "js/**/scratch",
            "js/**/classes",
            "js/**/lib",
            "js/**/dependency",
            "js/**/src",
            "js/**/*.less",
            "js/**/*.dev.svg",
            "js/**/*.dev.js",
            "js/**/*.map",
            "js/sseeditor/sseeditor.full.min.js",
          ],
          outputDir: "dist",
        },
        files: [
          {
            src: "js/sseeditor/langs",
            dest: "/content/scripts/sseeditor/langs",
          },
          {
            src: "js/sseeditor/plugins",
            dest: "/content/scripts/sseeditor/plugins",
          },
          {
            src: "js/sseeditor/themes",
            dest: "/content/scripts/sseeditor/themes",
          },
          {
            src: "js/sseeditor/models",
            dest: "/content/scripts/sseeditor/models",
          },
          {
            src: "js/sseeditor/skins",
            dest: "/content/scripts/sseeditor/skins",
          },
          {
            src: "js/sseeditor/icons",
            dest: "/content/scripts/sseeditor/icons",
          },
          {
            src: "js/sseeditor/sseeditor.js",
            dest: "/content/scripts/sseeditor/sseeditor.js",
          },
          {
            src: "js/sseeditor/sseeditor.d.ts",
            dest: "/content/scripts/sseeditor/sseeditor.d.ts",
          },
          {
            src: "js/sseeditor/sseeditor.min.js",
            dest: "/content/scripts/sseeditor/sseeditor.min.js",
          },
          {
            src: "js/sseeditor/license.md",
            dest: "/content/scripts/sseeditor/license.md",
          },
          {
            src: "tools/nuget/build/SSEEditor.targets",
            dest: "/build/SSEEditor.targets",
          },
        ],
      },
    },

    bundle: {
      minified: {
        options: {
          themesDir: "js/sseeditor/themes",
          modelsDir: "js/sseeditor/models",
          pluginsDir: "js/sseeditor/plugins",
          iconsDir: "js/sseeditor/icons",
          pluginFileName: "plugin.min.js",
          themeFileName: "theme.min.js",
          modelFileName: "model.min.js",
          iconsFileName: "icons.min.js",
          outputPath: "js/sseeditor/sseeditor.full.min.js",
        },

        src: ["js/sseeditor/sseeditor.min.js"],
      },

      source: {
        options: {
          themesDir: "js/sseeditor/themes",
          modelsDir: "js/sseeditor/models",
          pluginsDir: "js/sseeditor/plugins",
          iconsDir: "js/sseeditor/icons",
          pluginFileName: "plugin.js",
          themeFileName: "theme.js",
          modelFileName: "model.js",
          iconsFileName: "icons.js",
          outputPath: "js/sseeditor/sseeditor.full.js",
        },

        src: ["js/sseeditor/sseeditor.js"],
      },
    },

    symlink: {
      options: {
        overwrite: true,
        force: true,
      },
      dist: {
        src: "dist",
        dest: "../../dist",
      },
      js: {
        src: "js",
        dest: "../../js",
      },
    },

    clean: {
      dist: ["js"],
      lib: ["lib"],
      scratch: ["scratch"],
      release: ["dist"],
    },

    "bedrock-manual": {
      core: {
        config: "tsconfig.json",
        projectdir: ".",
        stopOnFailure: true,
        testfiles: [
          "src/**/test/ts/atomic/**/*Test.ts",
          "src/**/test/ts/browser/**/*Test.ts",
          "src/**/test/ts/headless/**/*Test.ts",
        ],
        customRoutes: "src/core/test/json/routes.json",
      },
      atomic: {
        config: "tsconfig.json",
        projectdir: ".",
        stopOnFailure: true,
        testfiles: ["src/**/test/ts/atomic/**/*Test.ts"],
        customRoutes: "src/core/test/json/routes.json",
      },
      silver: {
        config: "tsconfig.json",
        testfiles: [
          "src/themes/silver/test/ts/phantom/**/*Test.ts",
          "src/themes/silver/test/ts/browser/**/*Test.ts",
        ],
        stopOnFailure: true,
        overallTimeout: 600000,
        singleTimeout: 300000,
        customRoutes: "src/core/test/json/routes.json",
        name: "silver-tests",
      },
    },

    "bedrock-auto": {
      standard: {
        browser:
          grunt.option("bedrock-browser") !== undefined
            ? grunt.option("bedrock-browser")
            : "chrome-headless",
        config: "tsconfig.json",
        testfiles: ["src/**/test/ts/**/*Test.ts"],
        overallTimeout: 900000,
        singleTimeout: 30000,
        retries: 3,
        customRoutes: "src/core/test/json/routes.json",
        name:
          grunt.option("bedrock-browser") !== undefined
            ? grunt.option("bedrock-browser")
            : "chrome-headless",
      },
      silver: {
        browser: "phantomjs",
        config: "tsconfig.json",
        testfiles: [
          "src/themes/silver/test/ts/phantom/**/*Test.ts",
          "src/themes/silver/test/ts/browser/**/*Test.ts",
          "src/themes/silver/test/ts/webdriver/*/*Test.ts",
        ],
        stopOnFailure: true,
        overallTimeout: 600000,
        singleTimeout: 300000,
        customRoutes: "src/core/test/json/routes.json",
        name: "silver-tests",
      },
    },
  });

  grunt.registerTask(
    "symlink-dist",
    "Links built dist content to the root directory",
    function () {
      // Windows doesn't support symlinks, so copy instead of linking
      if (process.platform === "win32") {
        if (grunt.file.exists("../../dist"))
          grunt.file.delete("../../dist", { force: true });
        if (grunt.file.exists("../../js"))
          grunt.file.delete("../../js", { force: true });
        grunt.file.copy("dist", "../../dist");
        grunt.file.copy("js", "../../js");
        grunt.log.write("Copied 2 directories");
      } else {
        grunt.task.run("symlink");
      }
    }
  );

  grunt.registerTask("version", "Creates a version file", function () {
    grunt.file.write("dist/version.txt", packageData.version);
  });

  require("load-grunt-tasks")(grunt, {
    requireResolution: true,
    config: "../../package.json",
    pattern: ["grunt-*", "@ephox/bedrock-server", "@ephox/swag"],
  });
  grunt.loadTasks("tools/tasks");

  grunt.registerTask("emoji", ["emojis", "terser:emoticons-raw"]);

  grunt.registerTask("prodBuild", [
    "shell:prismjs",
    "shell:tsc",
    "globals",
    "emoji",
    "html-i18n",
    "rollup",
    "concat",
    "copy",
    "terser",
  ]);

  grunt.registerTask("prod", [
    "prodBuild",
    "clean:release",
    "moxiezip",
    "nugetpack",
    "symlink-dist",
    "version",
  ]);

  grunt.registerTask("dev", [
    "shell:prismjs",
    "globals",
    "emoji",
    "html-i18n",
    // TODO: Make webpack use the oxide CSS directly
    // as well as making development easier, then we can update 'yarn dev' to run 'oxide-build' in parallel with 'sseeditor-grunt dev'
    // that will save 2-3 seconds on incremental builds
    "copy:ui-skins",
    "copy:content-skins",
    "copy:default-icons",
    "copy:html-i18n",
  ]);

  grunt.registerTask("start", ["webpack-dev-server"]);

  grunt.registerTask("buildOnly", ["clean:dist", "prod"]);
  grunt.registerTask("default", ["clean:dist", "eslint", "prod"]);
  grunt.registerTask("test", ["bedrock-auto:standard"]);
  grunt.registerTask("test-manual", ["bedrock-manual"]);
};
