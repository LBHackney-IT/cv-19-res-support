const status = () => {
    return {
        status: "Success"
    }
}

const error = () => {
    throw new Error();
}

exports.status = status;
exports.error = error;