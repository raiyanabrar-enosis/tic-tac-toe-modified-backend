export default class HomeController {
	static home = (req, res) => {
		console.log(process.env.MONGO_URI);
		res.status(200).send("<h1>Hello!!</h1>");
	};
}
