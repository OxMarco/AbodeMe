import ReactGA from "react-ga";

export default class Tracker {
    constructor() {
        ReactGA.initialize('UA-131428312-3');
    }

    pageVisited(page) {
        ReactGA.pageview(page); 
    }
}
