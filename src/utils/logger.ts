import * as pc from 'picocolors';
import * as moment from 'moment';

function formatMessage(level: string, message: string) {
  const time = moment().format('YYYY-MM-DD HH:mm:ss');
  return `[${time}] [${pc.bold(level)}] ${message}`;
}

export const logger = {
  info: (msg: any) => {
    console.log(
      formatMessage(
        pc.cyan('INFO'),
        typeof msg === 'string' ? msg : JSON.stringify(msg)
      )
    );
  },
  warn: (msg: any) => {
    console.warn(
      formatMessage(
        pc.yellow('WARN'),
        typeof msg === 'string' ? msg : JSON.stringify(msg)
      )
    );
  },
  error: (msg: any) => {
    console.error(
      formatMessage(
        pc.red('ERROR'),
        typeof msg === 'string' ? msg : JSON.stringify(msg)
      )
    );
  },
  debug: (msg: any) => {
    console.debug(
      formatMessage(
        pc.magenta('DEBUG'),
        typeof msg === 'string' ? msg : JSON.stringify(msg)
      )
    );
  }
};
