const errorHandler = (err, _req, res, _next) => {
	const error = { ...err };

	error.message = err.message;

	// log error to console for dev
	// console.log("Error: ", err);

	if (error.name === "NotFoundError") {
		res.status(400).json({
			success: false,
			message: error.message
		});
	} else if (error.name === "InvalidFieldNameException") {
		res.status(400).json({
			success: false,
			message: "One  or more request fields are not provided in the correct format"
		});
	} else {
		res.status(error.statusCode || 500).json({
			success: false,
			message: error.message || "Server Error"
		});
	}
};

export default errorHandler;
