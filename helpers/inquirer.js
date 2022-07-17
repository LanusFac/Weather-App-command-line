require('colors');

const inquirer = require('inquirer');
const Search = require("../models/SearchModel");
const {createInquirerListChoices} = require("../utils/InquirerUtils");
const {printCity} = require("../models/PlaceModel.js");
const HistoryModel = require("../models/HistoryModel");

const CITY_MESSAGE = "City:";
const EXIT_CONFIRMATION_MESSAGE = "Are you sure you want to exit?";
const EXIT_MESSAGE = "See you soon!!";

const INQUIRER_INITIAL_MESSAGE = 'What do you want to do?';

const SELECT_PLACE_MESSAGE = 'Select a place';

class InquirerHelper {

    #search = new Search();
    #historyModel = new HistoryModel();
    #searchedHistory;

    constructor() {
        this.#searchedHistory = this.#historyModel.history;
    }


    headerApp = () => {
        console.log(this.greenText('============================='));
        console.log(this.greenText('       Select an option      '));
        console.log(this.greenText('============================='));

        console.log('\n');
    }

    greenText = text => {
        return text.green;
    }


    confirmOperation = async (message) => {
        const question = [
            {
                type: 'confirm',
                name: 'ok',
                message
            }
        ];

        const {ok: confirmation} = await inquirer.prompt(question);

        return confirmation;
    };

    #exit = async () => {
        const confirmed = await this.confirmOperation(EXIT_CONFIRMATION_MESSAGE);

        if (confirmed) {
            console.log(EXIT_MESSAGE);
            return 0;
        }
    };

    #placeSearch = async placeToSearch => {
        const places = await this.#search.places(placeToSearch);
        const options = createInquirerListChoices(SELECT_PLACE_MESSAGE, this.#createDynamicChoices(places));

        const selectedCity = await this.#printOptions(options);
        const {option: opt} = selectedCity;
        const weather = await this.#search.weather(opt.latitude, opt.longitude);

        printCity({...opt, weather});
    }

    #searchPlaces = async () => {
        const placeToSearch = await this.#readInput(CITY_MESSAGE);
        this.#addHistorySearchedPlace(placeToSearch);
        await this.#placeSearch(placeToSearch);
    }

    #searchHistory = async () => {
        const options = createInquirerListChoices(SELECT_PLACE_MESSAGE, this.#createDynamicChoices(this.#searchedHistory));
        const {option: selectedCity} = await this.#printOptions(options);
        await this.#placeSearch(selectedCity);
    }

    #addHistorySearchedPlace = searchedPlace => {
        if (!this.#searchedHistory.includes(searchedPlace)) {
            this.#searchedHistory.unshift(searchedPlace);
            this.#historyModel.saveOnDB(this.#searchedHistory);
        }
    };

    #initialOptions = [
        {
            title: 'Exit',
            action: this.#exit
        },
        {
            title: 'Search city',
            action: this.#searchPlaces
        },
        {
            title: 'History',
            action: this.#searchHistory
        }
    ];

    #createDynamicChoices = (options) => options.map((opt, index) => {
        return {
            name: `${index.toString().green} ${opt.title ? opt.title : opt}`,
            value: opt
        }
    })

    #menuQuestions = createInquirerListChoices(INQUIRER_INITIAL_MESSAGE, this.#createDynamicChoices(this.#initialOptions));


    inquirerMenu = async () => {
        const {option} = await this.#printOptions(this.#menuQuestions);

        return option;
    }

    #printOptions = options => {
        return inquirer.prompt(options);
    };

    #readInput = async message => {
        const question = [
            {
                type: 'input',
                name: 'description',
                message,
                validate(value) {
                    return value.length === 0 ?
                        "Please enter a value" :
                        true;
                }
            }
        ];

        const {description} = await inquirer.prompt(question);

        return description;
    };

}

module.exports = InquirerHelper;

