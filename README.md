# JS-Slider

JS-Silder is a demo for modulizing html component without 3-rd party framework.

The project structure is as follow:

    ├── README.md
    ├── .eslintrc.json
    ├── css
    │   └── slider.css
    ├── js
    │   ├── jq
    │   │   └── jquery.js
    │   └── slider.js
    └── slider-demo.html

The .eslintrc.json is for eslint , slider.js and slider.css are for the Slider control.

# Usage

Just like what in `slider-demo.html`:

    $(function()
    {
        SliderMaker($('#container1'));
        // or like this:
        SliderMaker($('#container2'), 10, 400);
    });

# License

You can use this demo for any purpose without any limit.

One more thing, this is just a demo.
