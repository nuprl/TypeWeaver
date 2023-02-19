var growly: any[] = require('../lib/growly.js');

var notifications: any[] = [
        { label: 'muffin', dispname: 'Muffin' },
        { label: 'cake', dispname: 'Cake' }
    ],
    muffinopts: object = { label: 'muffin', icon: 'muffin.png' },
    cakeopts: object = { label: 'cake', title: 'Cake is ready!', icon: 'cake.png', sticky: true };

growly.register('Bakery', 'muffin.png', notifications, function(err: boolean) {
    if (err) { 
        console.log(err);
        return;
    }

    growly.notify('Looks like it is half past muffin time!', muffinopts);

    growly.notify('Click to deliver', cakeopts, function(err: Function, action: string) {
        console.log('You', action, 'the notification, so the cake is on its way!');
    });
});

