export default class HomeController {
	static home = (req, res) => {
		res.status(200).send("<h1>Hello!!</h1>");
	};
}
