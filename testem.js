/* jshint node:true*/
module.exports = {
    'framework': 'qunit',
    'test_page': 'tests/index.html?hidepassed&nojshint',
    'disable_watching': true,
    'launch_in_ci': [
        'Chrome'
    ],
    'launch_in_dev': [
        'Chrome',
        'IE8',
        'IE9',
        'IE10',
        'IE11',
        'Firefox',
        'Safari',
        'Opera'
    ]
};
