import bodyParser from "body-parser";
const ConfigBodyParser = (app) => {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
}

module.exports = ConfigBodyParser;