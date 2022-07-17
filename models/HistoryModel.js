const fs = require("fs");
const DB_PATH = './db/searched_history.json'

class HistoryModel {

    #history;
    
    constructor() {
        this.#readFromDB();
    }

    saveOnDB(history) {
        fs.writeFileSync(DB_PATH, JSON.stringify({history}));
    }

    get history() {
        return this.#history.splice(0, 6);
    }

    #readFromDB() {
        if (!fs.existsSync(DB_PATH)) {
            throw new Error("DB for history dosnt exists.");
        }
        const info = fs.readFileSync(DB_PATH, {encoding: 'utf-8'});
        const {history} = JSON.parse(info);

        this.#history = history;
    }
}

module.exports = HistoryModel;
