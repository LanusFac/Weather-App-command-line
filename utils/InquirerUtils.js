class InquirerUtils {
    static createInquirerListChoices = (message, choices) => {
        return {
            type: 'list',
            name: 'option',
            message,
            choices
        }
    };
}

module.exports = InquirerUtils;
