import doctorsData from "@/services/mockData/doctors.json";

let doctors = [...doctorsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const doctorService = {
  async getAll() {
    await delay(300);
    return [...doctors];
  },

  async getById(id) {
    await delay(200);
    const doctor = doctors.find(d => d.Id === parseInt(id));
    if (!doctor) {
      throw new Error("Doctor not found");
    }
    return { ...doctor };
  },

  async create(doctorData) {
    await delay(400);
    const newId = Math.max(...doctors.map(d => d.Id)) + 1;
    const newDoctor = {
      ...doctorData,
      Id: newId
    };
    doctors.push(newDoctor);
    return { ...newDoctor };
  },

  async update(id, doctorData) {
    await delay(350);
    const index = doctors.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Doctor not found");
    }
    doctors[index] = { ...doctors[index], ...doctorData };
    return { ...doctors[index] };
  },

  async delete(id) {
    await delay(250);
    const index = doctors.findIndex(d => d.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Doctor not found");
    }
    const deletedDoctor = doctors.splice(index, 1)[0];
    return { ...deletedDoctor };
  },

  async getActive() {
    await delay(200);
    return doctors.filter(doctor => doctor.isActive);
  },

  async getBySpecialization(specialization) {
    await delay(200);
    return doctors.filter(doctor => 
      doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
    );
  }
};