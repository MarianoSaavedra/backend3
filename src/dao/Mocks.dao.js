import usersDao from "./Users.dao.js";
import petsDao from "./Pets.dao.js";
import utils from "../utils/mokings.js";

const newUsers = new usersDao();
const newPets = new petsDao();

const create = async (usersQ, petsQ) => {
	const users = await utils.generateMockingUsers(usersQ);
	const pets = await utils.generateMockingPets(petsQ);

	await users.forEach((user) => {
		newUsers.save(user);
	});

	await pets.forEach((pet) => {
		newPets.save(pet);
	});
};

export default { create };
