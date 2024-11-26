import { faker } from "@faker-js/faker";
import { createHash } from "./index.js";

const generateMockingPets = (n) => {
	const pets = [];

	for (let i = 0; i < n; i++) {
		pets.push({
			name: faker.animal.petName(),
			specie: faker.animal.type(),
			birthDate: faker.date.birthdate(),
			adopted: false,
			image: faker.image.avatar(),
		});
	}
	return pets;
};

const generateMockingUsers = async (n) => {
	const users = [];

	for (let i = 0; i < n; i++) {
		let number = Math.ceil(Math.random() * 10);
		users.push({
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			password: await createHash("coder123"),
			role: number % 2 ? "user" : "admin",
			pets: [],
		});
	}
	return users;
};

export default { generateMockingPets, generateMockingUsers };
