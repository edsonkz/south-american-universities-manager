import { University } from "../models/university";

class UniversityController {
	async create(req, res) {
		let newUniversity = new University(req.body);
		try {
			const university = await University.findOne({ 'state-province': newUniversity['state-province'], name: newUniversity.name, country: newUniversity.country });
			if (university)
				return res.send({
					message: "University already exists with id: " + university._id
				});

			await newUniversity.save();
			return res.send({
				message: "New university succussefully created. ID: " + newUniversity._id,
			});
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}

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
			const limit = size ? size : 20;
			const offset = page ? page * limit : 0;
			return { limit, offset };
		};

		const { page, size, country } = req.query;

		if (size > 20) {
			size = 20;
		}

		const { limit, offset } = getPagination(page, size);
		try {
			if (country) {
				var universitiesPage = await University.paginate(
					{ country },
					{
						select: "_id name country state-province",
						offset,
						limit,
					}
				);
			} else {
				var universitiesPage = await University.paginate(
					{},
					{
						select: "_id name country state-province",
						offset,
						limit,
					}
				);
			}

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

	async update(req, res) {
		let { id } = req.params;
		try {
			let university = await University.findOne({ _id: id });
			if (university === null)
				return res.send({
					message: "Couldn't find a article with this id.",
				});
			let { country, name } = university;
			let state_province = university["state-province"];
			country = req.body.country ? req.body.country : country;
			name = req.body.name ? req.body.name : name;
			state_province = req.body["state-province"] ? req.body["state-province"] : state_province;

			let universityDuplicate = await University.findOne({ 'state-province': state_province, name: name, country: country });
			if (universityDuplicate)
				return res.send({
					message: "University already exists with those new parameters. Id: " + universityDuplicate._id
				});

				university = await University.updateOne({_id: id }, req.body);
				return res.send(university);

		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}

	async delete(req, res) {
		let { id } = req.params;
		try {
			let university = await University.findOne({ _id: id });
			if (university === null || university.length <= 0) {
				return res.send({
					message: "Couldn't find a university with this id.",
				});
			} else {
				university = await University.deleteOne({ _id: id });
				return res.send({
					message: `University with id ${id} was successfully deleted.`,
				});
			}
		} catch (error) {
			console.log("Error", error);
			return res
				.status(404)
				.send({ name: error.name, error: error.message });
		}
	}
}

export { UniversityController };
