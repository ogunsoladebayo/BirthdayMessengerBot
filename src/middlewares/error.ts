const errorHandler = (err, _req, res, _next) => {
	const error = { ...err };

	error.message = err.message;

	// log error to console for dev
	console.log("Error: ", err);
	res.status(error.statusCode || 500).json({
		success: false,
		message: error.message || "Server Error"
	});
};

export default errorHandler;
