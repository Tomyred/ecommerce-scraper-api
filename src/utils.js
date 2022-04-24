export const defaultResponse = (req, res, data, length, error = null) => {
    if (error) {
        const errorMessage = error.stack
            ? error.stack
            : error.message
            ? error.message
            : error;

        console.error(error);

        res.json({
            error: true,
            data: data == null ? {} : data,
            message: errorMessage,
        });
    } else {
        res.json({
            error: false,
            data,
            length: length ? length : "",
            message: "",
        });
    }
};
