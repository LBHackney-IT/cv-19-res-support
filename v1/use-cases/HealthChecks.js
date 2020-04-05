const status = () => {
    return {
        status: "Success"
    }
}

const error = () => {
    throw 'Expected Error Thrown!';
}

exports.status = status;
exports.error = error;