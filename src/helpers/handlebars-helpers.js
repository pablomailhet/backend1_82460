const helpers = {

    isGreaterThanOne: function (value, options) {
        if (value > 1) {
            return options.fn(this);
        }
        return options.inverse(this);
    },
    formatDecimal: function (value) {
        if (typeof value === 'number') {
            return value.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        return value;
    }

}

export default helpers;