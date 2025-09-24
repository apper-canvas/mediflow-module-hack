import appointmentsData from "@/services/mockData/appointments.json";

let appointments = [...appointmentsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const appointmentService = {
  async getAll() {
    await delay(300);
    return [...appointments];
  },

  async getById(id) {
    await delay(200);
    const appointment = appointments.find(a => a.Id === parseInt(id));
    if (!appointment) {
      throw new Error("Appointment not found");
    }
    return { ...appointment };
  },

  async create(appointmentData) {
    await delay(400);
    const newId = Math.max(...appointments.map(a => a.Id)) + 1;
    const newAppointment = {
      ...appointmentData,
      Id: newId,
      createdAt: new Date().toISOString()
    };
    appointments.push(newAppointment);
    return { ...newAppointment };
  },

  async update(id, appointmentData) {
    await delay(350);
    const index = appointments.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    appointments[index] = { ...appointments[index], ...appointmentData };
    return { ...appointments[index] };
  },

  async delete(id) {
    await delay(250);
    const index = appointments.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Appointment not found");
    }
    const deletedAppointment = appointments.splice(index, 1)[0];
    return { ...deletedAppointment };
  },

  async getByDate(date) {
    await delay(200);
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === dateStr);
  },

  async getByPatientId(patientId) {
    await delay(200);
    return appointments.filter(apt => apt.patientId === parseInt(patientId));
  },

  async getByDoctorId(doctorId) {
    await delay(200);
    return appointments.filter(apt => apt.doctorId === parseInt(doctorId));
  }
};