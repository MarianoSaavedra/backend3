import supertest from "supertest";
import chai from "chai";
import mongoose from "mongoose";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

mongoose.connect(
	`mongodb+srv://marianomsv:coderhouse@cluster0.stq9t.mongodb.net/Adpotme?retryWrites=true&w=majority&appName=Cluster0`
);

before(async () => {
	await mongoose.connect(
		`mongodb+srv://marianomsv:coderhouse@cluster0.stq9t.mongodb.net/Adpotme?retryWrites=true&w=majority&appName=Cluster0`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
});

// Desconectar de la base de datos después de todas las pruebas
after(async () => {
	await mongoose.disconnect();
});

// Limpiar la base de datos antes de cada prueba
beforeEach(async () => {
	await mongoose.connection.db.collection("adoptions").deleteMany({});
});

describe("Testing de la App Web Adoptame", () => {
	describe("Testing de Adopciones:", () => {
		it("GET api/adoptions debe devolver todas las adopciones con status y payload", async () => {
			const { statusCode, body } = await requester.get("/api/adoptions");

			expect(statusCode).to.equal(200);
			expect(body).to.have.property("status").that.equals("success");
			expect(body).to.have.property("payload").that.is.an("array");
		});

		it("GET api/adoptions/:aid debe devolver error 404 si la adopción no existe", async () => {
			const invalidAdoptionId = "67848dc849feee41fc216e08";
			const { statusCode, body } = await requester.get(`/api/adoptions/${invalidAdoptionId}`);

			expect(statusCode).to.equal(404);
			expect(body).to.have.property("status").that.equals("error");
			expect(body).to.have.property("error").that.equals("Adoption not found");
		});

		it("POST api/adoptions/:uid/:pid debe crear una adopción correctamente", async () => {
			const userId = "6784a7c33f2c15d9911a6139"; // ID VALIDO DE USER
			const petId = "6784a7c33f2c15d9911a616d"; // ID VALIDO DE PET

			const { statusCode, body } = await requester.post(`/api/adoptions/${userId}/${petId}`);

			expect(statusCode).to.equal(200);
			expect(body).to.have.property("status").that.equals("success");
			expect(body).to.have.property("message").that.equals("Pet adopted");
		});

		it("POST api/adoptions/:uid/:pid debe devolver error 404 si el usuario no existe", async () => {
			const invalidUserId = "6784a7c33f2c15d9911a6199";
			const petId = "6784a7c33f2c15d9911a616d";

			const { statusCode, body } = await requester.post(`/api/adoptions/${invalidUserId}/${petId}`);

			expect(statusCode).to.equal(404);
			expect(body).to.have.property("status").that.equals("error");
			expect(body).to.have.property("error").that.equals("user Not found");
		});

		it("POST api/adoptions/:uid/:pid debe devolver error 404 si la mascota no existe", async () => {
			const userId = "6784a7c33f2c15d9911a6139";
			const invalidPetId = "6784a7c33f2c15d9911a611d";

			const { statusCode, body } = await requester.post(`/api/adoptions/${userId}/${invalidPetId}`);

			expect(statusCode).to.equal(404);
			expect(body).to.have.property("status").that.equals("error");
			expect(body).to.have.property("error").that.equals("Pet not found");
		});

		it("POST api/adoptions/:uid/:pid debe devolver error 400 si la mascota ya está adoptada", async () => {
			const userId = "6784a7c33f2c15d9911a6139";
			const adoptedPetId = "6784a7c33f2c15d9911a616d";

			const { statusCode, body } = await requester.post(`/api/adoptions/${userId}/${adoptedPetId}`);

			expect(statusCode).to.equal(400);
			expect(body).to.have.property("status").that.equals("error");
			expect(body).to.have.property("error").that.equals("Pet is already adopted");
		});
	});
});
