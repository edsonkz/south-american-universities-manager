import { University } from "../models/university";

class UniversityController {
	async findOne(req, res) {
		let { id } = req.params;
		try {
			const university = await University.findOne({ _id: id });
			if (university === null || university.length <= 0) {
				return res.send({
					message: "Couldn't find a university with this id.",
				});
			} else {
				return res.send(university);
			}
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}

	async findAll(req, res) {
		const getPagination = (page, size) => {
			const limit = size ? +size : 5;
			const offset = page ? page * limit : 0;
			return { limit, offset };
		};

		const { page, size } = req.query;
		const { limit, offset } = getPagination(page, size);
		try {
			var universitiesPage = await University.paginate(
				{},
				{
					select: "-_id",
					offset,
					limit,
				}
			);

			if (universitiesPage.totalDocs === 0) {
				universitiesPage.docs = "There is no universities.";
			} else if (
				universitiesPage.docs === null ||
				universitiesPage.docs.length <= 0
			) {
				universitiesPage.docs =
					"Invalid Page. Check total pages number.";
			}

			return res.status(200).send({
				totalItems: universitiesPage.totalDocs,
				universities: universitiesPage.docs,
				totalPages: universitiesPage.totalPages,
				currentPage: universitiesPage.page - 1,
			});
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}
}

export { UniversityController };
