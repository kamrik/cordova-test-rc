#!/usr/bin/env node

// Set the platforms you want to test here.
// Have the test device(s) connected when running ./test.
var platforms = ['android'];


var path = require('path');
var fs = require("fs");
var shelljs = require('shelljs');

// Use fake home dir to avoid using cached versions of plugins and platforms.
process.env.HOME = path.join(__dirname, 'home');

var cordova_lib = require('cordova-lib');
var cdv = cordova_lib.cordova.raw;


var projectDir = path.join(__dirname, 'CordovaProject');
var specDir = path.join(__dirname, 'cordova-mobile-spec');
var wwwDir = path.join(specDir, 'www');

// Config for cordova create.
var cfg = {
    // Use www assets from mobilespec
    lib: {www: {url: wwwDir}},
    // searchpath for unpublished testing plugins.
    plugin_search_path: [__dirname, specDir]
};

// Set handlers to print log messages
var events = cordova_lib.events;
events.on('log', console.log);
events.on('results', console.log);
events.on('warn', console.warn);

var appId = 'org.apache.cordova.example.rctest';
var appName = 'Cordova RC test';

cdv.create(projectDir, appId, appName, cfg)
.then(function() {
    // Further Cordova commands must be run inside the cordova project dir.
    process.chdir(projectDir);
})
.then(function() {
    return cdv.platform('add', platforms);
})
.then(function() {
    // Dummy plugin depending on all the needed plugins
    return cdv.plugins('add', 'org.cordova.mobile-spec-dependencies');
})
.then(function() {
    // Install new style plugin tests from the nested plugins in a /tests
    // subdirectories inside plugins.
    // See https://github.com/apache/cordova-plugin-test-framework
    var pluginTestPaths = [];
    shelljs.ls('plugins').forEach(function(plugin) {
        var plugin_xml = path.join(projectDir, 'plugins', plugin, 'tests', 'plugin.xml');
        if (fs.existsSync(plugin_xml)) {
            pluginTestPaths.push(path.dirname(plugin_xml));
        }
    });
    return cdv.plugins('add', pluginTestPaths);
})
.then(function() {
    cdv.run();
})
.done();
