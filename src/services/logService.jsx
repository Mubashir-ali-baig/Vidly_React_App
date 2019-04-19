//import * as Sentry from '@sentry/browser';

function init(){
  /*  Sentry.init({
        dsn: "https://3915f38cedef4aefa9a8bfaf62aca359@sentry.io/1417286"
       });
*/
    }

function log(error){
  //  Sentry.captureException(error)
  console.log(error);
}

export default {
    init,
    log
};
