import utils from "../utils/mokings.js";
import mockDao from "../dao/Mocks.dao.js";

const getMockingPets = async (req, res) => {
	const quantity = req.params.quantity;
	const pets = await utils.generateMockingPets(quantity);
	res.send({ status: "succes", payload: pets });
};

const getMockingUsers = async (req, res) => {
	const quantity = req.params.quantity;
	const users = await utils.generateMockingUsers(quantity);
	res.send({ status: "succes", payload: users });
};

const postMocks = async (req, res) => {
	const { usersQ, petsQ } = req.body;
	const respuesta = await mockDao.create(usersQ, petsQ);

	res.send({ status: "Mocks cargados correctamente", payload: respuesta });
};

export default {
	getMockingPets,
	getMockingUsers,
	postMocks,
};
