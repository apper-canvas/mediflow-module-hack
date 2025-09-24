import medicalRecordsData from "@/services/mockData/medicalRecords.json";

let medicalRecords = [...medicalRecordsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const medicalRecordService = {
  async getAll() {
    await delay(300);
    return [...medicalRecords];
  },

  async getById(id) {
    await delay(200);
    const record = medicalRecords.find(r => r.Id === parseInt(id));
    if (!record) {
      throw new Error("Medical record not found");
    }
    return { ...record };
  },

  async create(recordData) {
    await delay(400);
    const newId = Math.max(...medicalRecords.map(r => r.Id)) + 1;
    const newRecord = {
      ...recordData,
      Id: newId
    };
    medicalRecords.push(newRecord);
    return { ...newRecord };
  },

  async update(id, recordData) {
    await delay(350);
    const index = medicalRecords.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Medical record not found");
    }
    medicalRecords[index] = { ...medicalRecords[index], ...recordData };
    return { ...medicalRecords[index] };
  },

  async delete(id) {
    await delay(250);
    const index = medicalRecords.findIndex(r => r.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Medical record not found");
    }
    const deletedRecord = medicalRecords.splice(index, 1)[0];
    return { ...deletedRecord };
  },

  async getByPatientId(patientId) {
    await delay(200);
    return medicalRecords.filter(record => record.patientId === parseInt(patientId));
  },

  async getByDoctorId(doctorId) {
    await delay(200);
    return medicalRecords.filter(record => record.doctorId === parseInt(doctorId));
  }
};