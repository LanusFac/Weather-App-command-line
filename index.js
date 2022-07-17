require('dotenv').config();

const InquirerHelper = require("./helpers/inquirer");

const main = async () => {
    const inquirerHelper = new InquirerHelper();

    let opt;
    let res;

    do {
        opt = await inquirerHelper.inquirerMenu();
        res = await opt.action();
    } while (res !== 0)

}

main();
