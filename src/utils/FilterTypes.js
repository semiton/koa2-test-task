class FilterTypes {
    static get eq() { return '=' }
    static get ne() { return '!=' }
    static get gt() { return '>' }
    static get gte() { return '>=' }
    static get lt() { return '<' }
    static get lte() { return '<=' }
    static get like() { return 'LIKE' }
}

module.exports = FilterTypes;
