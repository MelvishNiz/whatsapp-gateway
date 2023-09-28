import chalk from 'chalk';

export const log = (req, res, next) => {
  console.log(chalk.blue(`${req.method} ${req.url} ${req.ip} ${new Date().toString()}`));
  next();
}
export default log;