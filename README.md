# cordova-test-rc
A fixture for testing cordova-lib release candidates using mobilespec.
 - Uses local installation of cordova-lib to avoid `npm install -g ...`
 - Uses latest public releases of platforms and plugins. A fake local dir is used as HOME to avoid cached versions from `~/.cordova` and `~/.plugman`.
 - Does not exercise cordova-cli and plugman.

## Usage

    git clone https://github.com/kamrik/cordova-test-rc.git
    cd cordova-test-rc
    # Change the platform in rctest.js if desired.
    # Connect your test device.
    ./test

[MobileSpec](https://github.com/apache/cordova-mobile-spec/) app should start on your device. Click the righ buttons to run the tests.

MobileSpec is using the [cordova-plugin-test-framework](https://github.com/apache/cordova-plugin-test-framework) plugin to run plugin tests. 
