//import $ from "jquery";
import Renderer from './common/Renderer';
import style from './../less/styles.less';


;(function(){
    var dropZone = Renderer(require('./module/DropZone/view/DropZone.html'), {dropZoneLabel : "Drop your files here"} );
    document.getElementById('demo').innerHTML = dropZone;
})();