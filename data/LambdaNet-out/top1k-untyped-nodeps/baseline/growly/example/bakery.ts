var growly: Array = require('../lib/growly.js');

var notifications: Array = [
        { label: 'muffin', dispname: 'Muffin' },
        { label: 'cake', dispname: 'Cake' }
    ],
    muffinopts: Object = { label: 'muffin', icon: 'muffin.png' },
    cakeopts: Object = { label: 'cake', title: 'Cake is ready!', icon: 'cake.png', sticky: true };

growly.register('Bakery', 'muffin.png', notifications, function(err: Boolean) {
    if (err) { 
        console.log(err);
        return;
    }

    growly.notify('Looks like it is half past muffin time!', muffinopts);

    growly.notify('Click to deliver', cakeopts, function(err: Function, action: String) {
        console.log('You', action, 'the notification, so the cake is on its way!');
    });
});

