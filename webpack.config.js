
const path  = require('path');
const merge = require('webpack-merge');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanCSSPlugin    = require("less-plugin-clean-css");
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');


module.exports = function(env, argv){

    const PROD = (env === "prod");

    const extractLess = new ExtractTextPlugin({
        filename : (PROD) ? "css/[name].min.css" : "css/[name].css"
    });
    

    var lessOptions = {
        strictMath: true,
        noIeCompat: true
    };

    // empty function
    var uglifyJS = function(){};

    if(PROD){
        lessOptions.plugins = [
            new CleanCSSPlugin({ advanced: true })
        ];

        uglifyJS = new UglifyJSPlugin({
            uglifyOptions: {
                compress : {
                    drop_console : true,
                    warnings : true,
                    drop_debugger: true
                }
            }
        });
    }


    var config = merge.smart({
        context : path.resolve(__dirname),

        entry: {
            application: [path.resolve(__dirname, 'src/js/app.js')]
        },

        
        output: {
            filename: (PROD) ? 'js/[name].min.js' : 'js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            pathinfo: (!PROD)
        },

        module: {
            rules: [
                // HTML File Loader
                {test: /\.html$/, use: ["html-loader"]},

                // Less Loader
                {
                    test: /\.less$/,
                    use: extractLess.extract({
                        use: [{
                                loader: "css-loader"
                            }, {
                                loader: "less-loader",
                                options: lessOptions
                            }],
                            // use style-loader in development
                            fallback: "style-loader"
                    })
                },
                // FileLoader for Fonts
                {
                    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                    loader: 'file-loader'
                }
            ]
        },
        plugins: [ extractLess, uglifyJS ]

    });

    return config;
};