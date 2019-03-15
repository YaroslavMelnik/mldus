const smartgrid = require('smart-grid');

const settings = {
    outputStyle: 'less',
    columns: 12,
    offset: '30px',
    container: {
        maxWidth: '1170px',
        fields: '0'
    },
    oldSizeStyle: false
};

smartgrid('./app/libs/', settings);