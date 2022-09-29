import { getFavicons } from '@andresmarpz/favicons';

getFavicons('andresmarpz.com').then(console.log).catch(e => console.log('there was an error!'));
getFavicons('twitter.com').then(console.log).catch(console.error);
getFavicons('github.com').then(console.log).catch(console.error);