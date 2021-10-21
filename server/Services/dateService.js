const formatListDate = (listToFormat) => {
    return listToFormat.map(item => formatObjDate(item._doc ? item._doc : item));
}

const formatObjDate = (objectToFormat) => {
    Object.keys(objectToFormat).forEach(key => {
        if (Array.isArray(objectToFormat[key])) {
            Object.values(objectToFormat[key]).forEach(elem => formatObjDate(elem._doc));
            // formatListDate(objectToFormat[key])
        } else if (objectToFormat[key] instanceof Date) {
            objectToFormat[key] = new Date(objectToFormat[key]).toDateString();
        }
    })

    return objectToFormat;
}

module.exports = {
    formatObjDate,
    formatListDate
}