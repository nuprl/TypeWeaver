var growly = require('../lib/growly.js');

var notifications = [
        { label: 'muffin', dispname: 'Muffin' },
        { label: 'cake', dispname: 'Cake' }
    ],
    muffinopts = { label: 'muffin', icon: 'muffin.png' },
    cakeopts = { label: 'cake', title: 'Cake is ready!', icon: 'cake.png', sticky: true };

growly.register('Bakery', 'muffin.png', notifications, function(err: Error) {
    if (err) { 
        console.log(err);
        return;
    }

    growly.notify('Looks like it is half past muffin time!', muffinopts);

    growly.notify('Click to deliver', cakeopts, function(err: Error,  action: Action) {
        console.log('You', action, 'the notification, so the cake is on its way!');
    });
});
