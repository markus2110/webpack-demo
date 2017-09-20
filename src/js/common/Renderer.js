import _ from "underscore";

export default function(templateFile, vars){
    var content = _.template(templateFile);
    return content(vars);
};